const grid = document.getElementById("grid");
const emptyState = document.getElementById("emptyState");
const countBadge = document.getElementById("countBadge");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const clearFilters = document.getElementById("clearFilters");
const modal = document.getElementById("modal");

let selected = readSelected();

// Pre fill category from query
const params = new URLSearchParams(location.search);
const catQ = params.get("cat");
if(catQ) categorySelect.value = catQ;

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "";
  render();
});

function matchScore(recipe, sel){
  if(sel.length === 0) return 1;
  const s = sel.map(norm);
  const ing = recipe.ingredients.map(norm);
  const owned = ing.filter(i => s.includes(i)).length;
  return owned / ing.length;
}

function render(){
  grid.innerHTML = "";
  let items = RECIPES.slice();
  const favs = readFavorites();

  const q = searchInput.value.trim().toLowerCase();
  if(q){
    items = items.filter(r => r.name.toLowerCase().includes(q) || r.ingredients.join(" ").toLowerCase().includes(q));
  }
  const cat = categorySelect.value;
  if(cat) items = items.filter(r => r.category === cat);

  items = items
    .map(r => ({r, score: matchScore(r, selected)}))
    .sort((a,b) => b.score - a.score || a.r.name.localeCompare(b.r.name));

  if(items.length === 0){
    emptyState.classList.remove("hidden");
  }else{
    emptyState.classList.add("hidden");
  }

  items.forEach(({r, score}) => {
    const card = document.createElement("article");
    card.className = "card";
    const percent = Math.round(score*100);
    const ingHtml = highlightIngredients(r.ingredients, selected);

    const missingIngredients = r.ingredients.filter(ing => !selected.map(norm).includes(norm(ing)));
    const missingHtml = missingIngredients.length > 0
      ? `<p class="meta missing">You'll also need: ${missingIngredients.join(", ")}</p>`
      : '';

    const isFav = favs.some(f => f.id === r.id);
    const favBtnClass = isFav ? 'outline' : 'primary';
    const favBtnText = isFav ? 'In Favorites' : 'Add to favorites';

    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}" onerror="this.src='images/placeholder.jpg'"/>
      <div class="card-body">
        <h3 class="card-title">${r.name}</h3>
        <p class="meta">Category: ${r.category} · Match: ${percent}%</p>
        <p class="meta">Ingredients: ${ingHtml}</p>
        ${missingHtml}
        <div class="badge-row">
          ${r.tags.map(t => `<span class="badge">${t}</span>`).join("")}
        </div>
        <div class="card-actions">
          <button class="btn ${favBtnClass} fav">${favBtnText}</button>
          <button class="btn outline view">View</button>
        </div>
      </div>
    `;

    card.querySelector(".fav").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(r);
    });
    card.querySelector(".view").addEventListener("click", () => openModal(r, selected));
    grid.appendChild(card);
  });

  countBadge.textContent = items.length.toString();

  const surprise = localStorage.getItem("srp_surprise");
  if(surprise){
    try{
      const r = JSON.parse(surprise);
      openModal(r, selected);
    }catch{}
    localStorage.removeItem("srp_surprise");
  }
}

function toggleFavorite(r) {
  const favs = readFavorites();
  const isFav = favs.some(f => f.id === r.id);
  if (isFav) {
    writeFavorites(favs.filter(f => f.id !== r.id));
    showToast("Removed from favorites");
  } else {
    favs.push(r);
    writeFavorites(favs);
    showToast("Added to favorites");
  }
  render();
}

function openModal(r, selected){
  document.getElementById("mImg").src = r.image;
  document.getElementById("mImg").alt = r.name;
  document.getElementById("mTitle").textContent = r.name;
  document.getElementById("mCategory").textContent = r.category;
  document.getElementById("mIngredients").innerHTML = r.ingredients.map(i => {
    const ok = selected.map(norm).includes(norm(i));
    return `<span class="tag${ok ? ' highlight' : ''}">${i}</span>`;
  }).join("");
  document.getElementById("mSteps").textContent = r.steps;
  document.getElementById("mNutrition").innerHTML = Object.entries(r.nutrition || {}).map(([k,v]) => `<span class="nut">${k} ${v}</span>`).join("");
  
  const favBtn = document.getElementById("mFav");
  const isFav = readFavorites().some(f => f.id === r.id);
  favBtn.textContent = isFav ? 'Remove from favorites' : 'Add to favorites';
  favBtn.className = `btn ${isFav ? 'outline' : 'primary'}`;
  favBtn.onclick = () => {
    toggleFavorite(r);
    const isNowFav = !isFav;
    favBtn.textContent = isNowFav ? 'Remove from favorites' : 'Add to favorites';
    favBtn.className = `btn ${isNowFav ? 'outline' : 'primary'}`;
  };

  modal.classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden");
}

document.getElementById("closeModal").addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

render();
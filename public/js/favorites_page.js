"use strict";

const grid = document.getElementById("favGrid");
const empty = document.getElementById("favEmpty");
const favCount = document.getElementById("favCount");

function renderFavs(){
  grid.innerHTML = "";
  const favs = readFavorites();
  if(favs.length === 0){
    empty.style.display = "grid";
    favCount.textContent = "0";
    return;
  }
  empty.style.display = "none";
  favCount.textContent = favs.length.toString();

  favs.forEach(r => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}" onerror="this.src='images/placeholder.jpg'"/>
      <div class="card-body">
        <h3 class="card-title">${r.name}</h3>
        <p class="meta">Ingredients ${r.ingredients.join(", ")}</p>
        <div class="card-actions">
          <button class="btn outline remove">Remove</button>
        </div>
      </div>
    `;
    card.querySelector(".remove").addEventListener("click", () => {
      const next = readFavorites().filter(x => x.id !== r.id);
      writeFavorites(next);
      showToast("Removed");
      renderFavs();
    });
    grid.appendChild(card);
  });
}

renderFavs();

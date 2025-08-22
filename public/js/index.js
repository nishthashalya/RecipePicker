"use strict";

const input = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("selectedList");
const surpriseBtn = document.getElementById("surpriseBtn");
const datalist = document.getElementById("productSuggestions");

let selected = readSelected();
renderChips();
fillSuggestions();

function fillSuggestions(){
  const products = getAllProducts();
  datalist.innerHTML = products.map(p => `<option value="${p}"></option>`).join("");
}

function renderChips(){
  list.innerHTML = "";
  selected.forEach(name => {
    const li = document.createElement("li");
    li.className = "chip";
    li.innerHTML = `<span>${name}</span><button title="Remove">✕</button>`;
    li.querySelector("button").addEventListener("click", () => {
      selected = selected.filter(s => s !== name);
      writeSelected(selected);
      renderChips();
      showToast("Removed");
    });
    list.appendChild(li);
  });
}

function addCurrent(){
  const val = input.value.trim();
  if(!val) return;
  if(!selected.some(s => norm(s) === norm(val))){
    selected.push(val);
    writeSelected(selected);
    renderChips();
    showToast("Added");
  }else{
    showToast("Already added");
  }
  input.value = "";
}

addBtn.addEventListener("click", addCurrent);
input.addEventListener("keydown", e => { if(e.key === "Enter") addCurrent() });
clearBtn.addEventListener("click", () => {
  selected = [];
  writeSelected(selected);
  renderChips();
  showToast("Cleared");
});

surpriseBtn.addEventListener("click", () => {
  const pick = RECIPES[Math.floor(Math.random()*RECIPES.length)];
  localStorage.setItem("srp_surprise", JSON.stringify(pick));
  window.location.href = "recipes.html";
});

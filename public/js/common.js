"use strict";

// localStorage keys
const LS_SELECTED = "srp_selected";
const LS_FAVORITES = "srp_favorites";

// helper
const norm = s => s.trim().toLowerCase();

function readSelected(){
  try{return JSON.parse(localStorage.getItem(LS_SELECTED)) || []}catch{return []}
}
function writeSelected(arr){
  localStorage.setItem(LS_SELECTED, JSON.stringify(arr || []));
}
function readFavorites(){
  try{return JSON.parse(localStorage.getItem(LS_FAVORITES)) || []}catch{return []}
}
function writeFavorites(arr){
  localStorage.setItem(LS_FAVORITES, JSON.stringify(arr || []));
}

function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1300);
}

// product suggestions from recipes data
function getAllProducts(){
  const set = new Set();
  RECIPES.forEach(r => r.ingredients.forEach(i => set.add(i)));
  return Array.from(set).sort();
}

// highlight matched ingredients in a text string
function highlightIngredients(list, selected){
  const sel = selected.map(norm);
  return list.map(i => sel.includes(norm(i)) ? `<span class="highlight">${i}</span>` : i).join(", ");
}

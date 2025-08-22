// --- DOM Element Selection ---
const input = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("selectedList");
const generateBtn = document.getElementById("generateBtn");
const initialMessage = document.getElementById("initialMessage");
const loader = document.getElementById("loader");
const recipeContent = document.getElementById("recipeContent");

let selectedIngredients = [];

function renderChips() {
  list.innerHTML = "";
  generateBtn.disabled = selectedIngredients.length === 0;

  selectedIngredients.forEach(name => {
    const chip = document.createElement("li");
    chip.className = "chip";
    chip.innerHTML = `
      <span>${name}</span>
      <button title="Remove">✕</button>
    `;
    chip.querySelector("button").addEventListener("click", () => {
      selectedIngredients = selectedIngredients.filter(s => s !== name);
      renderChips();
    });
    list.appendChild(chip);
  });
}

function addCurrentIngredient() {
  const val = input.value.trim();
  if (!val) return;
  const normalizedVal = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  if (!selectedIngredients.includes(normalizedVal)) {
    selectedIngredients.push(normalizedVal);
    renderChips();
  }
  input.value = "";
  input.focus();
}

addBtn.addEventListener("click", addCurrentIngredient);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    addCurrentIngredient();
  }
});

generateBtn.addEventListener("click", getAiRecipe);

async function getAiRecipe() {
  if (selectedIngredients.length === 0) return;

  initialMessage.style.display = 'none';
  recipeContent.innerHTML = "";
  loader.style.display = 'flex';
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  const ingredientsText = selectedIngredients.join(", ");
  const prompt = `
    You are a creative chef. Generate a simple and delicious recipe using ONLY the following ingredients: ${ingredientsText}. You can assume common pantry staples like oil, salt, pepper, and water are available.
    
    Please provide the following:
    - A creative and appealing "Recipe Title".
    - A brief, enticing "Description" of the dish.
    - A list of "Ingredients" needed.
    - A numbered list of "Instructions".
    
    Format the output in clean HTML. Use <h3> for the title, <p> for the description, <h4> for section headers, <ul> for ingredients, and <ol> for instructions. Do not include any text outside this HTML structure.
  `;

  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyCRLN282vZ2h4bJ6nB9pI6UeG6rpgZqEDE"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", response.status, response.statusText, errorBody);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts.length > 0) {
      const recipeHtml = result.candidates[0].content.parts[0].text;
      recipeContent.innerHTML = recipeHtml;
    } else {
      console.error("Invalid response structure from API:", result);
      throw new Error("Invalid response structure from API.");
    }

  } catch (error) {
    console.error("Error fetching recipe:", error);
    recipeContent.innerHTML = `<p class="muted text-center">Sorry, something went wrong. Please try again!</p>`;
  } finally {
    loader.style.display = 'none';
    generateBtn.disabled = false;
    generateBtn.innerHTML = "✨ Generate Another Recipe";
  }
}
renderChips();


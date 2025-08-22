"use strict";

const RECIPES = [
  { 
    id: "choc_milkshake", name: "Chocolate Milkshake", category: "Beverages",
    image: "images/milkshake.jpg",
    ingredients: ["Milk", "Cocoa Powder", "Sugar"],
    steps: "Blend milk cocoa and sugar until smooth",
    nutrition: {Calories:"250", Sugar:"28g", Protein:"7g"},
    tags:["Quick","Cold"] 
  },
  { 
    id: "butter_cookies", name: "Butter Cookies", category: "Snacks",
    image: "images/cookies.jpg",
    ingredients: ["Butter", "Flour", "Sugar"],
    steps: "Mix the dough and bake at 180 C for 15 minutes",
    nutrition: {Calories:"320", Sugar:"18g"},
    tags:["Baked","Tea time"]
   },
  { 
    id: "pepsi_float", name: "Pepsi Float", category: "Beverages",
    image: "images/pepsi-float.jpg",
    ingredients: ["Pepsi", "Vanilla Ice Cream"],
    steps: "Pour Pepsi into a glass and top with ice cream",
    nutrition: {Calories:"210", Sugar:"30g"},
    tags:["Quick","Dessert"] 
  },
  { 
    id: "cheese_toast", name: "Cheese Toast", category: "Snacks",
    image: "images/cheese-toast.jpg",
    ingredients: ["Cheese", "Bread", "Butter"],
    steps: "Butter the bread add cheese and toast till golden",
    nutrition: {Calories:"280", Protein:"10g"},
    tags:["Quick","Toaster"] 
  },
  { 
    id: "smoothie_bowl", name: "Yogurt Smoothie Bowl", category: "Dairy",
    image: "images/oats.jpeg",
    ingredients: ["Yogurt", "Banana", "Honey"],
    steps: "Blend yogurt with banana top with nuts and honey",
    nutrition: {Calories:"190", Protein:"8g"},
    tags:["Breakfast","No cook"]
  },
  { 
    id: "paratha_basic", name: "Ghee Paratha", category: "Packaged",
    image: "images/paratha.jpg",
    ingredients: ["Atta", "Ghee", "Salt"],
    steps: "Knead dough roll and roast with ghee",
    nutrition: {Calories:"230"},
    tags:["Indian","Stovetop"] 
  },
  { 
    id: "maggie_masala", name: "Masala Maggi", category: "Packaged",
    image: "images/maggi.jpg",
    ingredients: ["Noodles", "Masala", "Peas"],
    steps: "Cook noodles with masala add peas",
    nutrition: {Calories:"350"},
    tags:["Ten minutes","Comfort"] 
  },
  { 
    id: "biscuit_cake", name: "Biscuit Mug Cake", category: "Snacks",
    image: "images/mug-cake.jpg",
    ingredients: ["Biscuits", "Milk", "Sugar"],
    steps: "Crush biscuits mix with milk microwave for two minutes",
    nutrition: {Calories:"300"},
    tags:["Microwave","Dessert"] 
  },
  { 
    id: "iced_coffee", name: "Iced Coffee", category: "Beverages",
    image: "images/coffee.jpg",
    ingredients: ["Coffee", "Milk", "Sugar"],
    steps: "Shake coffee milk and sugar with ice",
    nutrition: {Calories:"160", Sugar:"15g"},
    tags:["Cold","Caffeine"] 
  },
  { 
    id: "corn_chivda", name: "Cornflakes Chivda", category: "Snacks",
    image: "images/chivda.jpg",
    ingredients: ["Cornflakes", "Peanuts", "Oil", "Salt"],
    steps: "Toss cornflakes with roasted peanuts and spices",
    nutrition: {Calories:"220"},
    tags:["Crispy","Tea time"] 
  },
  { 
    id: "paneer_bhurji", name: "Paneer Butter Masala", category: "Dairy",
    image: "images/paneer.jpg",
    ingredients: ["Paneer", "Onion", "Tomato", "Spices"],
    steps: "Crumble paneer and cook with onion tomato and spices",
    nutrition: {Protein:"18g"},
    tags:["Protein","Indian"] 
  },
  { 
    id: "corn_soup", name: "Sweet Corn Soup", category: "Beverages",
    image: "images/soup.jpg",
    ingredients: ["Soup Mix", "Water", "Corn"],
    steps: "Simmer soup mix with corn till thick",
    nutrition: {Calories:"120"},
    tags:["Warm","Light"] 
  },
  { 
    id: "nacho_style", name: "Nacho Style Chips", category: "Snacks",
    image: "images/nachos.jpg",
    ingredients: ["Chips", "Salsa", "Cheese"],
    steps: "Layer chips salsa and cheese then melt",
    nutrition: {Calories:"340"},
    tags:["Movie snack","Quick"] 
  },
  { 
    id: "banana_split", name: "Banana Split", category: "Snacks",
    image: "images/banana-split.jpg",
    ingredients: ["Vanilla Ice Cream", "Banana", "Hersheys Syrup"],
    steps: "Slice banana add scoops drizzle syrup",
    nutrition: {Calories:"310"},
    tags:["Dessert","Classic"] 
  },
  { 
    id: "oreo_shake", name: "Oreo Shake", category: "Beverages",
    image: "images/oreo-shake.jpg",
    ingredients: ["Oreo", "Milk", "Sugar"],
    steps: "Blend cookies with milk and sugar",
    nutrition: {Calories:"340"},
    tags:["Cafe style","Cold"] 
  },
  { 
    id: "masala_peanuts", name: "Masala Peanuts", category: "Snacks",
    image: "images/peanuts.jpg",
    ingredients: ["Masala", "Peanuts", "Oil"],
    steps: "Roast peanuts and toss with masala",
    nutrition: {Protein:"12g"},
    tags:["Tea time","Spicy"] 
  },
  { 
    id: "poha", name: "Quick Poha", category: "Snacks",
    image: "images/poha.jpeg",
    ingredients: ["Poha", "Onion", "Peanuts"],
    steps: "Wash the poha, stir fry with onion and peanuts",
    nutrition: {Calories:"260"},
    tags:["Breakfast","Indian"] 
  },
  { 
    id: "pasta_white", name: "Pasta", category: "Snacks",
    image: "images/pasta.jpg",
    ingredients: ["Pasta", "Butter", "Milk", "Cheese"],
    steps: "Boil pasta make the sauce and combine",
    nutrition: {Calories:"420"},
    tags:["Comfort","Creamy"] 
  },
  { 
    id: "tea_masala", name: "Masala Chai", category: "Beverages",
    image: "images/chai.jpg",
    ingredients: ["Tea", "Sugar", "Milk", "Ginger"],
    steps: "Simmer tea with ginger add milk and sugar",
    nutrition: {Calories:"120"},
    tags:["Warm","Indian"] 
  },
  { 
    id: "fruit_custard", name: "Fruit Custard", category: "Snacks",
    image: "images/custard.jpg",
    ingredients: ["Custard", "Milk", "Fruits"],
    steps: "Cook custard in milk and fold fruits",
    nutrition: {Calories:"240"},
    tags:["Chilled","Dessert"] 
  },
  { 
    id: "oats_bowl", name: "Honey Oats Bowl", category: "Dairy",
    image: "images/oats.jpeg",
    ingredients: ["Oats", "Milk", "Honey"],
    steps: "Cook oats in milk and drizzle honey",
    nutrition: {Fiber:"5g"},
    tags:["Healthy","Breakfast"] 
  },
  { 
    id: "spritzer", name: "Mint Lemon Spritzer", category: "Beverages",
    image: "images/spritzer.jpg",
    ingredients: ["Soda", "Mint", "Lemon", "Sugar"],
    steps: "Muddle mint add lemon sugar and top with soda",
    nutrition: {Calories:"90"},
    tags:["Refreshing","Party"] 
  },
  { 
    id: "dal_makhani", name: "Easy Dal Makhani", category: "Packaged",
    image: "images/dal.jpg",
    ingredients: ["Instant Dal Makhani", "Amul Butter", "Cream"],
    steps: "Heat ready meal finish with butter and cream",
    nutrition: {Protein:"14g"},
    tags:["Ready to eat","Indian"] 
  }
];

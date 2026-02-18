"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Plus, ShoppingCart, Trash2, ChefHat, Search, Sparkles, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Tradition = "Coptic" | "Ethiopian" | "Levantine" | "Armenian" | "Syriac"
type DisplayTradition = "Mediterranean" | "Ethiopian" | "Levantine" | "Armenian" | "Syriac"

type Recipe = {
  id: string
  name: string
  tradition: Tradition
  servingsBase: number
  ingredients: Array<{ name: string; qty: number; unit: string }>
  steps: string[]
}

function toDisplayTradition(tradition: Tradition): DisplayTradition {
  if (tradition === "Coptic") return "Mediterranean"
  return tradition
}

const detailedStepsById: Partial<Record<string, string[]>> = {
  "misir-wot": [
    "Rinse the red lentils in cold water 2 to 3 times, then set aside.",
    "Finely mince the red onions and cook them in a dry pot over medium heat for 10 to 15 minutes, stirring until softened.",
    "Add oil and continue cooking until onions become glossy and lightly golden.",
    "Stir in berbere, garlic, and ginger; toast for 1 to 2 minutes until fragrant.",
    "Add rinsed lentils and enough water to cover by about 1 inch.",
    "Simmer on low heat 25 to 30 minutes, stirring regularly so the lentils do not stick.",
    "Adjust with small splashes of hot water until the stew is thick and creamy.",
    "Season with salt, rest for 5 minutes, and serve with injera.",
  ],
  "shiro-wot": [
    "Cook minced onion in oil over medium heat until soft and translucent.",
    "Add garlic and optional berbere, then stir for 30 to 60 seconds.",
    "In a bowl, whisk shiro powder with warm water gradually to make a smooth lump-free slurry.",
    "Pour slurry into the pot while whisking continuously.",
    "Reduce heat to low and simmer 15 to 20 minutes, stirring often.",
    "If too thick, add hot water a little at a time; if too thin, simmer longer.",
    "Taste and adjust salt and spice level.",
    "Finish with a drizzle of oil and serve hot.",
  ],
  "koshary": [
    "Cook lentils in salted water until tender but not mushy; drain and reserve.",
    "Cook rice separately until fluffy.",
    "Boil macaroni until al dente, then drain.",
    "Warm chickpeas in a little salted water.",
    "For sauce: saute garlic in oil, add tomato paste, vinegar, cumin, and simmer to thicken.",
    "For crispy onions: fry thin onion slices until deep golden and crisp; drain well.",
    "Assemble in layers: rice and lentils, then pasta, then chickpeas.",
    "Top with hot tomato sauce and crispy onions; serve immediately.",
  ],
}

function buildDetailedSteps(recipe: Recipe): string[] {
  const custom = detailedStepsById[recipe.id]
  if (custom) return custom

  const i1 = recipe.ingredients[0]?.name ?? "main ingredient"
  const i2 = recipe.ingredients[1]?.name ?? "aromatics"
  const i3 = recipe.ingredients[2]?.name ?? "seasonings"
  const i4 = recipe.ingredients[3]?.name ?? "finishing ingredient"

  return [
    `Prepare all ingredients first: wash, chop, and measure ${i1}, ${i2}, ${i3}, and ${i4}.`,
    `If needed, soak or pre-cook ${i1} until partially tender.`,
    `Heat oil in a pan or pot over medium heat and cook ${i2} until softened and aromatic.`,
    `Add spices and seasonings, then stir 30 to 60 seconds so flavors bloom without burning.`,
    `Add ${i1} and mix well so it is coated with the base.`,
    "Pour in water or broth as needed, bring to a gentle simmer, and cover partially.",
    "Cook until texture is fully tender, stirring occasionally and adjusting liquid level.",
    "Taste and correct salt, acidity, and heat based on preference.",
    `Finish with ${i4} or fresh herbs, rest for 3 to 5 minutes, then serve.`,
  ]
}

const recipes: Recipe[] = [
  { id: "koshary", name: "Koshary", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "brown lentils", qty: 1, unit: "cup" }, { name: "rice", qty: 1, unit: "cup" }, { name: "macaroni", qty: 1, unit: "cup" }, { name: "chickpeas", qty: 1, unit: "cup" }], steps: ["Cook base components.", "Prepare sauce.", "Assemble and serve."] },
  { id: "ful-medames", name: "Ful Medames", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "fava beans", qty: 2, unit: "cups" }, { name: "olive oil", qty: 3, unit: "tbsp" }, { name: "lemon", qty: 1, unit: "whole" }, { name: "cumin", qty: 1, unit: "tsp" }], steps: ["Soak and cook beans.", "Mash and season.", "Serve with herbs."] },
  { id: "ful-iskandarani", name: "Ful Iskandarani", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "fava beans", qty: 2, unit: "cups" }, { name: "tomatoes", qty: 2, unit: "medium" }, { name: "green peppers", qty: 1, unit: "large" }, { name: "onion", qty: 1, unit: "medium" }], steps: ["Cook ful.", "Add chopped vegetables.", "Season and serve."] },
  { id: "ful-tahini", name: "Ful with Tahini", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "fava beans", qty: 2, unit: "cups" }, { name: "tahini", qty: 0.25, unit: "cup" }, { name: "lemon juice", qty: 2, unit: "tbsp" }, { name: "garlic", qty: 2, unit: "cloves" }], steps: ["Mash ful.", "Whisk tahini mix.", "Combine and serve."] },
  { id: "tameya", name: "Tameya (Egyptian Falafel)", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "split fava beans", qty: 2, unit: "cups" }, { name: "parsley", qty: 1, unit: "cup" }, { name: "cilantro", qty: 0.5, unit: "cup" }, { name: "garlic", qty: 4, unit: "cloves" }], steps: ["Blend soaked beans with herbs.", "Shape patties.", "Fry until crisp."] },
  { id: "bisara", name: "Bisara", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "split fava beans", qty: 1, unit: "cup" }, { name: "dill", qty: 0.5, unit: "cup" }, { name: "parsley", qty: 0.5, unit: "cup" }, { name: "garlic", qty: 4, unit: "cloves" }], steps: ["Boil beans and aromatics.", "Blend smooth.", "Top with garlic oil."] },
  { id: "coptic-lentil-soup", name: "Coptic Lentil Soup", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "yellow lentils", qty: 1, unit: "cup" }, { name: "carrots", qty: 2, unit: "medium" }, { name: "potato", qty: 1, unit: "large" }, { name: "cumin", qty: 1, unit: "tsp" }], steps: ["Boil vegetables and lentils.", "Blend until creamy.", "Season and serve."] },
  { id: "sayadeyet-arroz-fast", name: "Sayadeyet Arroz (Fasting)", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "rice", qty: 1.5, unit: "cups" }, { name: "onions", qty: 2, unit: "large" }, { name: "cumin", qty: 1, unit: "tsp" }, { name: "oil", qty: 3, unit: "tbsp" }], steps: ["Caramelize onions.", "Cook rice in onion base.", "Fluff and serve."] },
  { id: "mahshi-kromb", name: "Mahshi Kromb", tradition: "Coptic", servingsBase: 6, ingredients: [{ name: "cabbage leaves", qty: 20, unit: "pieces" }, { name: "rice", qty: 1.5, unit: "cups" }, { name: "tomato sauce", qty: 2, unit: "cups" }, { name: "parsley", qty: 0.5, unit: "cup" }], steps: ["Prepare rice filling.", "Roll cabbage leaves.", "Simmer in sauce."] },
  { id: "mahshi-waraq-enab", name: "Mahshi Waraq Enab", tradition: "Coptic", servingsBase: 6, ingredients: [{ name: "grape leaves", qty: 50, unit: "leaves" }, { name: "rice", qty: 1.5, unit: "cups" }, { name: "mint", qty: 2, unit: "tbsp" }, { name: "lemon", qty: 2, unit: "whole" }], steps: ["Mix stuffing.", "Roll leaves tightly.", "Cook on low heat."] },
  { id: "mesaqah", name: "Mesaqa'ah", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "eggplant", qty: 2, unit: "large" }, { name: "bell peppers", qty: 2, unit: "large" }, { name: "tomato sauce", qty: 2, unit: "cups" }, { name: "garlic", qty: 4, unit: "cloves" }], steps: ["Roast/fry vegetables.", "Prepare sauce.", "Layer and bake/simmer."] },
  { id: "bamia", name: "Bamia", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "okra", qty: 1, unit: "lb" }, { name: "tomato", qty: 4, unit: "medium" }, { name: "garlic", qty: 6, unit: "cloves" }, { name: "cilantro", qty: 0.5, unit: "cup" }], steps: ["Sauté garlic and tomato.", "Add okra.", "Simmer until tender."] },
  { id: "sabanekh", name: "Sabanekh", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "spinach", qty: 2, unit: "lb" }, { name: "chickpeas", qty: 1, unit: "cup" }, { name: "tomato sauce", qty: 1, unit: "cup" }, { name: "garlic", qty: 4, unit: "cloves" }], steps: ["Build tomato base.", "Add spinach and chickpeas.", "Finish with garlic oil."] },
  { id: "colcasia", name: "Colcasia", tradition: "Coptic", servingsBase: 4, ingredients: [{ name: "taro root", qty: 1.5, unit: "lb" }, { name: "swiss chard", qty: 1, unit: "bunch" }, { name: "fresh coriander", qty: 1, unit: "cup" }, { name: "garlic", qty: 8, unit: "cloves" }], steps: ["Cook taro.", "Blend greens.", "Finish with garlic tasha."] },

  { id: "misir-wot", name: "Misir Wot", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "red lentils", qty: 1, unit: "cup" }, { name: "red onions", qty: 3, unit: "large" }, { name: "berbere", qty: 3, unit: "tbsp" }, { name: "garlic", qty: 1, unit: "tbsp" }], steps: ["Dry-sauté onions.", "Add berbere.", "Simmer lentils to creamy texture."] },
  { id: "kik-alicha", name: "Kik Alicha", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "yellow split peas", qty: 1, unit: "cup" }, { name: "turmeric", qty: 1, unit: "tsp" }, { name: "ginger", qty: 1, unit: "tbsp" }, { name: "garlic", qty: 3, unit: "cloves" }], steps: ["Cook split peas.", "Add mild aromatics.", "Simmer until soft."] },
  { id: "shiro-wot", name: "Shiro Wot", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "shiro powder", qty: 1, unit: "cup" }, { name: "onion", qty: 1, unit: "medium" }, { name: "garlic", qty: 2, unit: "cloves" }, { name: "water", qty: 3, unit: "cups" }], steps: ["Sauté onion.", "Whisk shiro.", "Simmer until silky."] },
  { id: "gomen", name: "Gomen", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "collard greens", qty: 1, unit: "large bunch" }, { name: "garlic", qty: 3, unit: "cloves" }, { name: "ginger", qty: 1, unit: "tbsp" }, { name: "green chili", qty: 1, unit: "whole" }], steps: ["Sauté aromatics.", "Cook greens until tender.", "Season and serve."] },
  { id: "key-sir", name: "Key Sir", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "beets", qty: 2, unit: "medium" }, { name: "carrots", qty: 3, unit: "medium" }, { name: "onion", qty: 1, unit: "large" }, { name: "ginger", qty: 1, unit: "tbsp" }], steps: ["Cook beets.", "Sauté carrots and onion.", "Combine and finish."] },
  { id: "fasolia", name: "Fasolia", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "green beans", qty: 1, unit: "lb" }, { name: "carrots", qty: 2, unit: "medium" }, { name: "onion", qty: 1, unit: "large" }, { name: "turmeric", qty: 1, unit: "tsp" }], steps: ["Sauté onion and turmeric.", "Add vegetables.", "Cook until tender-crisp."] },
  { id: "tikil-gomen", name: "Tikil Gomen", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "cabbage", qty: 1, unit: "small" }, { name: "potatoes", qty: 2, unit: "large" }, { name: "carrots", qty: 2, unit: "medium" }, { name: "turmeric", qty: 1, unit: "tsp" }], steps: ["Sauté aromatics.", "Add root veg and cabbage.", "Steam-simmer until soft."] },
  { id: "duba-wot", name: "Duba Wot", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "pumpkin or squash", qty: 4, unit: "cups" }, { name: "berbere", qty: 1, unit: "tbsp" }, { name: "onion", qty: 1, unit: "large" }, { name: "garlic", qty: 3, unit: "cloves" }], steps: ["Cook onion base.", "Add squash and spices.", "Simmer to thick stew."] },
  { id: "suf-fitfit", name: "Suf Fitfit", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "sunflower seeds", qty: 1, unit: "cup" }, { name: "injera", qty: 4, unit: "pieces" }, { name: "onion", qty: 1, unit: "medium" }, { name: "tomato", qty: 2, unit: "medium" }], steps: ["Make sunflower milk.", "Season base.", "Mix with torn injera."] },
  { id: "telba", name: "Telba", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "flaxseed", qty: 0.5, unit: "cup" }, { name: "water", qty: 1.5, unit: "cups" }, { name: "onion", qty: 0.5, unit: "cup" }, { name: "green pepper", qty: 0.25, unit: "cup" }], steps: ["Toast flaxseed.", "Grind and mix with water.", "Serve savory or sweet."] },
  { id: "timatim-salata", name: "Timatim Salata", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "tomatoes", qty: 4, unit: "medium" }, { name: "red onion", qty: 1, unit: "medium" }, { name: "green chili", qty: 1, unit: "whole" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Dice vegetables.", "Season with lemon and salt.", "Serve fresh."] },
  { id: "azifa", name: "Azifa", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "green lentils", qty: 1, unit: "cup" }, { name: "mustard", qty: 1, unit: "tsp" }, { name: "onion", qty: 1, unit: "small" }, { name: "green chili", qty: 1, unit: "whole" }], steps: ["Cook lentils al dente.", "Mix dressing.", "Toss and chill."] },
  { id: "buticha", name: "Buticha", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "chickpea flour", qty: 1, unit: "cup" }, { name: "lemon", qty: 1, unit: "whole" }, { name: "olive oil", qty: 2, unit: "tbsp" }, { name: "salt", qty: 1, unit: "tsp" }], steps: ["Hydrate chickpea flour.", "Season to hummus-like dip.", "Serve with injera."] },
  { id: "injera", name: "Injera", tradition: "Ethiopian", servingsBase: 6, ingredients: [{ name: "teff flour", qty: 3, unit: "cups" }, { name: "water", qty: 4, unit: "cups" }, { name: "starter", qty: 2, unit: "tbsp" }, { name: "salt", qty: 1, unit: "tsp" }], steps: ["Ferment batter.", "Cook on hot mitad.", "Steam-finish and cool."] },
  { id: "inguday-tibs", name: "Inguday Tibs", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "mushrooms", qty: 1, unit: "lb" }, { name: "onion", qty: 1, unit: "large" }, { name: "berbere", qty: 1, unit: "tbsp" }, { name: "garlic", qty: 3, unit: "cloves" }], steps: ["Sauté onion.", "Cook mushrooms.", "Season with spices and herbs."] },
  { id: "fasolia-bi-karot", name: "Fasolia bi Karot", tradition: "Ethiopian", servingsBase: 4, ingredients: [{ name: "green beans", qty: 1, unit: "lb" }, { name: "carrots", qty: 2, unit: "medium" }, { name: "onion", qty: 1, unit: "medium" }, { name: "turmeric", qty: 1, unit: "tsp" }], steps: ["Cut matchsticks.", "Sauté with aromatics.", "Steam until tender."] },

  { id: "mujadara-rice", name: "Mujadara (Rice)", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "lentils", qty: 1, unit: "cup" }, { name: "rice", qty: 1, unit: "cup" }, { name: "onions", qty: 3, unit: "large" }, { name: "olive oil", qty: 0.5, unit: "cup" }], steps: ["Cook lentils.", "Add rice.", "Top with dark onions."] },
  { id: "mujadara-bulgur", name: "Mujadara (Bulgur)", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "lentils", qty: 1, unit: "cup" }, { name: "coarse bulgur", qty: 1, unit: "cup" }, { name: "onions", qty: 3, unit: "large" }, { name: "olive oil", qty: 0.5, unit: "cup" }], steps: ["Cook lentils.", "Add bulgur.", "Finish with onion oil."] },
  { id: "horaa-osbao", name: "Horaa Osbao", tradition: "Syriac", servingsBase: 4, ingredients: [{ name: "brown lentils", qty: 1, unit: "cup" }, { name: "small pasta", qty: 1, unit: "cup" }, { name: "tamarind paste", qty: 2, unit: "tbsp" }, { name: "cilantro", qty: 0.5, unit: "cup" }], steps: ["Cook lentils.", "Add pasta.", "Finish with tamarind and herb oil."] },
  { id: "warak-enab-vegetarian", name: "Warak Enab (Vegetarian)", tradition: "Levantine", servingsBase: 6, ingredients: [{ name: "grape leaves", qty: 50, unit: "leaves" }, { name: "rice", qty: 1.5, unit: "cups" }, { name: "parsley", qty: 1, unit: "cup" }, { name: "mint", qty: 2, unit: "tbsp" }], steps: ["Make herb rice mix.", "Roll leaves.", "Simmer in lemon broth."] },
  { id: "batata-harra", name: "Batata Harra", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "potatoes", qty: 4, unit: "large" }, { name: "garlic", qty: 4, unit: "cloves" }, { name: "chili", qty: 1, unit: "tbsp" }, { name: "cilantro", qty: 0.5, unit: "cup" }], steps: ["Roast/fry potato cubes.", "Toss in garlic-chili oil.", "Finish with lemon and cilantro."] },
  { id: "hummus-bi-tahini", name: "Hummus bi Tahini", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "chickpeas", qty: 2, unit: "cups" }, { name: "tahini", qty: 0.25, unit: "cup" }, { name: "garlic", qty: 2, unit: "cloves" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Blend chickpeas.", "Add tahini and lemon.", "Season and serve."] },
  { id: "baba-ganoush", name: "Baba Ganoush", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "eggplant", qty: 2, unit: "large" }, { name: "tahini", qty: 0.25, unit: "cup" }, { name: "garlic", qty: 2, unit: "cloves" }, { name: "lemon juice", qty: 2, unit: "tbsp" }], steps: ["Roast eggplant.", "Mash with tahini mix.", "Top with olive oil."] },
  { id: "mutabbal", name: "Mutabbal", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "eggplant", qty: 2, unit: "large" }, { name: "tahini", qty: 3, unit: "tbsp" }, { name: "garlic", qty: 1, unit: "clove" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Char eggplant.", "Blend with tahini.", "Season and chill."] },
  { id: "fattoush", name: "Fattoush", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "mixed greens", qty: 4, unit: "cups" }, { name: "tomatoes", qty: 2, unit: "medium" }, { name: "cucumber", qty: 1, unit: "large" }, { name: "toasted pita", qty: 2, unit: "pieces" }], steps: ["Chop vegetables.", "Toast pita.", "Dress with sumac-lemon oil."] },
  { id: "tabbouleh", name: "Tabbouleh", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "parsley", qty: 3, unit: "cups" }, { name: "mint", qty: 0.5, unit: "cup" }, { name: "fine bulgur", qty: 0.25, unit: "cup" }, { name: "tomatoes", qty: 2, unit: "medium" }], steps: ["Hydrate bulgur.", "Finely chop herbs.", "Mix and dress."] },
  { id: "loubieh-bi-zeit", name: "Loubieh bi Zeit", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "green beans", qty: 1, unit: "lb" }, { name: "onion", qty: 1, unit: "large" }, { name: "garlic", qty: 8, unit: "cloves" }, { name: "tomatoes", qty: 4, unit: "medium" }], steps: ["Sauté aromatics.", "Add beans and tomato.", "Slow-cook in oil."] },
  { id: "moussaka-levantine", name: "Moussaka (Levantine Vegan)", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "eggplant", qty: 2, unit: "large" }, { name: "chickpeas", qty: 1, unit: "cup" }, { name: "tomatoes", qty: 4, unit: "medium" }, { name: "mint", qty: 1, unit: "tsp" }], steps: ["Cook eggplant.", "Build tomato-chickpea sauce.", "Simmer and serve cool."] },
  { id: "hindbeh", name: "Hindbeh", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "dandelion/chicory greens", qty: 1, unit: "lb" }, { name: "onions", qty: 3, unit: "large" }, { name: "olive oil", qty: 0.5, unit: "cup" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Boil greens.", "Fry onions deep brown.", "Combine with lemon."] },
  { id: "makdous", name: "Makdous", tradition: "Levantine", servingsBase: 6, ingredients: [{ name: "baby eggplants", qty: 12, unit: "pieces" }, { name: "walnuts", qty: 1, unit: "cup" }, { name: "red pepper", qty: 2, unit: "tbsp" }, { name: "olive oil", qty: 2, unit: "cups" }], steps: ["Parboil eggplants.", "Stuff with walnut-pepper mix.", "Cure in oil."] },
  { id: "kamouneh", name: "Kamouneh", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "bulgur", qty: 1, unit: "cup" }, { name: "tomato paste", qty: 2, unit: "tbsp" }, { name: "mint", qty: 0.25, unit: "cup" }, { name: "olive oil", qty: 3, unit: "tbsp" }], steps: ["Mix bulgur with herb paste.", "Knead with tomato base.", "Rest and serve."] },
  { id: "shorbat-adas", name: "Shorbat Adas", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "brown lentils", qty: 1, unit: "cup" }, { name: "swiss chard", qty: 1, unit: "cup" }, { name: "onion", qty: 1, unit: "medium" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Cook lentils.", "Add greens and aromatics.", "Finish with lemon."] },
  { id: "kibbeh-nayyeh-vegan", name: "Kibbeh Nayyeh (Vegan)", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "fine bulgur", qty: 1, unit: "cup" }, { name: "tomato paste", qty: 2, unit: "tbsp" }, { name: "pepper paste", qty: 1, unit: "tbsp" }, { name: "spices", qty: 1, unit: "tbsp" }], steps: ["Hydrate bulgur.", "Knead with pastes.", "Shape and drizzle oil."] },
  { id: "kibbeh-lakteen", name: "Kibbeh Lakteen", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "pumpkin", qty: 2, unit: "cups" }, { name: "bulgur", qty: 1, unit: "cup" }, { name: "spinach", qty: 1, unit: "cup" }, { name: "chickpeas", qty: 1, unit: "cup" }], steps: ["Prepare pumpkin shell dough.", "Stuff with spinach/chickpeas.", "Bake or simmer."] },
  { id: "boulghour-bi-banadoura", name: "Boulghour bi Banadoura", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "coarse bulgur", qty: 1, unit: "cup" }, { name: "tomatoes", qty: 3, unit: "medium" }, { name: "green pepper", qty: 1, unit: "large" }, { name: "onion", qty: 1, unit: "medium" }], steps: ["Cook tomato base.", "Toast bulgur.", "Simmer and rest."] },
  { id: "arnabeet-bi-tahini", name: "Arnabeet bi Tahini", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "cauliflower", qty: 1, unit: "large head" }, { name: "tahini", qty: 0.5, unit: "cup" }, { name: "lemon", qty: 1, unit: "whole" }, { name: "garlic", qty: 1, unit: "clove" }], steps: ["Roast cauliflower.", "Whisk tahini sauce.", "Drizzle and garnish."] },
  { id: "mujadara-safra", name: "Mujadara Safra", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "yellow lentils", qty: 1, unit: "cup" }, { name: "rice/bulgur", qty: 1, unit: "cup" }, { name: "onions", qty: 2, unit: "large" }, { name: "olive oil", qty: 0.25, unit: "cup" }], steps: ["Cook lentils to mash.", "Add grain.", "Top with fried onions."] },
  { id: "foul-moukala", name: "Foul Moukala", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "broad beans", qty: 2, unit: "cups" }, { name: "garlic", qty: 10, unit: "cloves" }, { name: "cilantro", qty: 0.5, unit: "cup" }, { name: "olive oil", qty: 0.25, unit: "cup" }], steps: ["Sauté garlic.", "Cook beans in oil.", "Finish with herbs and lemon."] },
  { id: "zucchini-bi-zeit", name: "Zucchini bi Zeit", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "zucchini", qty: 1, unit: "lb" }, { name: "onion", qty: 1, unit: "medium" }, { name: "dried mint", qty: 1, unit: "tsp" }, { name: "garlic", qty: 4, unit: "cloves" }], steps: ["Sauté onion.", "Add zucchini and garlic.", "Simmer and finish in oil."] },
  { id: "artichokes-bi-zeit", name: "Artichokes bi Zeit", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "artichoke hearts", qty: 10, unit: "pieces" }, { name: "carrots", qty: 2, unit: "medium" }, { name: "peas", qty: 1, unit: "cup" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Prepare filling.", "Stuff artichokes.", "Simmer in lemon broth."] },
  { id: "freekeh-bi-khodra", name: "Freekeh bi Khodra", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "freekeh", qty: 1, unit: "cup" }, { name: "mixed vegetables", qty: 2, unit: "cups" }, { name: "onion", qty: 1, unit: "medium" }, { name: "broth", qty: 2, unit: "cups" }], steps: ["Sauté vegetables.", "Toast freekeh.", "Simmer until chewy."] },
  { id: "moutabal-koussa", name: "Moutabal Koussa", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "zucchini", qty: 3, unit: "medium" }, { name: "tahini", qty: 0.25, unit: "cup" }, { name: "garlic", qty: 1, unit: "clove" }, { name: "lemon", qty: 1, unit: "whole" }], steps: ["Cook and mash zucchini.", "Whisk tahini mix.", "Combine and garnish."] },
  { id: "shorbat-shofaan", name: "Shorbat Shofaan", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "rolled oats", qty: 0.5, unit: "cup" }, { name: "vegetable broth", qty: 4, unit: "cups" }, { name: "onion", qty: 1, unit: "small" }, { name: "carrot", qty: 1, unit: "medium" }], steps: ["Sauté onion/carrot.", "Add broth and oats.", "Simmer until creamy."] },
  { id: "harira-fasting", name: "Shorbat Harira (Fasting)", tradition: "Levantine", servingsBase: 4, ingredients: [{ name: "lentils", qty: 1, unit: "cup" }, { name: "chickpeas", qty: 1, unit: "cup" }, { name: "tomato juice", qty: 4, unit: "cups" }, { name: "flour slurry", qty: 2, unit: "tbsp" }], steps: ["Build soup base.", "Cook legumes.", "Thicken and finish with herbs."] },
  { id: "vospov-kofte", name: "Vospov Kofte", tradition: "Armenian", servingsBase: 4, ingredients: [{ name: "red lentils", qty: 1, unit: "cup" }, { name: "fine bulgur", qty: 1.5, unit: "cups" }, { name: "onion", qty: 1, unit: "large" }, { name: "pepper paste", qty: 1, unit: "tbsp" }], steps: ["Cook lentils.", "Hydrate bulgur in lentils.", "Knead with aromatics and shape."] },
  { id: "armenia-eetch", name: "Armenian Eetch", tradition: "Armenian", servingsBase: 4, ingredients: [{ name: "fine bulgur", qty: 1, unit: "cup" }, { name: "tomato paste", qty: 2, unit: "tbsp" }, { name: "green onions", qty: 4, unit: "stalks" }, { name: "pomegranate molasses", qty: 2, unit: "tbsp" }], steps: ["Cook paste base.", "Steam bulgur.", "Knead with herbs and acids."] },
  { id: "itch", name: "Armenian Itch", tradition: "Armenian", servingsBase: 4, ingredients: [{ name: "fine bulgur", qty: 1, unit: "cup" }, { name: "tomato paste", qty: 2, unit: "tbsp" }, { name: "parsley", qty: 1, unit: "cup" }, { name: "lemon", qty: 2, unit: "whole" }], steps: ["Cook onion and paste.", "Hydrate bulgur.", "Mix herbs and acids."] },

  { id: "manakish-zaatar", name: "Manakish Za'atar", tradition: "Syriac", servingsBase: 6, ingredients: [{ name: "flour dough", qty: 1, unit: "batch" }, { name: "za'atar", qty: 3, unit: "tbsp" }, { name: "olive oil", qty: 3, unit: "tbsp" }, { name: "yeast", qty: 1, unit: "tsp" }], steps: ["Prepare dough.", "Spread za'atar oil.", "Bake hot and quick."] },
  { id: "fatayer-sabanekh", name: "Fatayer Sabanekh", tradition: "Syriac", servingsBase: 6, ingredients: [{ name: "dough", qty: 1, unit: "batch" }, { name: "spinach", qty: 2, unit: "cups" }, { name: "onion", qty: 1, unit: "small" }, { name: "sumac", qty: 1, unit: "tsp" }], steps: ["Prepare filling.", "Shape triangles.", "Bake until golden."] },
  { id: "falafel-levantine", name: "Falafel (Levantine)", tradition: "Syriac", servingsBase: 4, ingredients: [{ name: "dried chickpeas", qty: 2, unit: "cups" }, { name: "onion", qty: 1, unit: "small" }, { name: "garlic", qty: 3, unit: "cloves" }, { name: "parsley", qty: 1, unit: "cup" }], steps: ["Soak chickpeas.", "Blend and season.", "Fry scoops until crisp."] },
  { id: "maamoul-bi-tamer", name: "Ma'amoul bi Tamer", tradition: "Syriac", servingsBase: 8, ingredients: [{ name: "semolina", qty: 2, unit: "cups" }, { name: "flour", qty: 0.5, unit: "cup" }, { name: "date paste", qty: 1, unit: "cup" }, { name: "vegetable oil", qty: 0.5, unit: "cup" }], steps: ["Rest semolina dough.", "Stuff with dates.", "Mold and bake."] },
  { id: "qatayef-fasting", name: "Qatayef (Fasting)", tradition: "Syriac", servingsBase: 6, ingredients: [{ name: "flour", qty: 1, unit: "cup" }, { name: "semolina", qty: 0.5, unit: "cup" }, { name: "walnuts", qty: 1, unit: "cup" }, { name: "sugar syrup", qty: 1, unit: "cup" }], steps: ["Make pancake batter.", "Cook one-sided mini pancakes.", "Fill, fold, and bake/fry."] },
  { id: "roz-bi-laban-fasting", name: "Roz bi Laban (Fasting)", tradition: "Syriac", servingsBase: 6, ingredients: [{ name: "rice", qty: 0.5, unit: "cup" }, { name: "coconut or almond milk", qty: 3, unit: "cups" }, { name: "sugar", qty: 0.5, unit: "cup" }, { name: "rose water", qty: 1, unit: "tbsp" }], steps: ["Cook rice soft.", "Add plant milk and sugar.", "Thicken and chill."] },
]

type ShoppingItem = { id: string; name: string; qty: number; unit: string; checked: boolean }

const suggestRecipeMessage = encodeURIComponent(
  "Hi, I want to recommend a recipe for the fasting recipes page.\n\nRecipe name:\nTradition:\nIngredients:\nStep-by-step instructions:\nNotes:",
)

export default function FastingRecipesPage() {
  const [name, setName] = useState("")
  const [preferredTradition, setPreferredTradition] = useState<"All" | DisplayTradition>("All")
  const [query, setQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [servings, setServings] = useState(4)
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0].id)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([])
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const raw = localStorage.getItem("fasting-recipes-profile")
    if (!raw) return
    try {
      const parsed = JSON.parse(raw)
      setName(parsed.name ?? "")
      setPreferredTradition(parsed.preferredTradition ?? "All")
      setFavorites(parsed.favorites ?? [])
      setShoppingList(parsed.shoppingList ?? [])
      setNotes(parsed.notes ?? "")
    } catch {
      // ignore bad local data
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "fasting-recipes-profile",
      JSON.stringify({ name, preferredTradition, favorites, shoppingList, notes }),
    )
  }, [name, preferredTradition, favorites, shoppingList, notes])

  const visibleRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const byTradition = preferredTradition === "All" || toDisplayTradition(recipe.tradition) === preferredTradition
      const byQuery =
        query.trim().length === 0 ||
        `${recipe.name} ${toDisplayTradition(recipe.tradition)} ${recipe.ingredients.map((i) => i.name).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return byTradition && byQuery
    })
  }, [preferredTradition, query])

  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId) ?? recipes[0]
  const detailedSteps = useMemo(() => buildDetailedSteps(selectedRecipe), [selectedRecipe])
  const servingFactor = servings / selectedRecipe.servingsBase

  useEffect(() => {
    setActiveStepIndex(0)
  }, [selectedRecipeId])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const addIngredient = (ingredient: { name: string; qty: number; unit: string }) => {
    const id = ingredient.name.toLowerCase()
    const computedQty = Number((ingredient.qty * servingFactor).toFixed(2))
    setShoppingList((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: Number((item.qty + computedQty).toFixed(2)) } : item))
      }
      return [...prev, { id, name: ingredient.name, qty: computedQty, unit: ingredient.unit, checked: false }]
    })
  }

  const addRecipe = () => {
    selectedRecipe.ingredients.forEach((ingredient) => addIngredient(ingredient))
  }

  const toggleItem = (id: string) => setShoppingList((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  const clearShopping = () => setShoppingList([])

  const recommended = useMemo(() => {
    if (preferredTradition === "All") return recipes.slice(0, 3)
    return recipes.filter((r) => toDisplayTradition(r.tradition) === preferredTradition).slice(0, 3)
  }, [preferredTradition])

  const totalRecipes = recipes.length

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff1e2_0%,_#fff8f0_30%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,_#1f1a15_0%,_#111827_45%,_#020617_100%)]">
      <section className="mx-auto max-w-[1500px] px-4 py-8 md:py-10">
        <div className="mb-6 overflow-hidden rounded-3xl border border-orange-200/80 bg-white/85 p-5 shadow-xl backdrop-blur dark:border-orange-900/50 dark:bg-stone-900/80 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
                <Sparkles className="h-3.5 w-3.5" />
                Interactive Kitchen
              </p>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">Fasting Recipes</h1>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">A Tasty-style experience for Orthodox fasting meals.</p>
              <p className="mt-1 text-xs font-semibold text-orange-700 dark:text-orange-300">{totalRecipes} recipes loaded</p>
            </div>
            <Button asChild variant="outline" className="bg-white/80">
              <Link href="/fasting-guide">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guide
              </Link>
            </Button>
          </div>
          <div className="mt-4">
            <Button asChild className="rounded-full bg-sky-600 hover:bg-sky-500">
              <a href={`https://t.me/johnsrepentance?text=${suggestRecipeMessage}`} target="_blank" rel="noreferrer">
                Suggest a Recipe
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[320px_1fr_360px]">
          <Card className="h-fit border-orange-200/70 bg-white/90 shadow-lg dark:border-stone-700 dark:bg-stone-900/85 xl:sticky xl:top-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl"><ChefHat className="h-5 w-5" />Discover</CardTitle>
              <CardDescription>Find recipes by tradition and ingredients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm" />
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recipes..." className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", "Mediterranean", "Ethiopian", "Levantine", "Armenian", "Syriac"] as const).map((tradition) => (
                  <Button key={tradition} size="sm" className="rounded-full" variant={preferredTradition === tradition ? "default" : "outline"} onClick={() => setPreferredTradition(tradition)}>
                    {tradition}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{name ? `Welcome ${name}.` : "Set your profile."} Try: {recommended.map((r) => r.name).join(", ")}.</p>

              <div className="max-h-[520px] overflow-auto rounded-2xl border">
                {visibleRecipes.map((recipe) => (
                  <button key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)} className={`w-full border-b p-4 text-left last:border-b-0 ${selectedRecipe.id === recipe.id ? "bg-orange-50 dark:bg-orange-950/20" : "hover:bg-muted/40"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-base font-bold leading-tight">{recipe.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{toDisplayTradition(recipe.tradition)}</p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id) }}>
                        <Heart className={`h-4 w-4 ${favorites.includes(recipe.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="overflow-hidden border-orange-200/70 bg-white/90 shadow-lg dark:border-stone-700 dark:bg-stone-900/85">
              <CardHeader className="bg-gradient-to-r from-orange-100/70 via-amber-50 to-rose-50 pb-4 dark:from-stone-800 dark:via-stone-800 dark:to-stone-900">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{toDisplayTradition(selectedRecipe.tradition)} Recipe</p>
                <CardTitle className="text-3xl font-black leading-tight md:text-4xl">{selectedRecipe.name}</CardTitle>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-medium shadow-sm dark:bg-stone-800">Servings: {servings}</span>
                  <input type="range" min={2} max={10} value={servings} onChange={(e) => setServings(Number(e.target.value))} className="w-44 accent-orange-600" />
                  <Button className="rounded-full" onClick={addRecipe}><ShoppingCart className="mr-2 h-4 w-4" />Add Recipe to List</Button>
                </div>
              </CardHeader>

              <CardContent className="grid gap-4 p-4 md:grid-cols-2 md:p-6">
                <div className="rounded-2xl border bg-white/80 p-4 dark:bg-stone-950/50">
                  <h3 className="mb-3 text-lg font-bold">Ingredients</h3>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ing) => (
                      <div key={ing.name} className="flex items-center justify-between rounded-xl border bg-stone-50 p-3 dark:bg-stone-900/70">
                        <span className="text-base font-medium">{Number((ing.qty * servingFactor).toFixed(2))} {ing.unit} {ing.name}</span>
                        <Button size="icon" variant="ghost" onClick={() => addIngredient(ing)}><Plus className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border bg-white/80 p-4 dark:bg-stone-950/50">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Cook Mode</h3>
                    <span className="text-sm text-muted-foreground">Step {activeStepIndex + 1} of {detailedSteps.length}</span>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 p-4 dark:from-stone-800 dark:to-stone-900">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Step</p>
                    <p className="text-base font-semibold leading-relaxed">{detailedSteps[activeStepIndex]}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" onClick={() => setActiveStepIndex((i) => Math.max(0, i - 1))} disabled={activeStepIndex === 0}>
                      <ChevronLeft className="mr-1 h-4 w-4" />Prev
                    </Button>
                    <Button onClick={() => setActiveStepIndex((i) => Math.min(detailedSteps.length - 1, i + 1))} disabled={activeStepIndex === detailedSteps.length - 1}>
                      Next<ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => setActiveStepIndex(0)}><Play className="mr-1 h-4 w-4" />Start Over</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200/70 bg-white/90 shadow-lg dark:border-stone-700 dark:bg-stone-900/85">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-black">Detailed Instructions</CardTitle>
                <CardDescription>Full step-by-step workflow, not summaries.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {detailedSteps.map((step, idx) => (
                  <div key={`${selectedRecipe.id}-step-${idx}`} className={`rounded-2xl border p-4 ${activeStepIndex === idx ? "border-orange-400 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/20" : "bg-stone-50/70 dark:bg-stone-900/70"}`}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {idx + 1}</p>
                    <p className="text-base leading-relaxed">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit border-orange-200/70 bg-white/90 shadow-lg dark:border-stone-700 dark:bg-stone-900/85 xl:sticky xl:top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><ShoppingCart className="h-5 w-5" />My Shopping List</CardTitle>
              <CardDescription>Personalized and saved on this browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="max-h-[360px] space-y-2 overflow-auto rounded-xl border p-2">
                {shoppingList.length === 0 ? (
                  <p className="p-2 text-sm text-muted-foreground">No items yet.</p>
                ) : (
                  shoppingList.map((item) => (
                    <label key={item.id} className="flex items-center gap-2 rounded-xl border bg-stone-50 p-2 text-sm dark:bg-stone-900">
                      <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} />
                      <span className={item.checked ? "line-through text-muted-foreground" : ""}>{item.qty} {item.unit} {item.name}</span>
                    </label>
                  ))
                )}
              </div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} placeholder="Notes: stores, substitutions, what to prep first..." className="w-full rounded-xl border bg-background px-3 py-2 text-sm" />
              <Button variant="outline" className="w-full" onClick={clearShopping}><Trash2 className="mr-2 h-4 w-4" />Clear List</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

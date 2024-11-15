"use client";
import React, { useState, useEffect } from "react";

// remove emoji
function removeEmoji(text) {
  return text.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
}

export default function MealIdeas({ ingredient }) {
  const [mealIdeas, setMealIdeas] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);

  // Fetch meals based on the selected ingredient (after removing emojis)
  async function fetchMealIdeas() {
    const cleanedIngredient = removeEmoji(ingredient);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleanedIngredient}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch meal ideas: ${response.status}`);
        return;
      }
      const data = await response.json();
      setMealIdeas(data.meals || []);
    } catch (error) {
      console.error(`Error fetching meal ideas: ${error.message}`);
    }
  }

  // Fetch detailed information for a specific meal to get ingredients
  async function fetchMealDetails(mealId) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch meal details: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error(`Error fetching meal details: ${error.message}`);
      return null;
    }
  }

  // Load meal ideas whenever the ingredient changes
  useEffect(() => {
    if (ingredient) {
      fetchMealIdeas();
    }
  }, [ingredient]);

  // Toggle expand/collapse for meal details
  const toggleExpandMeal = async (mealId) => {
    if (expandedMealId === mealId) {
      setExpandedMealId(null); // Collapse if already expanded
    } else {
      const details = await fetchMealDetails(mealId);
      setExpandedMealId(details ? mealId : null);
      setMealIdeas((prevIdeas) =>
        prevIdeas.map((meal) =>
          meal.idMeal === mealId
            ? {
                ...meal,
                ingredients: details ? extractIngredients(details) : [],
              }
            : meal
        )
      );
    }
  };

  // Helper function to extract ingredients and measures
  function extractIngredients(meal) {
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => ({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      }))
      .filter((item) => item.ingredient);
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Meal Ideas for "{ingredient}"</h2>
      {ingredient && <p>Here are some meal ideas using "{ingredient}":</p>}
      <ul className="space-y-2">
        {mealIdeas.map((meal) => (
          <li key={meal.idMeal} className="p-2 border rounded shadow-sm">
            <div
              onClick={() => toggleExpandMeal(meal.idMeal)}
              className="cursor-pointer font-bold hover:underline"
            >
              {meal.strMeal}
            </div>
            {expandedMealId === meal.idMeal && meal.ingredients && (
              <ul className="ml-4 mt-2 list-disc">
                {meal.ingredients.map((item, index) => (
                  <li key={index}>
                    {item.ingredient} - {item.measure}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

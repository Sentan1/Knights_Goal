
import { GoogleGenAI } from "@google/genai";
import { ArmorSet } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getKnightFlavorText = async (armor: ArmorSet, power: number, tasksRemaining: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a pixel-art RPG narrator. The hero is wearing ${armor.name} (Description: ${armor.description}) with a power level of ${power.toFixed(0)}. They need to complete ${tasksRemaining} more tasks to reach the next chest. Give a very short (max 15 words) motivational or flavor text line about their quest. Keep it in character for a fantasy game.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("AI Error:", error);
    return "Onward, brave soul! Glory awaits!";
  }
};

export const getNextStoryFragment = async (history: string[], currentLevel: number) => {
  try {
    const historyContext = history.length > 0 ? `Previously in the story: ${history.join(" ")}` : "The story is just beginning.";
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are writing a mysterious, dark fantasy story for a pixelated knight RPG. 
      The player has just traveled further into the world. 
      
      Rules for the story:
      1. Tell it in fragments/pieces (max 40 words).
      2. Leave clues about the world's downfall, the knight's true identity, or a forgotten war.
      3. Use atmospheric, book-like prose.
      4. Make it feel like a piece of lore found in a ruined library.
      
      Current Game Context:
      - Knight's Level: ${currentLevel}
      - Story so far: ${historyContext}
      
      Generate the NEXT fragment. Do not repeat what was said before. Move the plot forward slightly or deepen the mystery.`,
    });
    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Story AI Error:", error);
    return "The wind howls through the hollow armor, carrying whispers of a king who traded his shadow for a crown of salt.";
  }
};

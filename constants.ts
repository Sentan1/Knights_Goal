
import { ArmorSet } from './types';

export const TILES_PER_CHEST = 10;

const generateArmorSets = (): ArmorSet[] => {
  const sets: ArmorSet[] = [];
  
  // Specific user requests for the first few levels
  // Fixed property names to match ArmorSet interface
  const earlyConfigs = [
    { name: "Scrap Plate", primary: "#7f8c8d", secondary: "#2c3e50", accent: "#95a5a6", description: "Barely holding together." }, // 1: Grey
    { name: "Initiate Mail", primary: "#ffffff", secondary: "#bdc3c7", accent: "#ecf0f1", description: "Standard squire attire." }, // 2: White
    { name: "Abyssal Guard", primary: "#0d2137", secondary: "#050b14", accent: "#1b3a5b", description: "Darkness forged in the deep." }, // 3: Dark Blue
    { name: "Platinum Ward", primary: "#e5e4e2", secondary: "#7f8c8d", accent: "#ffffff", description: "Noble brilliance." }, // 4: Platinum
    { name: "Cobalt Sentinel", primary: "#0047ab", secondary: "#002366", accent: "#8eaadb", description: "Tough as the deep sea." }, // 5: Cobalt
    { name: "Emerald Knight", primary: "#50c878", secondary: "#006400", accent: "#90ee90", description: "Nature's chosen protector." }, // 6: Emerald
    { name: "Ruby Paladin", primary: "#e0115f", secondary: "#8b0000", accent: "#ff69b4", description: "Burning with resolve." }, // 7: Ruby
    { name: "Amethyst Sentry", primary: "#9966cc", secondary: "#4b0082", accent: "#d8bfd8", description: "Mystical resonance." }, // 8: Amethyst
    { name: "Obsidian Dread", primary: "#282828", secondary: "#000000", accent: "#444444", description: "Cold and unyielding." }, // 9: Obsidian
    { name: "Diamond Champion", primary: "#b9f2ff", secondary: "#00d4ff", accent: "#ffffff", description: "The pinnacle of purity." }, // 10: Diamond
  ];

  const genericPrefixes = ["Warden", "Lord", "Hero", "Avenger", "Slayer", "Monarch", "Deity", "Titan", "Spectre", "Zenith"];
  const genericEras = ["Void", "Light", "Shadow", "Thunder", "Frost", "Magma", "Chaos", "Aether", "Spirit", "Cosmos"];

  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      sets.push({
        ...earlyConfigs[i],
        tier: i,
        powerMultiplier: Math.pow(1.12, i)
      });
    } else {
      const eraIndex = Math.floor(i / 10);
      const prefixIndex = i % 10;
      // Procedural color shifts for 11-100
      const hue = (i * 13.7) % 360;
      sets.push({
        name: `${genericPrefixes[prefixIndex]} of ${genericEras[eraIndex % 10]}`,
        tier: i,
        primary: `hsl(${hue}, 60%, 50%)`,
        secondary: `hsl(${hue}, 70%, 20%)`,
        accent: `hsl(${(hue + 40) % 360}, 80%, 70%)`,
        powerMultiplier: Math.pow(1.12, i),
        description: `Advanced tier ${i} equipment. Resonance detected.`
      });
    }
  }
  
  return sets;
};

export const ARMOR_SETS: ArmorSet[] = generateArmorSets();

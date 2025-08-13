
import spellJson from "../DBC/json/Spell.json";
import spellIconJson from "../DBC/json/SpellIcon.json";
import talentJson from "../DBC/json/Talent.json";
import { Dictionary } from "../../TalentContext/types";
export const spellDictionary = Array.isArray(spellJson) ? spellJson.reduce((dict, spell) => {
  dict[spell.ID] = spell;
  return dict;
}, {}) : {};

export const iconDictionary = Array.isArray(spellIconJson) ? spellIconJson.reduce((dict: Dictionary, icon) => {
  let iconName = icon.TextureFilename.split("\\");
  dict[icon.ID.toString()] = iconName.at(-1)?.toLowerCase() ?? "";
  return dict;
}, {}) : {};

export const talentDictionary = Array.isArray(talentJson) ? talentJson.reduce((dict: Dictionary, talent) => {
  dict[talent.ID] = talent;
  return dict;
}, {}) : {};
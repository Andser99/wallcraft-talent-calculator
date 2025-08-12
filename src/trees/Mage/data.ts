import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";
    
export const data: TalentData = {
  Arcane: getTalentTree("Mage", "Arcane")!,
  Fire: getTalentTree("Mage", "Fire")!,
  Frost: getTalentTree("Mage", "Frost")!,
};

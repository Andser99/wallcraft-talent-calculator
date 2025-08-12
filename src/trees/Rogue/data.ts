import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Assassination: getTalentTree("Rogue", "Assassination")!,
  Combat: getTalentTree("Rogue", "Combat")!,
  Subtlety: getTalentTree("Rogue", "Subtlety")!,
};
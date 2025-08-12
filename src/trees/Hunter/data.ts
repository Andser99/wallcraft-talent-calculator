import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";
    
export const data: TalentData = {
  "Beast Mastery": getTalentTree("Hunter", "Beast Mastery")!,
  Marksmanship: getTalentTree("Hunter", "Marksmanship")!,
  Survival: getTalentTree("Hunter", "Survival")!,
};

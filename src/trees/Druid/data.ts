import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";
    
export const data: TalentData = {
  Balance: getTalentTree("Druid", "Balance")!,
  Feral: getTalentTree("Druid", "Feral")!,
  Restoration: getTalentTree("Druid", "Restoration")!,
};

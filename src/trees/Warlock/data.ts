import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Affliction: getTalentTree("Warlock", "Affliction")!,
  Demonology: getTalentTree("Warlock", "Demonology")!,
  Destruction: getTalentTree("Warlock", "Destruction")!,
};

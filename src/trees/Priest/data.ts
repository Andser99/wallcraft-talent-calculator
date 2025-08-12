import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Discipline: getTalentTree("Priest", "Discipline")!,
  Holy: getTalentTree("Priest", "Holy")!,
  Shadow: getTalentTree("Priest", "Shadow")!,
};
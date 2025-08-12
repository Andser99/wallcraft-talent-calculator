import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Holy: getTalentTree("Paladin", "Holy")!,
  Protection: getTalentTree("Paladin", "Protection")!,
  Retribution: getTalentTree("Paladin", "Retribution")!,
};
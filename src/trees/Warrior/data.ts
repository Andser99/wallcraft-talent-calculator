import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Arms: getTalentTree("Warrior", "Arms")!,
  Fury: getTalentTree("Warrior", "Fury")!,
  Protection: getTalentTree("Warrior", "Protection")!,
};
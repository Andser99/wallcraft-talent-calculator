import { TalentData } from "../../TalentContext";
import { getTalentTree } from "../treeProvider";

export const data: TalentData = {
  Elemental: getTalentTree("Shaman", "Elemental")!,
  Enhancement: getTalentTree("Shaman", "Enhancement")!,
  Restoration: getTalentTree("Shaman", "Restoration")!,
};

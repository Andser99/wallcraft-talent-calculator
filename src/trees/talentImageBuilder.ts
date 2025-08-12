import { TalentData } from "../TalentContext";
import { requireAll } from "../utils";
const backgrounds = requireAll(
  require.context("./../assets/tree-backgrounds/paladin"),
);
const icons = requireAll(require.context("../assets/icons"));

export function buildTalentImages(tree: TalentData, treeIcon: string, specName: string){
    let spec = tree[specName];
    for (let talent in spec.talents){
        spec.talents[talent].icon = icons[spec.talents[talent].icon];
        spec.talents[talent].description = (num) => spec.talents[talent].descriptions[num-1];
    }
    spec.icon = icons[treeIcon];
}
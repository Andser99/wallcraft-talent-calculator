import { getTalentRank, TalentData } from "../TalentContext";
import { State } from "../TalentContext/types";
import { requireAll } from "../utils";
const backgrounds = requireAll(
  require.context("./../assets/tree-backgrounds/paladin"),
);
const icons = requireAll(require.context("../assets/icons"));

export function buildTalentImages(tree: TalentData, treeIcon: string, specName: string){
    let spec = tree[specName];
    for (let talentKey in spec.talents){
        let talent = spec.talents[talentKey];
        talent.icon = icons[talent.icon];

        // talent.description = (rank) => talent.descriptions[rank-1];

        talent.description = (rank, state) => talent.descriptions[getDependencyRank(state, specName, talent.dependencyName)][rank-1];
    }
    spec.icon = icons[treeIcon];
}

function getDependencyRank(state: State, tree: string, talentName: string) {
  if (talentName === '') {
    return 0;
  }
  
  let rank = getTalentRank(state, tree, talentName);
  console.log(rank + "=rank, Talent has dependency - " + talentName);
  return rank;
}
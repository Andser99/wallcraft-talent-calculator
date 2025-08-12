
import talentJson from "../DBC/Talent.json";
import { tierToPosition } from "../../TalentContext/conversions";
import { iconDictionary, spellDictionary, talentDictionary } from "../DBC/dbcData";
import { Talent, TalentData } from "../../TalentContext/types";

export function addTalentsForTabId(tree: TalentData, tabId: number, treeName: string){
     for (let talent of talentJson.filter(_ => _.TabID === tabId)){
        let spells = getSpellsForTalent(talent);
        let talentName = spells[0]["Name_enUS"] as string;
        let spellDescs = getDescriptions(spells);
        let newTalent: Talent = {
          name: talentName,
          pos: tierToPosition(talent.TierID, talent.ColumnIndex),
          maxRank: getSpellsForTalent(talent).length,
          reqPoints: talent.TierID * 5,
          prereq: talent.PrereqTalent_1 !== 0 ? getHighestTalentSpellRank(talentDictionary[talent.PrereqTalent_1]["ID"]) : undefined,
          description: () => "",
          descriptions: spellDescs,
          icon: iconDictionary[spells[0]["SpellIconID"]]};
        tree[treeName].talents[talentName] = newTalent;
      }
}

function getDescriptions(spells: any){
    let spellDescs = Array<string>();
    for (let spell of spells){
        spellDescs.push(parseSpellValues(spell["Description_enUS"], spell));
    }
    // spells.reduce((arr: Array<string>, val: string) => { arr.push(parseSpellValues(`${spells[arr.length] !== undefined ? spells[arr.length-1]["Description_enUS"]: spells[0]["Description_enUS"]}`, spells[arr.length-1]),); return arr;});
    return spellDescs;
}

function getHighestTalentSpellRank(id: number){
    const preReqTalent = talentDictionary[id];
    // TODO: Nice to have, but talent names (usually) don't change between ranks
    // Check which highest rank is available on the prereq talent and use the highest rank spell name
    return spellDictionary[preReqTalent["SpellRank_1"]]["Name_enUS"];
}

function parseSpellValues(description: string, spell: any){
    if (spell !== undefined) {
        description = formatDescription(description, "$s1", offsetAbs(spell["EffectBasePoints_1"]));
        description = formatDescription(description, "$s2", offsetAbs(spell["EffectBasePoints_2"]));
        description = formatDescription(description, "$s3", offsetAbs(spell["EffectBasePoints_3"]));
        description = formatDescription(description, "$h", spell["ProcChance"]);
        description = formatDescription(description, "$d", durationIndexToSeconds(spell["DurationIndex"]));
        description = formatDescription(description, "$a1", effectRadiusIndexToDistanceUnit(spell["EffectRadiusIndex_1"]));
        description = formatDescription(description, "$a2", effectRadiusIndexToDistanceUnit(spell["EffectRadiusIndex_2"]));
        // Absolutely vile hardcoded duration parsing, works only for /1000, try to regex parse this duration and send as param
        description = formatDescription(description, RegExp(/\$\/1000*;[sS]1/gm), effectToDuration(spell["EffectBasePoints_1"], 1000));
        description = formatDescription(description, RegExp(/\$\/1000*;[sS]2/gm), effectToDuration(spell["EffectBasePoints_2"], 1000));
        description = formatDescription(description, RegExp(/\$\/1000*;[sS]3/gm), effectToDuration(spell["EffectBasePoints_3"], 1000));
    }
    return description;
}

function offsetAbs(value: number){
    // Values in dbc EffectBasePoints column are reduced by 1 and negative.
    return Math.abs(value+1).toString();
}

function effectToDuration(value: number, durationDiv: number){
    return (Math.abs(value+1) / durationDiv).toString();
}

function formatDescription(description: string, toReplace: string | RegExp, columnValue: string){
    return description.replaceAll(toReplace, columnValue)
}

function durationIndexToSeconds(durationIndex: number){
    // TODO: Parse this from SpellDuration.dbc or just hardcode a dictionary, absolutely retarded shit
    return "dIndex=" + durationIndex.toString();
}

function effectRadiusIndexToDistanceUnit(effectRadiusIndex: number){
    // TODO: Parse this from SpellDuration.dbc or just hardcode a dictionary, absolutely retarded shit
    return "rIndex=" + effectRadiusIndex.toString();
}

function getSpellsForTalent(talent: typeof talentJson[0]){
    let spells = [];
    spells.push(spellDictionary[talent.SpellRank_1])
    if (talent.SpellRank_2 != 0)
        spells.push(spellDictionary[talent.SpellRank_2]);
    if (talent.SpellRank_3 != 0)
        spells.push(spellDictionary[talent.SpellRank_3]);
    if (talent.SpellRank_4 != 0)
        spells.push(spellDictionary[talent.SpellRank_4]);
    if (talent.SpellRank_5 != 0)
        spells.push(spellDictionary[talent.SpellRank_5]);
    if (talent.SpellRank_6 != 0)
        spells.push(spellDictionary[talent.SpellRank_6]);
    if (talent.SpellRank_7 != 0)
        spells.push(spellDictionary[talent.SpellRank_7]);
    if (talent.SpellRank_8 != 0)
        spells.push(spellDictionary[talent.SpellRank_8]);
    if (talent.SpellRank_9 != 0)
        spells.push(spellDictionary[talent.SpellRank_9]);
    return spells;
}
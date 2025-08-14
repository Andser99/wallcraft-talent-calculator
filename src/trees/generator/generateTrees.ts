import { TalentData } from "../../TalentContext";
import { addTalentsForTabId } from "./talentCreator";
import * as fs from 'fs';
import tabIdsJson from "../DBC/TabId.json";

function generateAllTrees() {
    for (let tabId in tabIdsJson) {
        let specName = tabIdsJson[tabId as keyof typeof tabIdsJson].Talents;
        let className = tabIdsJson[tabId as keyof typeof tabIdsJson].Class;
        generateTree(Number.parseInt(tabId), specName, className);
        console.log(`Generating tree ${specName}=${tabId}`);
    }
}

function generateTree(tabId: number, specName: string, className: string) {
    let tree: TalentData = {} as TalentData;
    tree[specName] =
    {
        name: specName,
        "background": specName.toLowerCase(),
        "icon": "",
        "talents": {}
    };
    addTalentsForTabId(tree, tabId, specName);
    saveTree(tree, specName, className);
}

function saveTree(tree: TalentData, treeName: string, className: string) {
    // console.log(tree);
    fs.writeFile(`./src/trees/${className}/${treeName}.json`, JSON.stringify(tree), handleErrors);
}

function handleErrors(err: any) {
    if (err) {
        return console.error(err);
    }
}

generateAllTrees();
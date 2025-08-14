export function parse(description: string) {
    let replacements = parseDescriptions(description);
    return replacements;
}

function parseDescriptions(description: string) {
    let data = Array<Replacement>();
    let currentIndex: refNumber = { value: 0 };
    while (currentIndex.value < description.length) {
        parseBeginning(description, currentIndex, data);
        currentIndex.value++;
    }
    return data;
}

function parseBeginning(description: string, currentIndex: refNumber, data: Array<Replacement>) {
    let symbol = description[currentIndex.value];
    if (symbol == '$') {
        let replacement: Replacement = {
            spellId: -1,
            columnName: "",
            durationDivisor: 0,
            replacementTemplate: "",
            indexTable: "",
            singularWord: "",
            pluralWord: "",
            isRemoval: false,
            transform: (input) => input
        };
        replacement.replacementTemplate += symbol;
        currentIndex.value++;

        parseDuration(description, currentIndex, replacement);
        parseSpellId(description, currentIndex, replacement);
        parseColumnName(description, currentIndex, replacement);
        data.push(replacement);
    }
}

function parseDuration(description: string, currentIndex: refNumber, replacement: Replacement) {
    let symbol = description[currentIndex.value];
    if (symbol === '/') {
        replacement.replacementTemplate += symbol;
        currentIndex.value++;

        let durationDivisor = parseNumber(description, currentIndex, replacement);
        replacement.durationDivisor = durationDivisor;
    }
}

function parseSpellId(description: string, currentIndex: refNumber, replacement: Replacement) {
    let symbol = description[currentIndex.value];
    if (symbol === ';') {
        replacement.replacementTemplate += symbol;
        currentIndex.value++;
        symbol = description[currentIndex.value];
    }
    if (symbol >= '0' && symbol <= '9') {
        let spellId = parseNumber(description, currentIndex, replacement);
        replacement.spellId = spellId;
    }
}

function parseColumnName(description: string, currentIndex: refNumber, replacement: Replacement) {
    let symbol = description[currentIndex.value];
    replacement.replacementTemplate += symbol;
    if (symbol.toLowerCase() === 's') {
        parseEffectBasePoints(description, currentIndex, replacement);
        replacement.transform = effectBaseTransform;
    }
    else if (symbol.toLowerCase() === 'h') {
        replacement.columnName = "ProcChance";
        if (description[currentIndex.value + 1] >= '0' && description[currentIndex.value + 1] <= '9') {
            currentIndex.value++;
            replacement.replacementTemplate += parseNumber(description, currentIndex, replacement);
        }
    }
    else if (symbol.toLowerCase() === 'b') {
        replacement.columnName = "EffectPointsPerCombo_1";
        if (description[currentIndex.value + 1] >= '0' && description[currentIndex.value + 1] <= '9') {
            currentIndex.value++;
            let parsedNumber = parseNumber(description, currentIndex, replacement);
            replacement.columnName = "EffectPointsPerCombo_" + parsedNumber;
        }
    }
    else if (symbol.toLowerCase() === 'o') {
        replacement.columnName = "EffectAmplitude_1";
        if (description[currentIndex.value + 1] >= '0' && description[currentIndex.value + 1] <= '9') {
            currentIndex.value++;
            let parsedNumber = parseNumber(description, currentIndex, replacement);
            replacement.columnName = "EffectAmplitude_" + parsedNumber;
            replacement.transform = effectAmplitudeTransform;
        }
    }
    else if (symbol.toLowerCase() === 'd') {
        replacement.columnName = "DurationIndex";
        replacement.indexTable = "SpellDuration";
    }
    else if (symbol.toLowerCase() === 'a') {
        parseEffectRadiusIndex(description, currentIndex, replacement);
        replacement.indexTable = "SpellRadius";
    }
    else if (symbol.toLowerCase() === 't') {
        replacement.isRemoval = true;
    }
    else if (symbol.toLowerCase() === 'l') {
        parsePluralWording(description, currentIndex, replacement);
    }
}

function effectBaseTransform(input: string) {
    let value = parseInt(input);
    return Math.abs(value + 1).toString();
}

function effectAmplitudeTransform(input: string) {
    let value = parseInt(input);
    return (value/1000).toString();
}

function parsePluralWording(description: string, currentIndex: refNumber, replacement: Replacement) {
    currentIndex.value++;
    let indexOfSemicolon = description.indexOf(';', currentIndex.value);
    let split = description.substring(currentIndex.value).split(':');
    let singular = split[0];
    replacement.replacementTemplate += singular;
    let plural = split[1].split(';')[0];
    replacement.replacementTemplate += ":";
    replacement.replacementTemplate += plural;
    replacement.singularWord = singular;
    replacement.pluralWord = plural;
    replacement.replacementTemplate += ';';
    currentIndex.value = indexOfSemicolon;
    replacement.columnName = "EffectBasePoints_1";
}

function parseEffectBasePoints(description: string, currentIndex: refNumber, replacement: Replacement) {
    currentIndex.value++;
    let symbol = description[currentIndex.value];
    switch (symbol) {
        case '1':
            replacement.columnName = "EffectBasePoints_1";
            break;
        case '2':
            replacement.columnName = "EffectBasePoints_2";
            break;
        case '3':
            replacement.columnName = "EffectBasePoints_3";
            break;
    }
    replacement.replacementTemplate += symbol;
    currentIndex.value++;
}

function parseEffectRadiusIndex(description: string, currentIndex: refNumber, replacement: Replacement) {
    currentIndex.value++;
    let symbol = description[currentIndex.value];
    replacement.replacementTemplate += symbol;
    switch (symbol) {
        case '1':
            replacement.columnName = "EffectRadiusIndex_1";
            break;
        case '2':
            replacement.columnName = "EffectRadiusIndex_2";
            break;
    }
}

function parseNumber(description: string, currentIndex: refNumber, replacement: Replacement): number {
    let symbol = description[currentIndex.value];
    let numberString = "";
    while (symbol >= '0' && symbol <= '9') {
        numberString += symbol;

        replacement.replacementTemplate += symbol;
        currentIndex.value++;
        symbol = description[currentIndex.value];
    }
    return Number.parseInt(numberString);
}

interface refNumber { value: number; };

export interface Replacement {
    spellId: number,
    columnName: string,
    durationDivisor: number,
    replacementTemplate: string,
    indexTable: string,
    singularWord: string,
    pluralWord: string,
    isRemoval: boolean,
    transform: (input: string) => string
}

function testParse() {
    let test1 = "Fills the $lPaladin:paladins; with divine fury for $d, causing melee attacks to deal additional physical damage equal to $34092s1% of normal weapon damage to all targets in front of the Paladin. Only one Seal can be active on the Paladin at any one time.\n";
    // test1 = "$/100;123s1";
    let replacements = parse(test1);
    console.log(replacements);
    console.log("done");
}

testParse();
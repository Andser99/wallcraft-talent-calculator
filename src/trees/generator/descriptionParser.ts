export function parse(description: string){
    let replacements = parseDescriptions(description);
    console.log(replacements);
}

function parseDescriptions(description: string){
    let data = Array<Replacement>();
    let currentIndex: refNumber = { value: 0 };
    while(currentIndex.value < description.length){
        parseBeginning(description, currentIndex, data);
        currentIndex.value++;
    }
    return data;
}

function parseBeginning(description: string, currentIndex: refNumber, data: Array<Replacement>){
    let symbol = description[currentIndex.value];
    console.log(symbol);
    if (symbol == '$') {
        let replacement: Replacement = {
            spellId: -1,
            columnName: "",
            durationDivisor: 0,
            replacementTemplate: ""
        };
        replacement.replacementTemplate += symbol;

        parseSpellOrDurationDivisor(description, currentIndex, replacement);
        parseColumnName(description, currentIndex, replacement);
        data.push(replacement);
    }
}

function parseColumnName(description: string, currentIndex: refNumber, replacement: Replacement){
    let symbol = description[currentIndex.value];
    console.log(symbol);
    replacement.replacementTemplate += symbol;
    if (symbol.toLowerCase() === 's'){
        parseEffectBasePoints(description, currentIndex, replacement);
    }
    else if (symbol.toLowerCase() === 'h'){
        replacement.columnName = "ProcChance";
    }
    else if (symbol.toLowerCase() === 'd'){
        replacement.columnName = "DurationIndex";
    }
    else if (symbol.toLowerCase() === 'a'){
        parseEffectRadiusIndex(description, currentIndex, replacement);
    }
}

function parseEffectBasePoints(description: string, currentIndex: refNumber, replacement: Replacement){
    currentIndex.value++;
    let symbol = description[currentIndex.value];
    console.log(symbol);
    switch(symbol){
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

function parseEffectRadiusIndex(description: string, currentIndex: refNumber, replacement: Replacement){
    currentIndex.value++;
    let symbol = description[currentIndex.value];
    replacement.replacementTemplate += symbol;
    console.log(symbol);
    switch(symbol){
        case '1':
            replacement.columnName = "EffectRadiusIndex_1";
            break;
        case '2':
            replacement.columnName = "EffectRadiusIndex_2";
            break;
    }
}

function parseSpellOrDurationDivisor(description: string, currentIndex: refNumber, replacement: Replacement){
    currentIndex.value++;
    let symbol = description[currentIndex.value];
    console.log(symbol);
    if (symbol >= '0' && symbol <= '9'){
        let spellId = parseNumber(description, currentIndex, replacement);
        replacement.spellId = spellId;
    }
    else if (symbol === '/'){
        replacement.replacementTemplate += symbol;
        currentIndex.value++;

        let durationDivisor = parseNumber(description, currentIndex, replacement);
        replacement.durationDivisor = durationDivisor;
    }
}

function parseNumber(description: string, currentIndex: refNumber, replacement: Replacement): number {
        let symbol = description[currentIndex.value];
        console.log(symbol);
        let numberString = "";
        while (symbol >= '0' && symbol <= '9'){
            numberString += symbol;

            replacement.replacementTemplate += symbol;
            currentIndex.value++;
            symbol = description[currentIndex.value];
            console.log(symbol);
        }
        return Number.parseInt(numberString);
}

interface refNumber { value: number; };

interface Replacement{
    spellId: number,
    columnName: string,
    durationDivisor: number,
    replacementTemplate: string
}

function testParse(){
    let replacements = parse("Test desc $s1 hello, $123s2% hello again --$/1000d--. do something with $h% chance lasting $d around $a2 secondary area $123a1");
    console.log(replacements);
    console.log("done");
}

testParse();
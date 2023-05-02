const ruleArray = [
    ["E", "E", "+", "T"],
    ["E", "T"],
    ["T", "T", "*", "F"],
    ["T", "F"],
    ["F", "(", "E", ")"],
    ["F", "id"]
];
// const ruleArray = [
//     ["S", "A", "B"],
//     ["A", "a"],
//     ["B", 'b']
// ];
let bigCahoon = [];

let terminals = [];
let nonterminals = [];
function generateTerminalAndNonterminals() {
    terminals = [];
    nonterminals = [];
    let tempElements = []; //This is an array that has all the elements but only once. //Also Don't leave this bc it will make it wrong. 
    for (let i = 0; i < ruleArray.length; i++) {
        for (let j = 0; j < ruleArray[i].length; j++) {
            if (tempElements.indexOf(ruleArray[i][j]) === -1) {
                tempElements.push(ruleArray[i][j]);
            }
        }
    }
    tempElements.forEach(element => {
        if (element.charAt(0).match(/[A-Z]/i) && element.charAt(0) === element.charAt(0).toUpperCase()) {
            nonterminals.push(element);
        } else {
            terminals.push(element);
        }
    });
}

function makeLeadRule() {
    bigCahoon = [nonterminals[0] + "'", nonterminals[0]];
}



function makeTableButton() {
    generateTerminalAndNonterminals();
    // console.log(nonterminals); 
    console.log(bigCahoon);
    makeLeadRule();
    console.log(bigCahoon);
}
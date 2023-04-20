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

function findLeadRule() {
    //Takes the nonTerminal that doesn't have any rules where its not the head and the baby. 
    //Make copy of the list of terminals. 
    let tempNonTerms = [];
    for (let i = 0; i < nonterminals.length; i++) {
        tempNonTerms.push(nonterminals[i]);
    }

    for (let i = 0; i < tempNonTerms.length; i++) {
        for (let j = 0; j < ruleArray.length; j++) {
            if (ruleArray[j][0] != tempNonTerms[i]) {
                for (let k = 0; k < ruleArray[j].length; k++) {
                    if(tempNonTerms[i] === ruleArray[j][k]){
                        tempNonTerms.splice(i, 1); 
                    }
                }
            }
        }
    }
    console.log(tempNonTerms);
}


function makeTableButton() {
    generateTerminalAndNonterminals();
    // console.log(nonterminals); 
    findLeadRule();
}
/*
const ruleArray = [
    ["S", "X"],
    ["X", "(", "X", ")"],
    ["X", "(", ")"]
];

const terminals = ["(", ")"]; //Should We Include $? 
const nonterminals = ["S", "X"];
*/
const bigCahoon = ["E'", "E"];
const ruleArray = [
    ["E", "E", "+", "T"],
    ["E", "T"],
    ["T", "T", "*", "F"],
    ["T", "F"],
    ["F", "(", "E", ")"],
    ["F", "id"]
];
let terminals = [];
let nonterminals = [];

function generateTerminalAndNonterminals() {
    terminals = [];
    nonterminals = [];
    let tempElements = ["E", "id"]; //This is an array that has all the elements but only once. //Also Don't leave this bc it will make it wrong. 
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
    // console.log("Temp Elements: " + tempElements);
    // console.log("Terminals: " + terminals );
    // console.log("NonTerminals: " + nonterminals); 
}

function createTable() {
    generateTerminalAndNonterminals();
    document.getElementById("tableDiv").innerHTML = "<table>" + makeHeader() + "</table>";
    sundrops();
}

function makeHeader() {
    let tableString = "<tr><th></th><th colspan='" + (terminals.length + 1) + "'>Action </th><th class='blank'></th><th colspan='" + (nonterminals.length + 1) + "'>Goto</th></tr><tr><th>State</th>";

    for (let i = 0; i < terminals.length; i++) {
        tableString += "<td>" + terminals[i] + "</td>"
    }
    tableString += "<td>$</td><td class='blank'</td>";
    for (let i = 0; i < nonterminals.length; i++) {
        tableString += "<td>" + nonterminals[i] + "</td>"
    }
    tableString += "</tr>";
    return tableString;
}


function sundrops() {
    //Begin Temperary Code:

    //End Temperary Code. 


    let state = [];
    let stack = [];
    let si = [];
    //Push the first rule to stack. 
    state.push(bigCahoon);
    si.push(1);

    stack.push(getNext(0, state, si));//This can be rewritten once done coding, Makes it more abstract. 
    for (let h = 0; h < stack.length; h++) {
        for (let i = 0; i < ruleArray.length; i++) {
            if (stack[h] == ruleArray[i][0]) { //If element on stack is the first element of a rule. Then we add it to our state;
                // console.log("Rule "+ i+ " Belongs To The Stack: " + ruleArray[i]); 
                state.push(ruleArray[i]);
                si.push(1);
                //only add to stack if not already in it. 
                for (e in stack) {
                    if (stack.indexOf(ruleArray[i][1]) === -1) { //If the first element belongs to 
                        // console.log(ruleArray[i][1] + " has not been added to stack yet!"); 
                        stack.push(ruleArray[i][1]);
                    }
                }
            }
        }
    }


    //Okay Now We want to find all the Rules in Stack thats next element is an E.
    let state2 = [];
    let stack2 = [];
    let si2 = [];
    let j = 0;
    for (let i = 0; i < state.length; i++) {
        if (stack[j] === state[i][si[i]] && si[i] != "END") {
            // console.log("True for: " + state[i]);
            state2.push(state[i]);
            // if(s1[i] === state[i].length
            console.log("State[].length: " + state[i].length + " and s1[i]: " + (si[i] + 1));
            if ((si[i] + 1) === state[i].length) {  
                si2.push("END");
            } else {
                si2.push(si[i] + 1);
            }
        }
    }
    console.log(state2);
    console.log(si2);
    console.log("Neg One Output: " + state2[0][si2[0]]);

    //Output of Stack
    console.log("\nFinal Output of Arrays: ");
    console.log(state);
    console.log(stack);
    console.log(si);
    console.log("End sundrop.");

}


//This function is temporary to help make it easier to understand the indexes are the same. 
function getNext(index, state, si) {
    return (state[index][si[index]]);
}


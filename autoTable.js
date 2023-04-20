const bigCahoon = ["E'", "E"];
const ruleArray = [
    ["E", "E", "+", "T"],
    ["E", "T"],
    ["T", "T", "*", "F"],
    ["T", "F"],
    ["F", "(", "E", ")"],
    ["F", "id"]
];

// const bigCahoon = ["S'", "S"];
// const ruleArray = [
//     ["S", "A", "B"],
//     ["A", "a"],
//     ["B", 'b']
// ];
let terminals = [];
let nonterminals = [];

let states = [];

let actionTable = []; //Should correspond to the terminalCharacters & nonTerminalCharacters. 

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

function makeTableButton() {
    generateTerminalAndNonterminals();
    sundrop();
    // actionTable[1][getIndexOfTokens("$")] = 9999;
    createTable();
}

function createTable() {
    document.getElementById("tableDiv").innerHTML = "<table>" + makeHeader() + makeTable() + "</table>";
    console.log(actionTable);
}



function tokenToIndex(token) {
    if(token === "$"){
        return terminals.length; 
    }
    for (let i = 0; i < terminals.length; i++) {
        if (token === terminals[i]) {
            return i;
        }
    }
    for (let i = 0; i < nonterminals.length; i++) {
        if (token === nonterminals[i]) {
            return i + terminals.length + 1;
        }
    }
    return "ERROR";

}

function addRowToActionTable(stateCount) {
    let tempRow = [];
    for (let i = 0; i < terminals.length; i++) {
        tempRow.push(-1);
    }
    tempRow.push(-1); //This is for $
    for (let i = 0; i < nonterminals.length; i++) {
        tempRow.push(-2);
    }
    actionTable[stateCount] = tempRow;
}

function makeHeader() {
    let tableString = "<tr><th></th><th colspan='" + (terminals.length + 1) + "'>Action </th><th class='blank'></th><th colspan='" + (nonterminals.length + 1) + "'>Goto</th></tr><tr><th>State</th>";

    for (let i = 0; i < terminals.length; i++) {
        tableString += "<td>" + terminals[i] + "</td>"
    }
    tableString += "<td>$</td><td class='blank'></td>";
    for (let i = 0; i < nonterminals.length; i++) {
        tableString += "<td>" + nonterminals[i] + "</td>"
    }
    tableString += "</tr>";
    return tableString;
}

//Makes the body of the HTML Table. 
function makeTable() {
    let tableString = "";
    for (let i = 0; i < actionTable.length; i++) {
        tableString += "<tr>";
        tableString += "<th>" + i + "</th>";
        for (let j = 0; j < terminals.length + 1; j++) {
            if (actionTable[i][j] == -1) {
                tableString += "<td></td>";
            } else {
                if (actionTable[i][j] === 9999) {
                    tableString += "<td>accept</td>";
                } else {
                    if (actionTable[i][j] >= 1000 && actionTable[i][j] < 2000) {//Checks to see if a shift. 
                        tableString += "<td> S" + (actionTable[i][j] - 1000) + "</td>";
                    } else {
                        tableString += "<td> R" + (actionTable[i][j] - 2000) + "</td>";
                    }
                }
            }
        }
        tableString += "<td class='blank'></td>";
        for (let j = terminals.length + 1; j < actionTable[i].length; j++) {
            if (actionTable[i][j] == -2) {
                tableString += "<td></td>";
            } else {
                tableString += "<td>" + (actionTable[i][j] - 1000) + "</td>";
            }
        }
        tableString += "</tr>";
    }
    return tableString;
}



//Delete this later.
function sundrop() {
    states = [new state(0)];
    states[0].generateFirst(bigCahoon);
    addRowToActionTable(0);

    let count = 1;
    for (let i = 0; i < states.length; i++) {
        while (states[i].stack.length != 0) {
            let p = states[i].returnRules();
            if (!isDuplicate(p, i)) {
                states.push(new state(count));
                states[count].generateIdentity(p[0], p[1]);
                //This is where we add to states. 
                addRowToActionTable(count);
                reduceToMatrix(count, states[count].findReduceRule());
                addToMatrix(count, i, p[2]);
                count++;
            }
        }
    }
    for (let i = 0; i < states.length; i++) {
        console.log(states[i].print());
        // states[i].findReduceRule(); 
        // console.log(states[i].findReduceRule());

        //Now we need to add reduction rules <3
    }

    function isDuplicate(p, i) {
        for (let e = 0; e < states.length; e++) {
            if (states[e].identity === makeString(p)) {
                // console.log(e);
                addToMatrix(e, i, p[2]);
                return true;
            }
        }
        return false;
    }

    function makeString(p) {
        let str = "";
        for (let i = 0; i < p[0].length; i++) {
            str += "(" + i + ") " + p[0][i][0] + " → ";
            for (let j = 1; j < p[1][i] && j < p[0][i].length; j++) {
                str += p[0][i][j] + " ";
            }
            str += "• ";
            for (let j = p[1][i]; j < p[0][i].length; j++) {
                str += p[0][i][j] + " ";
            }
            str += "\n";
        }
        return str;

    }
}

function addToMatrix(shiftState, currentState, nextToken) {
    actionTable[currentState][tokenToIndex(nextToken)] = 1000 + shiftState;
}

//Adds the reduce rules to the matrix. 
function reduceToMatrix(currentState, reduceRule) {
    if (reduceRule == 0) {
       actionTable[currentState][tokenToIndex("$")] = 9999; 
    //    console.log("WE HAVE AN ACCEPT SOMEWHERE"); 
    }
    else {
        for (let i = 0; i < terminals.length + 1; i++) {
            if (reduceRule != -1) {
                actionTable[currentState][i] = reduceRule + 2000;
            }
        }
    }
}

function getIndexOfTokens(token) {
    for (let i = 0; i < terminals.length; i++) {
        if (token === terminals[i]) {
            return i;
        }
    }
    if (token === "$") {
        return (terminals.length);
    }
    console.log("Error: not a token!");
}

class state {
    indexes = [];
    rules = [];
    stack = [];
    name;
    identityRules = [];
    identity;

    constructor(name) {
        this.name = name;
    }
    generateIdentity(ir, ind) {
        this.identityRules = ir;
        this.indexes = ind;
        this.makeIdentity();
        this.generateStack();
        this.addIdentityToRules();
        this.generateClosed();
    }

    generateStack() {
        for (let i = 0; i < this.identityRules.length; i++) {
            //Oh yeah we need to like make sure its not already in the stack. 
            //And We also need to make sure its not the last one<3
            if (this.indexes[i] < this.identityRules[i].length) {
                if (this.stack.indexOf(this.getNextIdentity(i))) {
                    this.stack.push(this.getNextIdentity(i));
                }
            }
        }
    }

    generateFirst(firstRule) {
        this.identityRules = [firstRule]; //pushes the first rule to the thing.
        this.indexes.push(1); //pushes the index of the first thing. 
        this.makeIdentity();
        this.stack.push(firstRule[1]);
        this.rules.push(firstRule);
        this.generateClosed();
    }

    //We Need to generate the following rules from here <3
    generateClosed() {
        for (let h = 0; h < this.stack.length; h++) {
            for (let i = 0; i < ruleArray.length; i++) {
                if (this.stack[h] == ruleArray[i][0]) {
                    this.rules.push(ruleArray[i]);
                    this.indexes.push(1);
                    //Check to see if we can add it to the stack. 
                    for (let e in this.stack) {
                        if (this.stack.indexOf(ruleArray[i][1]) === -1) {
                            this.stack.push(ruleArray[i][1]);
                        }
                    }
                }
            }
        }
    }

    //Prints the rules for the current state. 
    printRules() {
        let str = "Rules: \n";
        for (let i = 0; i < this.rules.length; i++) {
            str += "(" + i + ") " + this.rules[i][0] + " → ";

            for (let j = 1; j < this.indexes[i] && j < this.rules[i].length; j++) {
                str += this.rules[i][j] + " ";
            }
            str += "• ";
            for (let j = this.indexes[i]; j < this.rules[i].length; j++) {
                str += this.rules[i][j] + " ";
            }
            str += "\n";
        }
        return str;
    }

    printStack() {
        return "Stack: [" + this.stack + "]";
    }

    print() {
        return "State: " + this.name + "\n" + this.printStack() + "\n" + this.printRules() + "\n" + this.printIdentity();
    }

    printIdentity() {
        return "Identity Rules: \n" + this.identity;
    }

    getNext(int) {
        return this.rules[int][this.indexes[int]];
    }

    getNextIdentity(int) {
        return this.identityRules[int][this.indexes[int]];
    }

    addIdentityToRules() {
        for (let i = 0; i < this.identityRules.length; i++) {
            this.rules.push(this.identityRules[i]);
        }
    }

    //return an array with all the rules thats next elements are r. 
    returnRules() {
        let r = this.stack.shift();
        let p = [];
        let pi = [];
        for (let i = 0; i < this.rules.length; i++) {
            if (r === this.getNext(i)) {
                p.push(this.rules[i]);
                pi.push(this.indexes[i] + 1);
            }
        }
        return [p, pi, r];
    }

    //Makes the string Identity for the state. Which is used to compare the identity of this state to other states. 
    makeIdentity() {
        let str = "";
        for (let i = 0; i < this.identityRules.length; i++) {
            str += "(" + i + ") " + this.identityRules[i][0] + " → ";
            for (let j = 1; j < this.indexes[i] && j < this.identityRules[i].length; j++) {
                str += this.identityRules[i][j] + " ";
            }
            str += "• ";
            for (let j = this.indexes[i]; j < this.identityRules[i].length; j++) {
                str += this.identityRules[i][j] + " ";
            }
            str += "\n";
        }
        this.identity = str;
    }

    findReduceRule() {
        //We need to iterate through all the rules and check to see if the index is past any of the length of that rule. 
        
        
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i].length === this.indexes[i]) {
                for (let e = 0; e < ruleArray.length; e++) {
                    if (JSON.stringify(ruleArray[e]) === JSON.stringify(this.rules[i])) {
                        return e + 1;
                    }
                }
                if(JSON.stringify(bigCahoon) === JSON.stringify(this.rules[i])){
                    console.log("WE FOUND THE ACCEPT" + this.name);
                    return 0; 
                }
            }
        }
        return -1;

    }
}
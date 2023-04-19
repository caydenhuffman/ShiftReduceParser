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

let states = []; 

let actionTable = []; //Should correspond to the terminalCharacters. 

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
}

function makeTableButton(){
    generateTerminalAndNonterminals();
    sundrop();
    createTable(); 

}

function createTable() {
    document.getElementById("tableDiv").innerHTML = "<table>" + makeHeader() + "</table>";
    createActionTable(); 
}

function createActionTable(){
    for(let i = 0; i < states.length; i++){
        let arr = [];
        for(let j = 0; j < terminals.length; j++){
            if(actionTable[i][j] = ""); 
            arr.push(""); 
        }
        actionTable.push(arr); 
    }
    console.log(actionTable); 
    //wait that is actually how it goes!
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

//Delete this later.
function sundrop() {
    states = [new state(0)];
    states[0].generateFirst(bigCahoon);

    let count = 1;
    for (let i = 0; i < states.length; i++) {
        while (states[i].stack.length != 0) {
            let p = states[i].returnRules();
            if (!isDuplicate(p, i)) {
                states.push(new state(count));
                states[count].generateIdentity(p[0], p[1]);
                count++;
            }
        }
    }
    for (let i = 0; i < states.length; i++) {
        console.log(states[i].print());
    }

    function isDuplicate(p, i) {
        for (e in states) {
            if (states[e].identity === makeString(p)) {
                // console.log("THERES A DUPLICATE at " + e);
                addToMatrix(e, i, p[2]);
                return true;
            }
        }
        // console.log("THERE IS A UNIQUE ITEM");
        addToMatrix(count, i, p[2]);

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
    // bigString += "Add [" + currentState + ", " + nextToken + "] = " + shiftState + "\n";
    

}

//Array should either be terminals or nonTerminals
function getIndexOfTokens(token, array){
    for(let i = 0; i < array.length; i++){
        if(token === array[i]){
            return i;
        }
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
}
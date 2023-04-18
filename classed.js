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
}

function createTable() {
    generateTerminalAndNonterminals();
    document.getElementById("tableDiv").innerHTML = "<table>" + makeHeader() + "</table>";
    sundrop();
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
    // let s0 = new state(0);
    // s0.generateFirst(bigCahoon);
    // // s0.generateClosed(); 
    // // console.log(s0.print());

    // let s1 = new state(1);
    // s1.generateIdentity([bigCahoon, ruleArray[0]], [, 2]);
    // // console.log(s1.print());
    // // console.log(s1.stack);

    // let s2 = new state(2);
    // s2.generateIdentity([ruleArray[0]], [3]);
    // // console.log(s2.print());
    // // let s1 = s0.generateClosed(); 

    // let s3 = new state(3);
    // s3.generateIdentity([ruleArray[0], ruleArray[2]], [4, 2]);
    // // console.log(s3.print());

    // let s4 = new state(4);
    // s4.generateIdentity([ruleArray[2]], [3]);
    // // console.log(s4.print());

    // let s6 = new state(6); 
    // s6.generateIdentity([ruleArray[4]], [2]); 
    // // console.log(s6.print()); 

    // let s7 = new state(7); 
    // s7.generateIdentity([ruleArray[4], ruleArray[0]], [3, 2]); 
    // // console.log(s7.print()); 

    // let states = [s0, s1, s2, s3, s4, s6, s7]; 
    // let p = states[1].returnRules(); 

    // for(e in states){
    //     console.log( states[e].print()); 
    // }
    // console.log("IS IT TRUE? " + isDuplicate(p));
    // console.log("IS IT TRUE? " + isDuplicate(["F", "id"]))
    // console.log("\n\nRedraw");
    // for(e in states){
    //     console.log(states[e].print()); 
    // }

    let states = [new state(0)];
    states[0].generateFirst(bigCahoon);


    let count = 1;
    for (let i = 0; i < states.length; i++) {
        let ppp = 0;
        while (states[i].stack.length != 0) {
            ppp++;
            let p = states[i].returnRules();
            //First we need to check to see if its a duplicate or not.

            if (isDuplicate(p)) {
                // console.log("This one is not safe to add " + p[0]);
                // console.log(states[i].stack.shift() + " is discarded from " + i);
                // states[i].stack.shift(); //Doing this for safety and stuff. Honestly, don't even know if its needed. 
            } else {
                // console.log("This one is safe to add " + p[0]);
                states.push(new state(count));
                states[count].generateIdentity(p[0], p[1]);
                count++;
            }
            // states.push(new state(1));
            // states[1].generateIdentity(p[0], p[1]);
            // count++;
        }
    }
    for (let i = 0; i < states.length; i++) {
        console.log(states[i].print());

    }
    console.log(states);


    function isDuplicate(p) {
        for (e in states) {
            if (JSON.stringify(states[e].identityRules) === JSON.stringify(p[0]) && JSON.stringify(states[e].returnIdentityIndexes()) === JSON.stringify(p[1])) {
                // console.log("THERES A MATCH AT " + e); //if theres a match then that means we wouldn't want to do anything. 
                // states.push(new state("PENIS"));
                console.log("THERES A DUPLICATE at " + e); 
                return true;
            }
        }
        console.log("THIS IS A UNIQUE ITEM"); 
        return false;
    }

}


class state {
    indexes = [];
    rules = [];
    identityIndex;
    stack = [];
    name;

    constructor(name) {
        this.name = name;
    }
    generateIdentity(ir, ind) {
        this.identityRules = ir;
        this.indexes = ind;
        //I guess we could do it that way. 

        //before all this stuff check to see if this identity is unique <3. 
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
        this.stack.push(firstRule[1]);
        this.rules.push(firstRule);

        // this.stack.push("T")
        this.generateClosed();
    }

    //We Need to generate the following rules from here <3
    generateClosed() {
        for (let h = 0; h < this.stack.length; h++) {
            for (let i = 0; i < ruleArray.length; i++) {
                if (this.stack[h] == ruleArray[i][0]) {
                    // console.log("This rule belongs: " + ruleArray[i]); 
                    this.rules.push(ruleArray[i]);
                    this.indexes.push(1);
                    //Check to see if we can add it to the stack. 
                    for (let e in this.stack) {
                        // console.log(ruleArray[i]+" Stackle " + this.stack[e]);
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
        // console.log("")
        return "State: " + this.name + "\n" + this.printStack() + "\n" + this.printRules() + "\n" + this.printIdentity();
    }

    printIdentity() {
        let str = "Identity Rules: \n";
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
        return str;
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
                // console.log("The next character matches for: " + this.rules[i]);
                //but we also need to find the next character. 
                p.push(this.rules[i]);
                pi.push(this.indexes[i] + 1);
            }
        }
        return [p, pi];
    }

    returnIdentityIndexes() {
        return this.indexes.slice(0, this.identityRules.length);
    }





}
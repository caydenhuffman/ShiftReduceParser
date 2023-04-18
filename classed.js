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
    // // console.log(s0.print());
    // let states = [s0]; 

    // let s1 = new state(1); 
    // let p = s0.returnRules(); //Pushing E off stack.
    // console.log("(1) Duplicate? " + isDuplicate(p));

    // s1.generateIdentity(p[0], p[1]); 
    // console.log("" + makeString(p) + "\n\nVS\n\n" + s0.identity); 

    // console.log("EQUAL: " + (makeString(p) === s0.identity));
    // states.push(s1); 



    // let s2 = new state(2); 
    // p = s0.returnRules(); //Pushing T off stack.
    // s2.generateIdentity(p[0], p[1]);
    // states.push(s2); 

    // let s3 = new state(3); 
    // p = s0.returnRules(); //Pushing F off stack.
    // s3.generateIdentity(p[0], p[1]);
    // states.push(s3); 


    // // let states = [s0, s1, s2, s3];
    // for (s in states) {
    //     console.log(states[s].print());
    // }


    // let s3 = new state(3);
    // s3.generateIdentity([ruleArray[0], ruleArray[2]], [4, 2]);
    // console.log(s3.print());

    // let s4 = new state(4);
    // s4.generateIdentity([ruleArray[2]], [3]);
    // console.log(s4.print());



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
            if (!isDuplicate(p)) {
                states.push(new state(count));
                states[count].generateIdentity(p[0], p[1]);
                count++;
            }
        }
    }
    for (let i = 0; i < states.length; i++) {
        console.log(states[i].print());

    }
    console.log(states);

    //I don't know why this function is inside another function. 
    /*
    function isDuplicate(p) {
        for (e in states) {
            if (JSON.stringify(states[e].identityRules) === JSON.stringify(p[0]) && JSON.stringify(states[e].returnIdentityIndexes()) === JSON.stringify(p[1])) {
                console.log("THERES A DUPLICATE at " + e);
                return true;
            }
        }
        console.log("THIS IS A UNIQUE ITEM");
        return false;
    }
    */

    //p = [[rules],[indexes]]
    function isDuplicate(p) {
        for (e in states) {
            //If they are identitical then we return true. We were trying to add a state that already exists.  
            if (states[e].identity === makeString(p)) {
                console.log("THERES A DUPLICATE at " + e);
                return true;
            } 
        }
        console.log("THERE IS A UNIQUE ITEM");
        // console.log("State[" + e + "]: Identity\n"+states[e].identity + "\nMake Identity:\n" + makeString(p)); 
        // console.log("Equivalent: " + (states[e].identity === makeString(p)));
        return false;//should be false. 
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
        // console.log("HERE IS THE MAKE: \n" + str);
        // console.log(p); 
    }

    /*makeIdentity() {
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
    */
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
        this.makeIdentity(); //Do We Keep This One? 
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
                // console.log("The next character matches for: " + this.rules[i]);
                //but we also need to find the next character. 
                p.push(this.rules[i]);
                pi.push(this.indexes[i] + 1);
            }
        }
        return [p, pi];
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
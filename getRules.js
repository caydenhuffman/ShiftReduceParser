function deleted(id) {
    console.log("Delted " + id);
    ruleArray.splice(id, 1);
    updateRules();

}

let ruleArray = []; //This is an array of all the rules. 
let terminals = [];//this is an array of all the terminal elements
let nonTerminals = []; //This is an array of all the nonterminal elements. 
let elements = []; //This is an array of all the elements. 
function button() {
    analysis();
    updateRules();
    removeDuplicates(elements); 
}

function updateRules() {
    let string = "<ol>";
    for (let i = 0; i < ruleArray.length; i++) {
        // string += "<li id=''>" + ruleArray[i] + "</li>";
        string += `<li id="rule${i}" onclick="deleted(${i})">${ruleArray[i]}</li>`
    }
    string += "</ol>"
    document.getElementById("ruleDiv").innerHTML = string;
}
//Needs to check if its a nonterminal or a terminal. 
function analysis() {
    let ra = document.getElementById("ruleInput").value.split(" ");


    //The First one should always be a nonterminal character.
    if (ra[1] === "->") {
        // ra[1] = "→";
        ra.splice(1, 1);
        // console.log(ra);
    }
    let string = ra[0] + " →";
    elements.push(ra[0]); 
    for (let i = 1; i < ra.length; i++) {
        string += " " + ra[i];
        elements.push(ra[i]);
    }
    // console.log(elements);
    ruleArray.push(string);
    // removeDuplicates(elements);

}

function removeDuplicates(array) {
    //wait how do I know which one to do? 
    //I Think we just need to worry about the nontemrinals separately, and then at the end.
    let e = [];
    terminals = []; 
    nonterminals = []; 
    for (let i = 0; i < array.length; i++) {
        if (e.indexOf(array[i]) === -1) {
            e.push(array[i]);
        }
    }
    console.log("Elements: ");
    for (let i = 0; i < e.length; i++) {
        if (e[i].charAt(0).match(/[A-Z]/i) && e[i].charAt(0) === e[i].charAt(0).toUpperCase()) {
            nonTerminals.push(e[i]);
        } else {
            terminals.push(e[i]); 
        }
    }

    
    console.log("Terminals: " + terminals + "\nNonTerminals: " + nonTerminals);

}
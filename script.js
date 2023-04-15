let array = [];
let column;
let row = 0;
let output = "0";

let boolean = true;


// let ci = 0;
// let ri = 0;  
let i = 0;
function but() {
    //Initalizing start
    let count = 0;
    output = "0"; 
    row = 0; 
    boolean = true; 
    //Initializing end
    input = document.getElementById("input").value;
    document.getElementById("output").innerHTML = "";
    arrayize(input);
    while(boolean && count < 30){
        console.log("WHILE LOOPED");
        action(); 
        printData(); 
        count++; 
    }

}


//Needs to check for accuracy later. 
function arrayize(str) {
    array = str.slice(0, -1).split(" ");
    array.push(str.slice(-1));
    // console.log("array: [" + array + "]");
    console.log("Initial State: ")
    column = array[0];
    array.shift();//We split this up into two to make it visaully make more sense.
    printData();
}

function next() {
    action();
    printData();
}

function printData() {
    console.log("Array: [" + array + "]\ncolumn: " + column + "\nrow: " + row + "\nOutput: " + output);
    document.getElementById("output").innerHTML += `<p><u>Stack:</u> <mark>${column}</mark>, ${array}</p><p><u>Row</u>: ${row}</p><p>${output}</p><hr>`;
}

//Maybe Shift Should be its own funciton. 
function action() {
    if (row === 0) {
        if (column === "id") {
            shift(5);
        } else if (column === "(") {
            shift(4);
        }
    } else if (row === 1) {
        if (column === "+") {
            shift(6);
        } else if (column === "$") {
            column = "";
            console.log("accept".toUpperCase());
            boolean = false;
        }
    } else if (row === 2) {
        if (column === "+" || column === ")" || column === "$") {
            reduce(2);
        } else if (column === "*") {
            shift(7);
        }
    } else if (row === 3) {
        if (column === "+" || column === "*" || column === ")" || column === "$") {
            reduce(4);
        }
    } else if (row === 5) {
        if (column === "+") {
            reduce(6);
        } else if (column === "*") {
            reduce(6);
        } else if (column === "(") {
            reduce(6);
        } else if (column === "$") {
            reduce(6);
        }
    } else if (row === 6) {
        if (column === "id") {
            shift(5);
        } else if (column === "(") {
            shift(4);
        }
    } else if (row === 7) {
        if (column === "id") {
            shift(5);
        } else if (column === "(") {
            shift(4);
        }
    } else if (row === 8) {
        if(column === "+"){
            shift(6);
        } else if(column === ")"){
            shift(11); 
        }
    } else if (row === 9) {
        if (column === "*") {
            shift(7);
        } else if (column === ")" || column === "+" || column === "$") {
            reduce(1);
        }
    } else if (row === 10) {
        if (column === "+" || column === "*" || column === ")" || column === "$") {
            // console.log("Reduce 3");
            reduce(3);
        }
    } else if(row === 11){
        if (column === "+" || column === "*" || column === ")" || column === "$") {
            reduce(5);
        }
    }
}

//Lets change this all to a stack. And then we can procede. A
function reduce(rule) {
    if (rule === 1) {
        //E + T -> E
        i = output.lastIndexOf("E");
        //Check to see if correct!; 
        output = output.substring(0, i) + "E";
        Goto(output.charAt(i - 1));
    }

    if (rule === 2) {
        //T -> E. 
        i = output.lastIndexOf("T");
        output = output.substring(0, i) + "E";
        Goto(output.charAt(i - 1));
    }
    if (rule === 3) {
        i = output.search(/T[0-9]+\*[0-9]+F[0-9]+/g); //We need this to work like backwards. 
        output = output.substring(0, i) + "T";
        Goto(output.charAt(i - 1));

    }

    if (rule === 4) {
        //F -> T
        i = output.lastIndexOf("F");
        output = output.substring(0, i) + "T";
        Goto(output.charAt(i - 1));
    }
    if (rule === 5){ //Pretty Sure this one doesn't work. 
        //(E) -> F.
        i = output.lastIndexOf("("); 
        output = output.substring(0, i) + "F"; 
    }
    if (rule === 6) {
        //id -> F. 
        i = output.lastIndexOf("id");
        output = output.substring(0, i) + "F";
        // console.log("Index: " + output.charAt(i - 1)); 
        Goto(output.charAt(i - 1)); //Okay that should be zero. So were like setting the column equal to that. 

    }
}


function Goto(state) {
    val = output.slice(-1);
    // console.log("Value: " + val); 
    // console.log()
    // console.log("State: " + state);
    if (state == 0) {
        if (val === "F") {
            //3.
            output += "3";
            row = 3;
            //We need to update the state. 
        }
        if (val === "T") {
            //2. 
            output += "2";
            row = 2;
        }
        if (val === "E") {
            output += "1";
            row = 1;
        }
    } else if (state == 4) {
        if (val === "E") {
            output += "8";
            row = 8;
        } else if (val === "T") {
            output += "2";
            row = 2;
        } else if (val === "F") {
            output += "3";
            row = 3;
        }
    } else if (state == 6) {
        if (val === "T") {
            output += "9";
            row = 9;
        } else if (val === "F") {
            output += "3";
            row = 3;
        }
    } else if (state == 7) {
        if (val === "F") {
            output += "10";
            row = 10;// This could cause major prolbems using strings the way I am. Maybe go back and use a stack. 
        }
    }
}


function shift(state) {
    row = state;
    output += column + "" + state;
    column = array.shift();

}
//Lets make a table that we can update and stuff. 
//We should make all the elemnts in an array. 

// let array = [
//     // ["<th></th>", '<th colspan="6">Action</th>', '<th class="blank"> </th>', '<th colspan="3">Goto</th>'],
//     // ['<th>State</th>', '<td>id</td>', '<td>+</td>', '<td>*</td>', '<td>(</td>', '<td>)</td>', '<td>$</td>', '<td class="blank"></td>', '<td>E</td>', '<td>T</td>', '<td>F</td>'],
//     ['<th>0</th>', '<td>S5</td>', '<td></td>', '<td></td>', '<td>S4</td>', '<td></td>', '<td></td>', '<td class="blank"></td>', '<td>1</td>', '<td>2</td>', '<td>3</td>'],
//     ['<th>1</th>', '<td></td>', '<td>S6</td>', '<td></td>', '<td></td>', '<td></td>', '<td>accept</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>2</th>', '<td></td>', '<td>R2</td>', '<td>S7</td>', '<td></td>', '<td>R2</td>', '<td>R2</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>3</th>', '<td></td>', '<td>R4</td>', '<td>R4</td>', '<td></td>', '<td>R4</td>', '<td>R4</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>4</th>', '<td>S5</td>', '<td></td>', '<td></td>', '<td>S4</td>', '<td></td>', '<td></td>', '<td class="blank"></td>', '<td>8</td>', '<td>2</td>', '<td>3</td>'],
//     ['<th>5</th>', '<td></td>', '<td>R6</td>', '<td>R6</td>', '<td></td>', '<td>R6</td>', '<td>R6</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>6</th>', '<td>S5</td>', '<td></td>', '<td></td>', '<td>S4</td>', '<td></td>', '<td></td>', '<td class="blank"></td>', '<td></td>', '<td>9</td>', '<td>3</td>'],
//     ['<th>7</th>', '<td>S5</td>', '<td></td>', '<td></td>', '<td>S4</td>', '<td></td>', '<td></td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td>10</td>'],
//     ['<th>8</th>', '<td></td>', '<td>S6</td>', '<td></td>', '<td></td>', '<td>S11</td>', '<td></td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>9</th>', '<td></td>', '<td>R1</td>', '<td>S7</td>', '<td></td>', '<td>R1</td>', '<td>R1</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>10</th>', '<td></td>', '<td>R3</td>', '<td>R3</td>', '<td></td>', '<td>R3</td>', '<td>R3</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>'],
//     ['<th>11</th>', '<td></td>', '<td>R5</td>', '<td>R5</td>', '<td></td>', '<td>R5</td>', '<td>R5</td>', '<td class="blank"></td>', '<td></td>', '<td></td>', '<td></td>']
// ];

let history0 = [
    ['S5', '', '', 'S4', '', ''],
    ['', 'S6', '', '', '', 'accept'],
    ['', 'R2', 'S7', '', 'R2', 'R2'],
    ['', 'R4', 'R4', '', 'R4', 'R4'],
    ['S5', '', '', 'S4', '', ''],
    ['', 'R6', 'R6', '', 'R6', 'R6'],
    ['S5', '', '', 'S4', '', ''],
    ['S5', '', '', 'S4', '', ''],
    ['', 'S6', '', '', 'S11', ''],
    ['', 'R1', 'S7', '', 'R1', 'R1'],
    ['', 'R3', 'R3', '', 'R3', 'R3'],
    ['', 'R5', 'R5', '', 'R5', 'R5']
]; 
let actionArray = [
    ['S5', '', '', 'S4', '', ''],
    ['', 'S6', '', '', '', 'accept'],
    ['', 'R2', 'S7', '', 'R2', 'R2'],
    ['', 'R4', 'R4', '', 'R4', 'R4'],
    ['S5', '', '', 'S4', '', ''],
    ['', 'R6', 'R6', '', 'R6', 'R6'],
    ['S5', '', '', 'S4', '', ''],
    ['S5', '', '', 'S4', '', ''],
    ['', 'S6', '', '', 'S11', ''],
    ['', 'R1', 'S7', '', 'R1', 'R1'],
    ['', 'R3', 'R3', '', 'R3', 'R3'],
    ['', 'R5', 'R5', '', 'R5', 'R5']
];

let gotoArray = [
    ['1', '2', '3'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['8', '2', '3'],
    ['', '', ''],
    ['', '9', '3'],
    ['', '', '10'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

function go() {
    //Lets like make a copy of the original and then have a changeable one. 
    // history0 = [...actionArray]; 
    document.getElementById("table").innerHTML = createTable();
}

//This creates a string, which is probably, what we'd want to use anyways, So we could store history in an array of strings. 
function createTable() {
    table = `<table> <tr><th> </th><th colspan="6">Action</th><th class="blank"> </th><th colspan="3">Goto</th></tr><tr><th>State</th><td>id</td><td>+</td><td>*</td><td>(</td><td>)</td><td>$</td><td class="blank"></td><td>E</td><td>T</td><td>F</td></tr>`;
    for (let i = 0; i < actionArray.length; i++) {
        table += `<tr> <th>${i}</th>`;
        for (let j = 0; j < actionArray[i].length; j++) {
            table += "<td>" + actionArray[i][j] + "</td>";
        }
        table += '<td class="blank"></td><td>' + gotoArray[i][0] + "</td><td>" + gotoArray[i][1] + "</td><td>" + gotoArray[i][2] + "</td></tr>";
    }
    table += "</table>"

    return table;
}


function button() {
    let row = document.getElementById("rowInput").value;
    let col = convert(document.getElementById("columnInput").value);
    for (let i = 0; i < actionArray.length; i++) {
        for (let j = 0; j < actionArray[i].length; j++) {
            actionArray[i][j] = history0[i][j];
        }
    }
    // document.getElementById("outer").innerHTML = `<p>[${row}][${col}]</p>`;
    //Okay lets now highlight that Text. 
    actionArray[row][col] = `<mark>${actionArray[row][col]}</mark>`;
    go();
}

function convert(key) {
    switch (key) {
        case "(":
            return 3;
        case "id":
            return 0;
        case "+":
            return 1;
        case "*":
            return 2;
        case ")":
            return 4;
        case "$":
            return 5;
        default:
            return key;
    }
}
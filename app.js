"use strict";
//data of credit cards in the universe
const subjectObject = {
  DBS: {
    "Card1": [1, 1.2, 4],
    "Card2": [1.2, 1.4, 3],
    "Card3": [1.6, 1.0, 2],
  },
  UOB: {
    "Card4": [1, 1.3, 4],
    "Card5": [1, 1.2, 4],
  },
  OCBC: {
    "Card6": [1, 1.2, 4],
    "Card7": [1, 1.2, 4],
  },
};

var spendType = {
  "Local Spend": ["Retail, Dining, Others"],
  "Overseas Spend": ["Retail, Dining, Others"],
  "Online Spend": ["Retail, Travel, Others"],
};

////////////////////////////////////////////////////////////

// console.log(subjectObject); // Result: Array of 3 objects
// console.log(subjectObject["DBS"]); // Result: DBS card details
// console.log(subjectObject["UOB"]); // Result: UOB card details
// console.log(subjectObject["OCBC"]); // Result: OCBC card details

// // Array of 3 banks [DBS, UOB, OCBC]
const allBanks = Object.keys(subjectObject);
// console.log(allBanks);

// // Object of all cards, separated by banks (using deep clone of above Object)
const clonedObject = JSON.parse(JSON.stringify(subjectObject));
const allCards = Object.values(clonedObject);
// console.log(allCards);

// New combined object of all cards
const allCardsCombined = Object.assign(...allCards);
// console.log(subjectObject);
// console.log(allCardsCombined);
// console.log(allCardsCombined['Card1']);

// Array of all card names
const allCardNames = Object.keys(allCardsCombined);
// console.log(allCardNames);

// Find the index of a particular card within the array of all card names
const index = allCardNames.findIndex((item) => item === "Card1");
// console.log(index);

////////////////////////////////////////////////////////////

//adding cards you own to your wallet and spendtype and spendamount
window.onload = function () {
  const bankSel = document.querySelector("#bank");
  const cardSel = document.querySelector("#card");

  for (const x in subjectObject) {
    bankSel.options[bankSel.options.length] = new Option(x, x);
  }

  bankSel.onchange = function () {
    //empty Chapters- and Topics- dropdowns
    cardSel.length = 1;
    //display the sub list  from the selected bank
    console.log(this.value); // returns selected bank
    console.log(subjectObject[this.value]);

    for (const y in subjectObject[this.value]) {
      cardSel.options[cardSel.options.length] = new Option(y, y);
    }
  };
  const spendSel = document.querySelector("#spendType");
  for (const z in spendType) {
    spendSel.options[spendSel.options.length] = new Option(z, z);
  }
};

//append cards you own to wallet


function addCard() {
  const selectedCard = document.querySelector("#card").value;
  //const index = allCardNames.findIndex((item) => item === selectedCard) + 1;
  let mycardDetails = allCardsCombined[`${selectedCard}`];
  localStorage.setItem(JSON.stringify(selectedCard), JSON.stringify(mycardDetails));
  // instead of just storing the name of the selected card ('selectedCard') in localStorage, you should try storing the card's full details
};




// To check what is stored in local storage
console.log(localStorage);
//console.log(localStorage.getItem(2));

const retrieveFromLocalStorage = () => {
  if (localStorage.length > 0) {
    for (var key in localStorage) {
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        ul.append(li);
        li.append(JSON.parse(key));
      }
    }
};
//retrieveFromLocalStorage();



function addSpend(event) {
  event.preventDefault();
  alert("OK");
  var spendType = document.getElementById("spendType");
  var spendAmount = document.getElementById("spendAmount");
  var table = document.getElementById("myTableData");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  
  row.insertCell(0).innerHTML= spendType.value;
  row.insertCell(1).innerHTML= spendAmount.value;
  row.insertCell(2).innerHTML= "x"; 'card to use'
  row.insertCell(3).innerHTML= "x"; '# of miles'
  row.insertCell(4).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
};

function deleteRow(obj) {
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index);
  
}
"use strict";
//data of credit cards in the universe

var subjectObject = {
  DBS: {
    'Altitude': [1.2],
    'Insginia': [1.6],
    'Women World Card': [0.4],
  },
  UOB: {
    'Privi Miles': [1.2],
    'Visa Infinite': [1.4],
  },
  OCBC: {
    'Voyage Card': [1.3],
    '90N': [1.2],
  }
};

var spendType = {
  "Local Spend": ["Retail, Dining, Others"],
  "Overseas Spend": ["Retail, Dining, Others"],
  "Online Spend": ["Retail, Travel, Others"],
};

///////////////////////////Creating the Datasets/////////////////////////////////

// // Array of 3 banks [DBS, UOB, OCBC]
const allBanks = Object.keys(subjectObject);

// // Object of all cards, separated by banks (using deep clone of above Object)
const clonedObject = JSON.parse(JSON.stringify(subjectObject));
const allCards = Object.values(clonedObject);

// New combined object of all cards
var allCardsCombined = Object.assign(...allCards);
// console.log(subjectObject);
// console.log(allCardsCombined);

// Array of all card names
const allCardNames = Object.keys(allCardsCombined);
//console.log(allCardNames);

// Find the index of a particular card within the array of all card names
const index = allCardNames.findIndex((item) => item === "Card1");
// console.log(index);

////////////////////////////////Creating the Dropdowns/////////////////////////////////////////

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
    //console.log(this.value); // returns selected bank
    //console.log(subjectObject[this.value]);

    for (const y in subjectObject[this.value]) {
      cardSel.options[cardSel.options.length] = new Option(y, y);
    }
  };
  const spendSel = document.querySelector("#spendType");
  for (const z in spendType) {
    spendSel.options[spendSel.options.length] = new Option(z, z);
  }
};

////////////////////////////////Creating your wallet of cards/////////////////////////////////////////

/////add cards selected to local storage
function addCard() {
  const selectedCard = document.querySelector("#card").value;
  //const index = allCardNames.findIndex((item) => item === selectedCard) + 1;
  let mycardDetails = allCardsCombined[`${selectedCard}`];
  localStorage.setItem(JSON.stringify(selectedCard), JSON.stringify(mycardDetails));
  // instead of just storing the name of the selected card ('selectedCard') in localStorage, you should try storing the card's full details
};

//// To check what is stored in local storage
//console.log(localStorage);

/////append cards you own to wallet
const retrieveFromLocalStorage = () => {
  if (localStorage.length > 0) {
    let keys = Object.keys(localStorage); // this line gets the keys from localStorage first
    for (let key of keys) {
      let ul = document.querySelector("ul");
      let li = document.createElement("li");
      ul.append(li);
      li.append(JSON.parse(key));
      }
    }
};
retrieveFromLocalStorage();

////////////////////////////////Creating your wallet of cards/////////////////////////////////////////

/////Populating the Analysis table
function addSpend() {
  var spendType = document.getElementById("spendType");
  var spendAmount = document.getElementById("spendAmount");
  var table = document.getElementById("myTableData");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
 
//adding values to table
  row.insertCell(0).innerHTML= spendType.value;
  row.insertCell(1).innerHTML= spendAmount.value;

//switching the database based on type of spend
  function switchCardsCombined (){
    
    var spendSelection = document.getElementById("spendType").value
    console.log(typeof spendSelection);
  
    switch (spendSelection){
      case "Local Spend":
        allCardsCombined = {
          'Altitude': [1.2],
          'Insginia': [1.6],
          'Women World Card': [0.4],
          'Privi Miles': [1.2],
          'Visa Infinite': [1.4],
          'Voyage Card': [1.3],
          '90N': [1.2],
          }
        break;
      case "Overseas Spend":
        allCardsCombined = {
          'Altitude': [2.0],
          'Insginia': [2.0],
          'Women World Card': [1.2],
          'Privi Miles': [2.4],
          'Visa Infinite': [2],
          'Voyage Card': [2.2],
          '90N': [2.1],
        };
        break;
        case "Online Spend":
          allCardsCombined = { 
            'Altitude': [1.2],
            'Insginia': [1.6],
            'Women World Card': [4.0],
            'Privi Miles': [1.4],
            'Visa Infinite': [1.4],
            'Voyage Card': [1.3],
            '90N': [1.2],
          }
    };
  
    return allCardsCombined
    
  }
  switchCardsCombined();
  
    //convert list of cards you have in wallet into an array
    var list = document.getElementById('ul').childNodes;
    var cardRawArray = [];
    for(var i=0;i < list.length; i++) {
      var arrValue = list[i].innerHTML;
      cardRawArray.push(arrValue);
    }//remove undefined
    var cardArrary = [];
    cardRawArray.forEach(element => {
      if (element !== undefined) {
        JSON.parse(cardArrary.push(element));
      }
    });
    console.log(cardArrary);
  
    //filter allcardscombined forcardArrary into newList
    let newList = Object.keys(allCardsCombined)
    .filter((key) => cardArrary.includes(key))
    .map((key) => {
      return {[key]: allCardsCombined[key]}
    })
    .reduce((a, b) => Object.assign({}, a,b));
  
  console.log(newList);

  //Get card with highest miles rate and the respective miles rate from new list and database
    var maxMiles = Math.max.apply(null,Object.keys(newList).map(function(x){ return newList[x] }));
    var maxCard = Object.keys(newList).filter(function(x){ return newList[x] == maxMiles; })[0];
    var numberofMiles = maxMiles * spendAmount.value;
  
    console.log(maxCard);
    console.log(maxMiles);

  row.insertCell(2).innerHTML= maxCard;
  row.insertCell(3).innerHTML= numberofMiles;
  row.insertCell(4).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
  

}
; 

const addSpendButton = document.querySelector("#addSpend"); // reference to Add Spend Button in HTML
addSpendButton.addEventListener("click",addSpend)
// adds event listener to button, on click run 'add Spend' and Cardscombined function



/////////add a delete row function
function deleteRow(obj) {
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index);
  
}

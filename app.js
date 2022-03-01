"use strict"
//data of credit cards in the universe
var subjectObject = {
    "DBS": {
      "Card 1": [1, 1.2, 4, "Lounge access"],
      "Card 2": [1.2, 1.4, 3, "None"],
      "Card 3": [1.6, 1.0, 2, "None"]
    },
    "UOB": {
      "Card 4": [1, 1.2, 4, "Lounge access"],
      "Card 5": [1, 1.2, 4, "Lounge access"],
    },
    "OCBC": {
        "Card 6": [1, 1.2, 4, "Lounge access"],
        "Card 7": [1, 1.2, 4, "Lounge access"],
      },
    
  }

  var spendType = {
    "Local Spend": ["Retail, Dining, Others"],
    "Overseas Spend": ["Retail, Dining, Others"],
    "Online Spend": ["Retail, Travel, Others"],

  }
  
  //adding cards you own to your wallet and spendtype and spendamount
  window.onload = function() {
    var bankSel = document.getElementById("bank");
    var cardSel = document.getElementById("card");
    for (var x in subjectObject) {
      bankSel.options[bankSel.options.length] = new Option(x, x);
    }

    bankSel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      cardSel.length = 1;
      //display the sub list  from the selected bank
      for (var y in subjectObject[this.value]) {
        cardSel.options[cardSel.options.length] = new Option(y, y);
      }
    }
    var spendSel = document.getElementById("spendType");
    for (var z in spendType) {
      spendSel.options[spendSel.options.length] = new Option(z, z);
   }
  }

  function addCard() {
    console.log("submitted");
    const selectedCard = document.querySelector("#card").value;
    const idx = allCardNames.findIndex((item) => item === selectedCard) + 1;
    localStorage.setItem(idx, JSON.stringify(selectedCard));
    // instead of just storing the name of the selected card ('selectedCard') in localStorage, you should try storing the card's full details
  }
  
  // To check what is stored in local storage
  // console.log(localStorage);
  // console.log(localStorage.getItem());
  
  const retrieveFromLocalStorage = () => {
    if (localStorage.length > 0) {
      for (let i = 0; i <= allCardNames.length; i++) {
        if (localStorage.getItem(i) != null) {
          let ul = document.querySelector("ul");
          let li = document.createElement("li");
          ul.append(li);
          li.append(JSON.parse(localStorage.getItem(i)));
        }
      }
    }
  };
  
  retrieveFromLocalStorage();

function addRow() {
  //document.getElementById('f1').innerHTML = document.form2.spendAmount.value;
  var SpendType = document.getElementById("spendType");
  var Amount = document.getElementById("SpendAmount");
  var cardSel = document.getElementById("card");
  var table = document.getElementById("myTableData");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  row.insertCell(0).innerHTML= SpendType.value
  row.insertCell(1).innerHTML= Amount.value;
  row.insertCell(2).innerHTML= "x"; '<card to use, highest miles rate from list of cards>'
  row.insertCell(3).innerHTML= "x"; '<# of miles, amount x row 2>'
  row.insertCell(4).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';

};

function deleteRow(obj) {
      
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index);
  
}




















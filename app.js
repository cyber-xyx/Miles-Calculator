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

//append cards you own to wallet
function addCard() {
  console.log("submitted");
  var selectedCard = document.getElementById("card").value;
  localStorage.setItem(selectedCard);
  document.getElementById("cardWallets").append(localStorage.getItem(selectedCard));
  console.log(selectedCard);

};



// const inputBox = document.querySelector('#input-box');
// const addItem = (e) => {
//   e.preventDefault();
//   const leftList = document.createElement("div");
//   leftList.className = "to-do-item";
//   const ul = document.createElement("ul");
//   if (inputBox.value.length === 0){
//       alert("Input Empty");
//   }else {
//       console.log("submitted");
//       const inputValue = document.querySelector("#input-box").value;
//       leftList.append(ul);
//       ul.append(inputValue);
//       document.querySelector("#to-do-list").append(leftList);
//   }};
















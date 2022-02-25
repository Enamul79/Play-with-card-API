const main = document.getElementById('main');
const searchButton = () =>{
   // console.log('clicked');
   const input = document.getElementById('input-value');
   const error = document.getElementById('error');
   // console.log(error);
   const inputValue = parseInt(input.value);
   // console.log(inputValue);
   if(isNaN(inputValue) || inputValue == ""){
      // alert('please enter a number');
      error.innerText = "please give a number";
      input.value = '';
      main.innerHTML = "";
   }else if(inputValue <= 0){
      error.innerText = "please give a positive number";
      input.value = '';
      main.innerHTML = "";
   }else if(inputValue > 52){
      error.innerText = "You cross the limit number!!";
      input.value = '';
      main.innerHTML = "";
   }else{
      fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
         .then(response => response.json())
         // .then(data => console.log(data))
         .then(data => cardsDisplay(data.cards))
         input.value = '';
         error.innerHTML ="";
   }
   input.value = '';
   main.innerHTML = "";
}

const cardsDisplay = (cards) =>{
   // console.log(cards);
   for(const card of cards){
      // console.log(card.image);
      const div = document.createElement('div');
      div.classList.add("col-lg-4");
      div.classList.add("mb-3");
      div.innerHTML =`<div class="card" style="width: 18rem;">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${card.suit}</h5>
               <p class="card-text">${card.code}</p>
               <button onclick="cardDetails('${card.code}')" class="btn btn-primary">See details</button>
            </div>
            </div>
      
      `;
      main.appendChild(div);
   }
}

const cardDetails =(code) =>{
   // console.log(code);
   fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
         .then(response => response.json())
         // .then(data => console.log(data))
         // .then(data => console.log(data))
         .then(data =>{
            const allCards = data.cards;
            // console.log(allCards);
            const singleCard = allCards.find(card=>card.code === code);
            // console.log(singleCard);
            const div = document.createElement('div');
            main.innerHTML = "";
            div.innerHTML =`<div class="card" style="width: 18rem;">
            <img src="${singleCard.image}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${singleCard.suit}</h5>
                  <p class="card-text">${singleCard.code}</p>
            
               </div>
               </div>
      
      `;
      main.appendChild(div);
         })
         
}
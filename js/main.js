
//Get the deck
let deckId = ''

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', getFetch)

let count1 = 0
let count2 = 0

function getFetch(){
  
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        let player1Card = data.cards[0].code
        let player2Card = data.cards[1].code
        let val1 = Number(cardValue(data.cards[0].value))
        let val2 = Number(cardValue(data.cards[1].value))

        document.querySelector('#howManyCardsLeft').innerText = data.remaining
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        
        if(val1 > val2){
          document.querySelector('#wonGame').innerText = 'Player 1 WON that round'
          count1 = count1 + 2
          document.querySelector('#cards1').innerText = count1
        }else if(val1 < val2){
          document.querySelector('#wonGame').innerText = 'Player 2 WON that round'
          count2 = count2 + 2
          document.querySelector('#cards2').innerText = count2
        }else{
          document.querySelector('h3').innerText = `No WAR...it's all good, here is your card`
          count1 = ++count1
          count2 = ++count2
          document.querySelector('#cards2').innerText = count2
          document.querySelector('#cards1').innerText = count1
        }

        if(data.remaining === 0 && count1 > count2){
          document.querySelector('#wonGame').innerText = 'Player 1 WON'
        }else if(data.remaining === 0 && count1 < count2){
          document.querySelector('#wonGame').innerText = 'Player 2 WON'
        }
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}

function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return val
  }
}


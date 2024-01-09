let time = 0 
let score = 0
let cardsLength = 0
let prevCard = null
let currentCard = null
let clicks = 0
const cardContainer = document.querySelector('.cards')

function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    
    return cards;
}

shuffle(cards)


for(let i in cards){
    cardContainer.innerHTML += `
    <div class='card'>
        <img class='${cards[i].title} card-image' src=${cards[i].image} />
        <img class='cover' src=${cards[i].cover} />
    </div>`
}

const cardsAll = document.querySelectorAll('.card')
cardsAll.forEach(card => {
    card.addEventListener('click', () => {
        if(clicks < 2 && !card.classList.contains('success')){
            if(prevCard !== null){
                currentCard = card
                card.classList.add('active')
            }else{
                prevCard = card
                card.classList.add('active')
            }
            if(prevCard !== null && currentCard !== null){
                setTimeout(() => {
                    choosedCards(prevCard, currentCard)
                    if(choosedCards(prevCard, currentCard)){
                        prevCard.classList.add('success')
                        currentCard.classList.add('success')
                        checkScore(score)
                        score += 1
                    }else{
                        prevCard.classList.remove('active')
                        currentCard.classList.remove('active')
                    }
                    prevCard = null
                    currentCard = null
                    clicks = 0
                }, 500)
            }
            clicks += 1
        }
    })
})


function choosedCards (prev, current){
    let prevImg = prev.querySelector('img')
    let currentImg = current.querySelector('img')
    return prevImg.getAttribute("class") == currentImg.getAttribute("class")
}

let interval
const blockedLevels = document.querySelectorAll('.blocked')

function checkScore(score){
    if(score === cards.length / 2 - 1){
        clearInterval(interval)
        document.querySelector('.score').textContent = 'WIN!'
        document.querySelector('.continue').style.display = 'block'
        document.querySelector('.btn').style.display = 'none'
    }
}

const timeline = document.querySelector('.timeline')
const startWidth = timeline.clientWidth
let timeLineTime = 0

const play = document.querySelector('.play')
play.addEventListener('click', () => {
    document.querySelector('.bg').style.display = 'none'
    if(play.textContent == 'RESTART'){
        location.reload()
    }
    interval = setInterval(() => {
        if(timeLineTime == 30){
            clearInterval(interval)
            document.querySelector('.score').textContent = 'LOSE!'
        }
        timeline.style.width = timeline.clientWidth - (100/30 * startWidth / 100) + 'px'
        timeLineTime += 1
    }, 1000)
    play.textContent = 'RESTART'
})

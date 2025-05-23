const shuffleButton = document.getElementById("shuffleButton");
const hideButton = document.getElementById("hideButton");
const logScoreButton = document.getElementById("logScore");
shuffleImages();
document.querySelector(".submit_pane_container").style.opacity = "0"



shuffleButton.addEventListener("click", () => {
    shuffleImages();
});

function shuffleImages(){
    const images = document.querySelectorAll(".card_wrapper ");

    const positions = [];

    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            positions.push({ row, col });
        }
    }

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    images.forEach((image, index) => {
        const pos = positions[index];
        image.style.gridRow = pos.row;
        image.style.gridColumn = pos.col;
    });
}

// document.querySelectorAll(".card_wrapper").forEach((wrapper) => {
//     wrapper.addEventListener("click", () => {
//         const card = wrapper.querySelector(".card");
//         card.classList.toggle("hidden");
//     });
// });

hideButton.addEventListener("click", () => {
    hideCards();
});

function hideCards(){
    if(document.querySelectorAll(".hidden").length > 0){
        document.createElement("h1").innerText = "All cards has to be flipped";
        return;
    }else{
    const wrappers = document.querySelectorAll(".card_wrapper");
    wrappers.forEach((wrapper, index) => {
        setTimeout(() => {
            const card = wrapper.querySelector(".card");
            card.classList.add("hidden");
        }, index * 200); 
    });
    }
}

let count = 0
let points = 0
let par = 0
let firstClicked = null
let firstClickedCard
let isProcessing = false;
let moves = 0
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
        checkForPair(card);
    })

})

function checkForPair(card){
    // if (isProcessing) return;
    const cardFront = card.querySelector(".card_front")
    if (cardFront.classList.contains("excluded")) return;
    card.classList.remove("hidden");
    if (!firstClicked) {
        firstClicked = cardFront;
        firstClickedCard = card;
    } else {
        const bg1 = getComputedStyle(firstClicked).backgroundImage;
        const bg2 = getComputedStyle(cardFront).backgroundImage;
        isProcessing = true; 
        if (bg1 === bg2) {
            moves++;
            const prevCard = firstClicked;
            const currentCard = cardFront;
            setTimeout(() => {
                prevCard.classList.add("excluded")
                currentCard.classList.add("excluded")
                points++;
                document.querySelector(".points").textContent = points.toString();
                document.querySelector(".moves").textContent = moves.toString();
            }, 1500);
            
        } else {
            moves++;
            setTimeout(() => {
                firstClickedCard.classList.add("hidden")
                card.classList.add("hidden")
                document.querySelector(".moves").textContent = moves.toString();
            },1500)
            
        }
        
        firstClicked = null;
    }
    // count++;
    // let classesSet = new Set();
    // if(!classesSet.has(card.classList) && count <=  2)
    // {
    //     classesSet.add(card.classList);
    // }els
    // }


}

function logScore(){
    document.querySelectorAll(".card_wrapper").forEach((card) => {
    card.classList.add("hide_cards")
    });
    setTimeout(() => {
         document.querySelectorAll(".card_wrapper").forEach((card) => {
            card.remove();
         });
         document.querySelector(".playground").classList.add("submit_pane")
    },2000);
   
}

logScoreButton.addEventListener("click", () => {
    document.querySelector(".submit_pane_container").style.opacity = "1"
    logScore();
});

function submitPane(){
    
} 
const shuffleButton = document.getElementById("shuffleButton");
const hideButton = document.getElementById("hideButton");
const logScoreButton = document.getElementById("logScore");
const submitButton = document.querySelector(".submit_button");
const topScoresDisplayButton = document.getElementById("topScoresDisplayButton");
let timerStarted = false;
let timerId = null;


shuffleImages();
document.querySelector(".submit_pane_container").style.opacity = "0"
 document.querySelector(".submit_pane_container").classList.add("transition-opacity");


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Please enter a valid username.");
        return;
    }
    const moves = document.querySelector(".moves").textContent.split(": ")[1];
    const time = document.querySelector(".time").textContent.split(": ")[1];
    
    saveScore(username, moves, time);
    document.querySelector(".submit_pane_container").style.opacity = "0";
    loadScores();
    window.location.reload();
});

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

    if(!timerStarted){
        timer();
        timerStarted = true;
    }
    
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
                document.querySelector(".points").textContent = `Score: ${points.toString()}`;
                document.querySelector(".moves").textContent = `Moves: ${moves.toString()}`;
                if(document.querySelectorAll(".excluded").length === 16){
                    clearInterval(timerId);
                    setTimeout(() => {
                        document.querySelector(".submit_pane_container").style.opacity = "1"
                        logScore();
                    }, 500);
                }
            }, 1500);
            
        } else {
            moves++;
            setTimeout(() => {
                firstClickedCard.classList.add("hidden")
                card.classList.add("hidden")
                document.querySelector(".moves").textContent = `Moves: ${moves.toString()}`;
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
    clearInterval(timerId);
    logScore();
});

const scores = [];
function timer(){
    let time = 0;
    timerId = setInterval(() => {
        time++;
        document.querySelector(".time").textContent = `Time: ${time}s`;
    },1000)
    const maxTime = time;
}

function saveScore(username, moves, time){
    const nickName = username.trim();
    const scoreData = {
        name: nickName,
        moves: moves,
        time: time
    };
    axios.post("http://localhost:3000/api/scores", scoreData)

}
function loadScores() {
    axios.get("http://localhost:3000/api/scores")
        .then(response => {
            const scores = response.data;
            const scoreList = document.getElementById("scoreList");
            scoreList.innerHTML = ""; // Clear previous scores
            scores.forEach(score => {
                const li = document.createElement("li");
                li.textContent = `${score.name} - Moves: ${score.moves}, Time: ${score.time}s`;
                scoreList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading scores:", error);
        });
}

let clickCount = 0;

function toggleScoreTable() {
    clickCount++;

    const playground = document.querySelector(".playground");
    const topScoreH1 = document.querySelector(".topScoreH1");
    const scoreList = document.querySelector("#scoreList");

    if (clickCount % 2 === 1) {
        document.querySelector(".submit_pane_container")?.remove();
        document.querySelectorAll(".card_wrapper").forEach((card) => {
            card.classList.add("hide_cards");
        });

        setTimeout(() => {
            document.querySelectorAll(".card_wrapper").forEach((card) => {
                card.remove();
            });
            playground.appendChild(topScoreH1);
            playground.appendChild(scoreList);
            playground.classList.add("topScoresTable");
        }, 2000);
    } else {
        window.location.reload();
    }
}


topScoresDisplayButton.addEventListener("click", () => {
    toggleScoreTable();
});




window.addEventListener("DOMContentLoaded", loadScores);
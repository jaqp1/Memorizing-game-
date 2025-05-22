const shuffleButton = document.getElementById("shuffleButton");
const hideButton = document.getElementById("hideButton");


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

document.querySelectorAll(".card_wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
        const card = wrapper.querySelector(".card");
        card.classList.toggle("hidden");
    });
});

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
            card.classList.toggle("hidden");
        }, index * 200); 
    });
    }
}

        let count = 0
        let points = 0
        let par = 0
        let firstClicked = null;
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click", () => {
                const cardFront = card.querySelector(".card_front")
                
                if (!firstClicked) {
                    firstClicked = cardFront;
                    cardFront.style.border = '2px solid black'; 
                } else {
                    const bg1 = getComputedStyle(firstClicked).backgroundImage;
                    const bg2 = getComputedStyle(cardFront).backgroundImage;

                    if (bg1 === bg2) {
                        points++;
                        document.querySelector(".points").textContent = points.toString();
                        firstClicked.style.opacity = "0.5";
                        cardFront.style.opacity = "0.5"
                    } else {
                        setTimeout(() => {
                            firstClicked.classList.add("hidden");
                        cardFront.classList.add("hidden");
                        },1000)
                        
                    }
                    firstClicked.style.border = '';
                    firstClicked = null;
                }
                // count++;
                // let classesSet = new Set();
                // if(!classesSet.has(card.classList) && count <=  2)
                // {
                //     classesSet.add(card.classList);
                // }else{

                // }


            })
        
        })

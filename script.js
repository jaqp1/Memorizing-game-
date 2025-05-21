const shuffleButton = document.getElementById("shuffleButton");


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


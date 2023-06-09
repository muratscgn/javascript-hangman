const word_element = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_element = document.getElementById("success-message");
const wrongLetters_element = document.getElementById("wrong-latters");
const items = document.querySelectorAll(".item");
const message_againLetter = document.getElementById("message");
const playAgainButton = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();


function getRandomWord() {
    const words = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_element.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </div >
        `).join("")}
    `;

    const w = word_element.innerText.replace(/\n/g, "");
    if (w === selectedWord) {
        popup.style.display = "flex";
        message_element.innerText = "Congratulations You Won";
    }
}

function updateWrongLetters() {
    wrongLetters_element.innerHTML = `
    ${wrongLetters.length > 0 ? "<h3>Wrong Letters</h3>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = "flex";
        message_element.innerText = "Sorry You Lost";
    }
}

function displayMessage() {
    message_againLetter.classList.add("show");

    setTimeout(function () {
        message_againLetter.classList.remove("show");
    }, 2000)
}

playAgainButton.addEventListener("click", function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

displayWord();
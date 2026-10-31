const cards = [
    {
        text: "Researcher manipulates an independent variable",
        category: "experiment"
    },
    {
        text: "Can investigate cause and effect",
        category: "experiment"
    },
    {
        text: "Often controls extraneous variables",
        category: "experiment"
    },
    {
        text: "Measures a relationship between two variables",
        category: "correlation"
    },
    {
        text: "Uses a correlation coefficient",
        category: "correlation"
    },
    {
        text: "No independent variable is manipulated",
        category: "correlation"
    },
    {
        text: "Uses questionnaires or interviews",
        category: "self-report"
    },
    {
        text: "Can include open and closed questions",
        category: "self-report"
    },
    {
        text: "Participants report information about themselves",
        category: "self-report"
    },
    {
        text: "Records observable behavior",
        category: "observation"
    },
    {
        text: "Can be overt or covert",
        category: "observation"
    },
    {
        text: "Can be participant or non-participant",
        category: "observation"
    }
];

const cardBank =
document.getElementById("cardBank");

const scoreDisplay =
document.getElementById("score");

const remainingDisplay =
document.getElementById("remaining");

const progressFill =
document.getElementById("progressFill");

const resetButton =
document.getElementById("resetButton");

const completionMessage =
document.getElementById("completionMessage");

const categories =
document.querySelectorAll(".category");

let score = 0;
let draggedCard = null;

function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j =
        Math.floor(
            Math.random() * (i + 1)
        );

        [copy[i], copy[j]] =
        [copy[j], copy[i]];
    }

    return copy;
}

function updateStatus() {
    scoreDisplay.textContent = score;
    remainingDisplay.textContent = cards.length - score;

    const percent =
    (score / cards.length) * 100;

    progressFill.style.width =
    percent + "%";

    if (score === cards.length) {
        completionMessage.classList.add("show");
    } else {
        completionMessage.classList.remove("show");
    }
}

function createCard(cardData, index) {
    const card =
    document.createElement("div");

    card.className = "card";
    card.textContent = cardData.text;
    card.draggable = true;
    card.dataset.category = cardData.category;
    card.dataset.id = index;

    card.addEventListener(
        "dragstart",
        function () {
            draggedCard = card;
            card.classList.add("dragging");
        }
    );

    card.addEventListener(
        "dragend",
        function () {
            card.classList.remove("dragging");
        }
    );

    return card;
}

function buildActivity() {
    cardBank.innerHTML = "";
    score = 0;
    updateStatus();

    categories.forEach(category => {
        const dropZone =
        category.querySelector(".drop-zone");

        dropZone.innerHTML = "";
    });

    const shuffledCards =
    shuffle(cards);

    shuffledCards.forEach((cardData, index) => {
        const card =
        createCard(cardData, index);

        cardBank.appendChild(card);
    });
}

categories.forEach(category => {
    const dropZone =
    category.querySelector(".drop-zone");

    category.addEventListener(
        "dragover",
        function (event) {
            event.preventDefault();
            category.classList.add("over");
        }
    );

    category.addEventListener(
        "dragleave",
        function () {
            category.classList.remove("over");
        }
    );

    category.addEventListener(
        "drop",
        function (event) {
            event.preventDefault();
            category.classList.remove("over");

            if (!draggedCard) {
                return;
            }

            const correctCategory =
            draggedCard.dataset.category;

            const destinationCategory =
            category.dataset.category;

            if (correctCategory === destinationCategory) {
                dropZone.appendChild(draggedCard);

                draggedCard.classList.add("correct");
                draggedCard.draggable = false;

                score++;
                updateStatus();
            } else {
                draggedCard.classList.add("incorrect");

                const wrongCard = draggedCard;

                setTimeout(function () {
                    wrongCard.classList.remove("incorrect");
                    cardBank.appendChild(wrongCard);
                }, 700);
            }

            draggedCard = null;
        }
    );
});

resetButton.addEventListener(
    "click",
    buildActivity
);

buildActivity();
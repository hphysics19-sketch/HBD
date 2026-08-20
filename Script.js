// =========================
// Birthday Surprise Website
// Part 1
// =========================

// Background Music
const bgMusic = document.getElementById("bgMusic");

function playMusic() {
    if (bgMusic) {
        bgMusic.play().catch(error => {
            console.log("Music could not start:", error);
        });
    }
}


// =========================
// Show only one screen
// =========================

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    const selectedScreen = document.getElementById(id);

    if (selectedScreen) {
        selectedScreen.classList.remove("hidden");
    }
}


// =========================
// Start Surprise
// =========================

function startSurprise() {

    const startBtn = document.getElementById("startBtn");

    if (!startBtn) {
        console.log("startBtn not found");
        return;
    }

    startBtn.addEventListener("click", () => {

        // Start music
        playMusic();

        // Go to letter screen
        showScreen("letter");

    });
}


// =========================
// Navigation
// =========================

function showGallery() {
    showScreen("gallery");
}

function showPuzzle() {
    showScreen("puzzle");
    createPuzzle();
}

function showCake() {
    showScreen("cake");
}

function showGift() {
    showScreen("gift");
}

function openGift() {

    const giftBox = document.querySelector(".gift-box");

    if (giftBox) {
        giftBox.innerHTML = "💖";
    }

    setTimeout(() => {
        showScreen("final");
    }, 1500);
}


// =========================
// Puzzle Game
// =========================

let tiles = [];
let firstLoad = true;

function createPuzzle() {

    const board = document.getElementById("puzzle-board");

    if (!board) {
        console.log("puzzle-board not found");
        return;
    }

    // Shuffle only once
    if (firstLoad) {

        tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];

        shuffle();

        firstLoad = false;
    }

    board.innerHTML = "";

    tiles.forEach(value => {

        const tile = document.createElement("div");

        tile.className = "tile";

        if (value === 0) {

            tile.classList.add("empty");

        } else {

            const row = Math.floor((value - 1) / 3);
            const col = (value - 1) % 3;

            tile.style.backgroundImage = "url('puzzle.jpg')";
            tile.style.backgroundSize = "300px 300px";

            tile.style.backgroundPosition =
                `-${col * 100}px -${row * 100}px`;

            tile.onclick = () => moveTile(value);
        }

        board.appendChild(tile);
    });
}


// =========================
// Shuffle Puzzle
// =========================

function shuffle() {

    for (let i = tiles.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}


// =========================
// Move Puzzle Tile
// =========================

function moveTile(value) {

    const empty = tiles.indexOf(0);

    const index = tiles.indexOf(value);

    const valid = [];

    if (index - 1 === empty && index % 3 !== 0) {
        valid.push(empty);
    }

    if (index + 1 === empty && empty % 3 !== 0) {
        valid.push(empty);
    }

    if (index - 3 === empty) {
        valid.push(empty);
    }

    if (index + 3 === empty) {
        valid.push(empty);
    }

    if (valid.length) {

        [tiles[index], tiles[empty]] =
            [tiles[empty], tiles[index]];

        createPuzzle();

        checkSolved();
    }
}


// =========================
// Check Puzzle
// =========================

function checkSolved() {

    const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];

    if (JSON.stringify(tiles) === JSON.stringify(solved)) {

        alert("🎉 Puzzle Solved!");

        const nextButton = document.getElementById("puzzleNext");

        if (nextButton) {
            nextButton.classList.remove("hidden");
        }
    }
}


// =========================
// Part 2
// Microphone + Effects
// =========================


// ---------- Microphone ----------

async function startMic() {

    const status = document.getElementById("status");
    const flame = document.getElementById("flame");
    const wish = document.getElementById("wish");

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        if (status) {
            status.innerHTML =
                "❌ Microphone is not supported on this device.";
        }

        return;
    }

    try {

        if (status) {
            status.innerHTML =
                "🎤 Listening... Blow towards the microphone!";
        }

        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audioContext = new AudioContext();

        const analyser =
            audioContext.createAnalyser();

        const microphone =
            audioContext.createMediaStreamSource(stream);

        microphone.connect(analyser);

        analyser.fftSize = 256;

        const dataArray =
            new Uint8Array(analyser.frequencyBinCount);


        function detectBlow() {

            analyser.getByteFrequencyData(dataArray);

            let volume =
                dataArray.reduce((a, b) => a + b) /
                dataArray.length;

            if (volume > 45) {

                if (flame) {
                    flame.style.display = "none";
                }

                if (status) {
                    status.innerHTML =
                        "🎉 Candles Blown! Make a wish!";
                }

                if (wish) {
                    wish.style.display = "block";
                }

                stream.getTracks().forEach(track => {
                    track.stop();
                });

                return;
            }

            requestAnimationFrame(detectBlow);
        }

        detectBlow();

    } catch (err) {

        console.log(err);

        if (status) {
            status.innerHTML =
                "❌ Microphone permission denied.";
        }
    }
}


// =========================
// Floating Hearts
// =========================

setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = "💜";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * window.innerWidth + "px";

    heart.style.bottom = "-40px";

    heart.style.fontSize =
        (18 + Math.random() * 20) + "px";

    heart.style.pointerEvents = "none";

    heart.style.transition =
        "all 5s linear";

    heart.style.zIndex = "999";

    document.body.appendChild(heart);


    setTimeout(() => {

        heart.style.bottom = "110%";

        heart.style.opacity = "0";

    }, 50);


    setTimeout(() => {

        heart.remove();

    }, 5200);

}, 700);


// =========================
// Fireworks
// =========================

setInterval(() => {

    const finalScreen =
        document.getElementById("final");

    if (finalScreen &&
        !finalScreen.classList.contains("hidden")) {

        const fire =
            document.createElement("div");

        fire.innerHTML =
            ["🎆", "✨", "🎇"]
            [Math.floor(Math.random() * 3)];

        fire.style.position = "fixed";

        fire.style.left =
            Math.random() * window.innerWidth + "px";

        fire.style.top =
            Math.random() * window.innerHeight + "px";

        fire.style.fontSize =
            (30 + Math.random() * 30) + "px";

        fire.style.pointerEvents = "none";

        fire.style.zIndex = "999";

        document.body.appendChild(fire);


        setTimeout(() => {

            fire.remove();

        }, 1000);
    }

}, 350);


// =========================
// Start JavaScript
// =========================

document.addEventListener("DOMContentLoaded", () => {

    startSurprise();

});

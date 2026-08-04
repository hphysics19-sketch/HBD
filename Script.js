/* ======================================
   Happy Birthday Shrestha 💜
   script.js - Part 1
====================================== */

// --------------------
// Welcome Button
// --------------------

const startBtn = document.getElementById("startBtn");

if(startBtn){

startBtn.onclick = function(){

document.getElementById("welcome").style.display="none";

document.getElementById("main").style.display="block";

}

}

// --------------------
// Countdown
// --------------------

const birthday = new Date("August 5, 2026 00:00:00").getTime();

function updateCountdown(){

const now = new Date().getTime();

const distance = birthday-now;

if(distance<0){

document.getElementById("countdown").innerHTML=
"🎉 It's Shrestha's Birthday!";

return;

}

let days=Math.floor(distance/(1000*60*60*24));

let hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

let minutes=Math.floor((distance%(1000*60*60))/60000);

let seconds=Math.floor((distance%(60000))/1000);

document.getElementById("countdown").innerHTML=

days+" Days "

+hours+" Hours "

+minutes+" Minutes "

+seconds+" Seconds";

}

setInterval(updateCountdown,1000);

// --------------------
// Photo Slideshow
// --------------------

const photos=[

"photos/photo1.jpg",

"photos/photo2.jpg",

"photos/photo3.jpg",

"photos/photo4.jpg",

"photos/photo5.jpg",

"photos/photo6.jpg"

];

let slide=0;

function changePhoto(){

slide++;

if(slide>=photos.length){

slide=0;

}

document.getElementById("slide").src=photos[slide];

}

setInterval(changePhoto,3000);

// --------------------
// Music
// --------------------

const music=document.getElementById("song");

const musicBtn=document.getElementById("musicBtn");

if(musicBtn){

musicBtn.onclick=function(){

music.style.display="block";

music.play();

}

}

// --------------------
// Quiz Variables
// --------------------

let quiz=[];

let current=0;

let marks=0;

// Quiz loads from quiz.json

fetch("quiz.json")

.then(r=>r.json())

.then(data=>{

quiz=data;

showQuestion();

});

// --------------------
// Show Question
// --------------------

function showQuestion(){

if(current>=quiz.length){

document.getElementById("question").innerHTML="Quiz Completed 💜";

document.getElementById("options").innerHTML="";

document.getElementById("score").innerHTML=

"Final Score : "+marks+"/"+quiz.length;

return;

}

document.getElementById("question").innerHTML=

quiz[current].question;

let html="";

quiz[current].options.forEach(option=>{

html+=`

<button onclick="checkAnswer('${option}')">

${option}

</button>

`;

});

document.getElementById("options").innerHTML=html;

}

// --------------------
// Check Answer
// --------------------

function checkAnswer(ans){

if(ans===quiz[current].answer){

marks++;

}

current++;

showQuestion();

}

// --------------------
// Next Question
// --------------------

function nextQuestion(){

current++;

showQuestion();

}
/* ======================================
   script.js - Part 2
====================================== */

// --------------------
// Emoji Game
// --------------------

let emojiData = [];
let currentEmoji = 0;

fetch("emoji.json")
.then(r => r.json())
.then(data => {
    emojiData = data;

    if(emojiData.length > 0){
        document.getElementById("emojiQuestion").innerHTML =
        emojiData[0].emoji;
    }
});

function checkEmoji(){

    const answer =
    document.getElementById("emojiAnswer")
    .value
    .trim()
    .toLowerCase();

    const correct =
    emojiData[currentEmoji].answer.toLowerCase();

    if(answer === correct){

        document.getElementById("emojiResult").innerHTML =
        "✅ Correct 💜";

    }else{

        document.getElementById("emojiResult").innerHTML =
        "❌ Correct Answer : " +
        emojiData[currentEmoji].answer;

    }

    currentEmoji++;

    if(currentEmoji >= emojiData.length){

        currentEmoji = 0;

    }

    document.getElementById("emojiQuestion").innerHTML =
    emojiData[currentEmoji].emoji;

    document.getElementById("emojiAnswer").value = "";

}

// --------------------
// Birthday Trivia
// --------------------

function correctTrivia(){

document.getElementById("triviaResult").innerHTML =
"🎉 Correct! Happy Birthday Shrestha 💜";

}

function wrongTrivia(){

document.getElementById("triviaResult").innerHTML =
"😊 Nice try! The correct answer is 5 August.";

}

// --------------------
// Puzzle
// --------------------

const puzzleImages = [

"photos/photo1.jpg",
"photos/photo2.jpg",
"photos/photo3.jpg",
"photos/photo4.jpg",
"photos/photo5.jpg",
"photos/photo6.jpg"

];

function shufflePuzzle(){

let random =
Math.floor(Math.random()*puzzleImages.length);

document.getElementById("puzzleImage").src =
puzzleImages[random];

}

// --------------------
// Fireworks
// --------------------

function showFireworks(){

document.getElementById("fireworksScreen").style.display =
"flex";

createConfetti();

}

function closeFireworks(){

document.getElementById("fireworksScreen").style.display =
"none";

}

// --------------------
// Confetti
// --------------------

function createConfetti(){

for(let i=0;i<120;i++){

let confetti =
document.createElement("div");

confetti.className = "confetti";

confetti.style.left =
Math.random()*100+"vw";

confetti.style.animationDuration =
(2+Math.random()*3)+"s";

confetti.style.background =
[
"#ffffff",
"#ffd6ff",
"#e0aaff",
"#c77dff",
"#9d4edd"
][Math.floor(Math.random()*5)];

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.remove();

},5000);

}

}

// --------------------
// Floating Hearts
// --------------------

setInterval(()=>{

let heart =
document.createElement("div");

heart.innerHTML="💜";

heart.className="heart";

heart.style.left=
Math.random()*100+"vw";

heart.style.fontSize=
(18+Math.random()*20)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},900);
function blowCandles(){

document.getElementById("flame1").style.display="none";

document.getElementById("flame2").style.display="none";

document.getElementById("flame3").style.display="none";

document.getElementById("birthdayMessage").style.display="block";

createConfetti();

}
const icons=["💜","⭐","✨","🌸","🦋"];

setInterval(()=>{

let item=document.createElement("div");

item.className="floating";

item.innerHTML=

icons[Math.floor(Math.random()*icons.length)];

item.style.left=Math.random()*100+"vw";

item.style.fontSize=(20+Math.random()*25)+"px";

item.style.animationDuration=(4+Math.random()*3)+"s";

document.body.appendChild(item);

setTimeout(()=>{

item.remove();

},7000);

},500);
function showEnding(){

document.getElementById("ending").style.display="block";

createConfetti();

}
setTimeout(showEnding,5000);

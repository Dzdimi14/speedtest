const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const avgElement = document.getElementById("avg");
const wpmElement = document.getElementById("wpm");
started = false
let scores = []
numwords = 0
quoteInputElement.addEventListener("input", () => {
    
    if (!started) {
        startTimer()
        started = true
    }
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    time = getTimerTime()
    wpms = numwords / (time/60)
    scores.push(wpms)
    sum = sum = scores.reduce((pv, cv) => pv + cv, 0);
    avgs = sum / scores.length
    wpm.innerText = ("WPM: " + wpms.toFixed(2))
    console.log(avg)
    avg.innerText = ("AVG: " + avgs.toFixed(2))
    renderNewQuote()
  }
  
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  console.log(quote);
  quoteDisplayElement.innerHTML = "";
  numwords = quote.split(' ').length
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");

    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  
}

function startTimer() {
  
  startTime = new Date();
  setInterval(() => {
    
  }, 1000);
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();

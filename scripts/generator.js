const resultsDiv = document.getElementById("results");
const allWordsText = document.getElementById("allWordsText");
const resultsFound = document.getElementById("resultsFound");

let globalWords = [];


function addResult(word) {
    console.log("RESULT");
    let div = document.createElement("div");
    div.className = "result";

    let text = document.createElement("p");
    text.className = "resultWord";
    text.textContent = word.word;

    let frequency = document.createElement("p");
    frequency.className = "resultFrequency";
    frequency.textContent = "frequency: " + word.frequency.substring(2);

    let description = document.createElement("p");
    description.className = "resultDescription";
    let definitions = "";
    if(word.definitions !== undefined) {
        for (let i = 0; i < word.definitions.length; i++) {
            definitions = definitions + "(" + word.definitions[i].replace(/\s/, ".) ") + "\r\n\r\n";
        }
    }
    description.textContent = definitions;

    let audio = document.createElement("button");
    audio.className = "resultAudio";
    audio.onclick = function() {textToSpeech(word.word)};
    audio.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-volume-up\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z\"/>\n" +
        "  <path d=\"M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z\"/>\n" +
        "  <path d=\"M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z\"/>\n" +
        "</svg>";

    div.appendChild(text);
    text.appendChild(audio);
    div.appendChild(frequency);
    div.appendChild(description);

    resultsDiv.appendChild(div);
}

function addWord(word) {
    allWordsText.textContent = allWordsText.textContent + word + "\r\n";
}

function checkWords(i) {
    addResult(globalWords[i]);
    resultsFound.textContent = Number(resultsFound.textContent) + 1 + "";
    if(i < globalWords.length-1)
        setTimeout(checkWords.bind(null, i + 1), 50);
    else
        document.getElementById("generateButton").disabled = false;
}

async function addResultsForKeyword(keywordsRaw) {
    //Split the raw input into words. The words should be separated by commas
    const keywords = keywordsRaw.split(/[\s,]+/);
    console.log(keywords);

    let words = []
    let topics

    // Generate related words both with and without the other words set as topics
    for(let i = 0; i < keywords.length; i++) {
        topics = keywords.slice()
        topics.splice(i, 1)
        await getRelatedWords(
            keywords[i],
            topics,
            undefined, undefined,
            300, "f:0.00", 4
        ).then(result => {
            words = words.concat(result);
        })
    }
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(
            keywords[i],
            null,
            undefined, undefined,
            300, "f:0.00", 4
        ).then(result => {
            words = words.concat(result);
        });
    }

    console.log("ALL WORDS: ")
    console.log(words);
    const seen = {};
    words = words.filter(function(item) {
        let k = item.word;
        if(seen.hasOwnProperty(k)) {
            seen[k]["seen"]++;
            return false;
        }
        else {
            seen[k] = item;
            item["seen"] = 1;
            return true;
        }
    })
    words = words.sort(function(a, b){
        let seenDifference = b.seen - a.seen;
        if(seenDifference === 0)
            return a.word.length - b.word.length;
        return seenDifference;
    });
    console.log("REMAINING: ")
    console.log(words);
    document.getElementById("resultsFoundText").textContent = "Words found: ";
    resultsFound.textContent = 0 + "";
    globalWords = words;
    checkWords(0);
}

//addResultsForKeyword("darkness");
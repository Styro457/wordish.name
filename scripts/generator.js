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

    let description = document.createElement("p");
    description.className = "resultDescription";
    let definitions = "";
    if(word.definitions !== undefined) {
        for (let i = 0; i < word.definitions.length; i++) {
            definitions = definitions + "(" + word.definitions[i].replace(/\s/, ".) ") + "\r\n\r\n";
        }
    }
    description.textContent = definitions;
    div.appendChild(text);
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
    const keywords = keywordsRaw.split(/[\s,]+/);;
    console.log(keywords);
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(
            keywords[i],
            keywords.slice().splice(i, 1),
            undefined, undefined,
            300, "f:0.00", 4).then(words => {
            globalWords = globalWords.concat(words);
        });
    }
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(
            keywords[i],
            null,
            undefined, undefined,
            300, "f:0.00", 4).then(words => {
            globalWords = globalWords.concat(words);
        });
    }
    console.log(globalWords);
    const seen = {};
    globalWords = globalWords.filter(function(item) {
        let k = item.word;
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
    globalWords = globalWords.sort(function(a, b){
        return a.word.length - b.word.length;
    });
    console.log(globalWords);
    document.getElementById("resultsFoundText").textContent = "Words found: ";
    resultsFound.textContent = 0 + "";
    checkWords(0);
}

//addResultsForKeyword("darkness");
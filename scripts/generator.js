const resultsDiv = document.getElementById("results");
const allWordsText = document.getElementById("allWordsText");

let globalWords = [];


function addResult(word) {
    console.log("RESULT");
    let div = document.createElement("div");
    div.className = "result";

    let text = document.createElement("p");
    text.className = "resultText";
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
    setTimeout(checkWords.bind(null, i + 1), 50);
}

async function addResultsForKeyword(keywordsRaw) {
    const keywords = keywordsRaw.split(/[\s,]+/);;
    console.log(keywords);
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(
            keywords[i],
            keywords.slice().splice(i, 1),
            undefined, undefined,
            300, "f:0.0", 4).then(words => {
            globalWords = globalWords.concat(words);
        });
    }
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(
            keywords[i],
            null,
            undefined, undefined,
            300, "f:0.0", 4).then(words => {
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
    checkWords(0);
}

//addResultsForKeyword("darkness");
const resultsDiv = document.getElementById("results");

function addResult(word, frequency) {
    console.log("RESULT");
    let div = document.createElement("div");
    div.className = "result";

    let text = document.createElement("p");
    text.className = "resultText";
    text.textContent = word + " : " + frequency;
    div.appendChild(text);

    resultsDiv.appendChild(div);
}

async function addResultsForKeyword(keyword) {
    getRelatedWords(keyword, undefined, undefined, 300).then(words => {
        console.log(words);
        for(let i = 1; i < words.length; i++) {
            if(words[i].includes(' '))
                continue;
            (function (i) {
                setTimeout(function () {
                    console.log("WORD: " + words[i]);
                    getAverageSearches(words[i]).then(frequency => {
                        console.log(words[i] + " : " + frequency);
                        if(frequency < 0.0000002) {
                            addResult(words[i], frequency);
                        }
                    });
                }, 800 * i);
            })(i);
        }
    });
}

//addResultsForKeyword("darkness");
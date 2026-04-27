const checkedWordsCount = document.getElementById("checkedWordsCount");
const screenWords = document.getElementById("screenWords");
const machineScreenOn = document.getElementById("machineScreenOn");

function updateCheckedWordsCount(amount) {
    checkedWordsCount.textContent = String(Number(checkedWordsCount.textContent) + amount);
}

async function addScreenWords(words) {
    const isAtBottom = screenWords.scrollTop + screenWords.clientHeight >= screenWords.scrollHeight - 1;
    for(let i = 0; i < words.length; i++) {
        screenWords.textContent += words[i].word + "\r\n";
        if(isAtBottom)
            screenWords.scrollTop = screenWords.scrollHeight;
    }
}

function getUniqueWords(words) {
    const seen = {};
    return words.filter(function(item) {
        let k = item.word;
        if(seen.hasOwnProperty(k)) {
            seen[k]["seen"]++;
            for (let i = 0; i < item["related"].length; i++) {
                if (!seen[k]["related"].includes(item["related"][i]))
                    seen[k]["related"].push(item["related"][i]);
            }
            return false;
        }
        else {
            item["seen"] = 1;
            seen[k] = item;
            return true;
        }
    })
}

function getWorldValue(a) {
    return a.seen - (Math.max(a.word.length, 5) * 0.2) - (a.frequency * 0.1);
}

function compareWords(a, b) {
    let seenDifference = getWorldValue(b) - getWorldValue(a);
    if(seenDifference === 0)
        return a.word.length - b.word.length;
    return seenDifference;
}

async function generateWords(keywordsRaw) {
    //Split the raw input into words. The words should be separated by commas
    const keywords = keywordsRaw.split(/[\s,]+/);

    let words = []

    checkedWordsCount.textContent = undefined;
    screenWords.textContent = undefined;
    resultsDiv.style = null;
    machineScreenOn.style.opacity = "100%";

    await getRelatedWords(keywords.join(", "), "ml", null,
        undefined, undefined, 300, "f:0.0", 4)
        .then(result => words = handleWordResults(result, words, keywords));

    // Generate words using different combinations of keywords
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(keywords[i], "ml", null,
            undefined, undefined, 300, "f:0.0", 4)
            .then(result => words = handleWordResults(result, words, [keywords[i]]));
        for(let j = 0; j < keywords.length; j++) {
            if(i === j)
                continue;
            await getRelatedWords(keywords[i], "ml", [keywords[j]],
                undefined, undefined, 300, "f:0.0", 4)
                .then(result => words = handleWordResults(result, words, [keywords[i], keywords[j]]));
            for(let k = 0; k < keywords.length; k++) {
                if(j === k || i === k)
                    continue;
                await getRelatedWords(keywords[i] + ", " + keywords[j], "ml", [keywords[k]],
                    undefined, undefined, 300, "f:0.0", 4)
                    .then(result => words = handleWordResults(result, words, [keywords[i], keywords[j], keywords[k]]));
            }
        }
    }

    return getUniqueWords(words).sort(compareWords);
}

function handleWordResults(result, words, relatedWorlds) {
    for(let word of result)
        word["related"] = relatedWorlds;
    updateCheckedWordsCount(result.length);
    addScreenWords(result);
    return result;
}
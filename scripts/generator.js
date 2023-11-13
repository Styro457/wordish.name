const checkedWordsCount = document.getElementById("checkedWordsCount");

function updateCheckedWordsCount(amount) {
    checkedWordsCount.textContent = String(Number(checkedWordsCount.textContent) + amount);
}

async function generateWords(keywordsRaw) {
    //Split the raw input into words. The words should be separated by commas
    const keywords = keywordsRaw.split(/[\s,]+/);
    console.log(keywords);

    let words = []
    let topics

    // Generate words using different combinations of keywords
    for(let i = 0; i < keywords.length; i++) {
        await getRelatedWords(keywords[i], "ml", null, undefined, undefined, 300, "f:0.00", 4).then(result => {
            words = words.concat(result);
            updateCheckedWordsCount(result.length);
        })
        for(let j = 0; j < keywords.length; j++) {
            if(i === j)
                continue;
            await getRelatedWords(keywords[i] + ", " + keywords[j], "ml", [keywords[j]], undefined, undefined, 300, "f:0.00", 4).then(result => {
                words = words.concat(result);
                updateCheckedWordsCount(result.length);
            })
            for(let k = 0; k < keywords.length; k++) {
                if(j === k || i === k)
                    continue;
                await getRelatedWords(keywords[i] + ", " + keywords[j] + ", " + keywords[k], "ml", [keywords[j]], undefined, undefined, 300, "f:0.00", 4).then(result => {
                    words = words.concat(result);
                    updateCheckedWordsCount(result.length);
                })
            }
        }
    }

    console.log("Generated words: ")
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
    console.log("Filtered words: ")
    console.log(words);
    return words;
}
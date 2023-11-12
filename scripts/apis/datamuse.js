function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const wordSearchTypes = ["ml", "rel_jja", "rel_jjb", "rel_syn", "rel_trg", "rel_spc", "rel_gen", "rel_com", "rel_par"]


function getRelatedWords(word, searchType, topics, firstLetter, lastLetter, limit, frequencyLimit, minLength) {
    return new Promise((resolve) => {
        let url = "https://api.datamuse.com/words?" + searchType + "=" + word + "&max=" + limit + "&md=df";
        console.log("URL: " + url);
        //Add topics to the api input if they are specified
        if(topics !== null && topics.length > 0) {
            let topicsString = topics[0];
            for (let i = 1; i < Math.max(topics.length, 5); i++) {
                topicsString = topicsString + "," + topics[i];
            }
            url = url + "&topics=" + topicsString;
        }

        //Get the api response
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            const words = []
            let frequency, word;
            for(let i in data) {
                frequency = data[i]["tags"][data[i]["tags"].length-1]
                word = data[i]["word"];
                //addWord(word);
                if(frequency.startsWith(frequencyLimit) && !word.includes(" ") && word.length >= minLength) {
                    words.push(
                        {
                            word: word,
                            definitions: data[i]["defs"],
                            frequency: frequency
                        });
                }
            }
            resolve(words)
        })
    })
}

async function getAllRelatedWords(word, topics, firstLetter, lastLetter, limit, frequencyLimit, minLength) {
    let words = [];
    for (let searchType in wordSearchTypes) {
        await getRelatedWords(word, wordSearchTypes[searchType], null, firstLetter, lastLetter, limit, frequencyLimit, minLength).then(result => {
            console.log(result);
            words = words.concat(result);
        });
        await delay(1);
    }
    console.log("WORDS: " + words);
    return words;
}

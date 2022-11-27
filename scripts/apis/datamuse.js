function getRelatedWords(word, firstLetter, lastLetter, limit) {
    return new Promise((resolve) => {
        fetch("https://api.datamuse.com/words?ml=" + word + "&max=" + limit).then(response => {
            return response.json()
        }).then(data => {
            const words = []
            for(let i in data) {
                words.push(data[i]["word"])
            }
            resolve(words)
        })
    })
}
function getAverageSearches(word) {
    return new Promise((resolve) => {
        fetch("https://google-trends-average.herokuapp.com/average-word-search/" + word).then(response => {
            return response.json()
        }).then(data => {
            resolve(data);
        })
    })
}
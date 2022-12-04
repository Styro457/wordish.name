const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

function getAverageSearches(word) {
    return new Promise((resolve) => {
        try {
            fetch("https://api.allorigins.win/get?url=" + "https://books.google.com/ngrams/json?content=" + word + "&year_start=1990&year_end=2019&corpus=26&smoothing=3").then(response => {
                return response.json()
            }).then(data => {
                let values;
                try {
                    values = JSON.parse(data["contents"])[0]["timeseries"];
                } catch(e) {
                    console.log(e);
                    console.log("ERROR RESPONSE: ");
                    console.log(data);
                    resolve(-1);
                }
                let average = 0;
                for (let i = 1; i <= 51; i += 5) {
                    average += values[values.length - i];
                }
                average /= 10;
                resolve(average);
            })
        } catch(e) {
            resolve(0);
        }
    })
}
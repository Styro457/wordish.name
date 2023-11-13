const emptyResults = resultsDiv.innerHTML;

function onFormSubmit(word, button) {
    resultsDiv.innerHTML = emptyResults;
    globalWords = [];
    const createResults = async () => {
        let words = await generateWords(word.toLowerCase());
        displayResults(words)
    }
    createResults().then(r => {});
    button.disabled = true;
}
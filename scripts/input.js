const emptyResults = resultsDiv.innerHTML;

function onFormSubmit(word, button) {
    resultsDiv.innerHTML = emptyResults;
    const createResults = async () => {
        let words = await generateWords(word.toLowerCase());
        displayResults(words)
    }
    createResults().then(() => {});
    button.disabled = true;
}
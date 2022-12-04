function onFormSubmit(word, button) {
    allWordsText.innerHTML = "";
    resultsDiv.innerHTML = "";
    globalWords = [];
    const createResults = async () => {
        await addResultsForKeyword(word);
    }
    createResults().then(r => console.log("DONE"));
    button.disabled = true;
}
function onFormSubmit(word, button) {
    allWordsText.innerHTML = "";
    resultsDiv.innerHTML = "";
    globalWords = [];
    const createResults = async () => {
        await addResultsForKeyword(word.toLowerCase());
    }
    createResults().then(r => {});
    button.disabled = true;
}
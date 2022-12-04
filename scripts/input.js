function onFormSubmit(word, button) {
    allWordsText.innerHTML = "";
    resultsDiv.innerHTML = "";
    globalWords = [];
    const createResults = async () => {
        await addResultsForKeyword(word);
    }
    createResults().then(r => {});
    button.disabled = true;
}
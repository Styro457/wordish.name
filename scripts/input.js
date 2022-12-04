function onFormSubmit(word, button) {
    allWordsText.innerHTML = "";
    resultsDiv.innerHTML = "";
    globalWords = [];
    const createResults = async () => {
        const result = await addResultsForKeyword(word);
    }
    createResults().then(r => console.log("DONE"));
    button.disabled = true;
}
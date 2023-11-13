function onFormSubmit(word, button) {
    allWordsText.innerHTML = "";
    resultsDiv.innerHTML = "";
    globalWords = [];
    const createResults = async () => {
        let words = await generateWords(word.toLowerCase());
        displayResults(words)
    }
    createResults().then(r => {});
    button.disabled = true;
}
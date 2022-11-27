function onFormSubmit(word) {
    const createResults = async () => {
        const result = await addResultsForKeyword(word);
    }
    createResults().then(r => console.log("DONE"));
}
export async function fetchContextText(currentPage: number) {
    // fetch the other pages here
    return {
        prevPageText: `Text of page ${currentPage - 1}`,
        nextPageText: `Text of page ${currentPage + 1}`
    };
}

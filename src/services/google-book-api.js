const API_KEY = "AIzaSyD78ZjX5C5By3xzU4xjyfJanOA4tiFZaeQ";

// searches with the Google-Book-API for the
// given query and calls the callBack method
export function searchBooks (query, callBack) {

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`)
    .then(e => e.json())
    .then(callBack);

}
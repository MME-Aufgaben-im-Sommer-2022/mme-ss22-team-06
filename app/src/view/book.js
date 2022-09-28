import {searchBooks} from "../services/google-book-api.js";

// Creates, appends and fills a book template
// Returns the book template element for further use

export function getBookTemplate(bookItem) {

    let publishDate = bookItem.publishedDate?.split("-") || [],
        bookEl;
        
    publishDate.reverse();

    const resultEl = document.createElement("li"),
          template = document.getElementById("book-entry-template");

    resultEl.append(document.importNode(template.content, true));
    bookEl = resultEl.lastElementChild;

    bookEl.querySelector(".title").innerText = bookItem.title;
    bookEl.querySelector(".author").innerText = bookItem.authors?.join(", ") || "";
    bookEl.querySelector(".publish-date").innerText = publishDate.join(".");

    if (bookItem.imageLinks) {
        bookEl.querySelector("img").src = bookItem.imageLinks.smallThumbnail;
    }

    return resultEl;

}

// modifyFunction: searchBooksModal can be called by multiple files
// with different purposes (e.g. my-book: add button, wishlist: heart button)

export function searchBooksModal(inputEl, modifyFunction = null) {

    const query = inputEl.value;

    searchBooks(query, (result) => {

        if (inputEl.value !== query) {
            return;
        }

        const resultsEl = document.getElementById("book-search-results");
        resultsEl.innerHTML = "";

        result.items?.forEach(bookItem => {

            const isbn = bookItem.volumeInfo.industryIdentifiers[0].identifier,
                    bookEl = getBookTemplate(bookItem.volumeInfo);

            resultsEl.append(bookEl);

            if (modifyFunction) {
                modifyFunction(bookEl, isbn);
            }

        });

    });

}
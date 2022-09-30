import {searchBooks} from "../services/google-book-api.js";
import {loadMyBookList, loadTradedList} from "../services/my-books.js";
import {getBookTemplate} from "../view/book.js";

export function myBooksLoadUserData () {

    loadTradedList().then(e => {

        const ownedListEl = document.getElementById("traded-book-list");
        ownedListEl.innerHTML = "";

        e.documents.forEach(book => {

            searchBooks("isbn:"+book.isbn, (result) => {

                let bookItem = result.items[0].volumeInfo;
                const bookEl = getBookTemplate(bookItem);
                ownedListEl.append(bookEl);
            });

        });

    });

    loadMyBookList().then(e => {

        const ownedListEl = document.getElementById("owned-book-list");
        ownedListEl.innerHTML = "";

        e.documents.forEach(book => {

            searchBooks("isbn:"+book.isbn, (result) => {

                let bookItem = result.items[0].volumeInfo;
                const bookEl = getBookTemplate(bookItem);
                ownedListEl.append(bookEl);
                bookEl.querySelector(".actions").innerHTML =
                    `<button class='btn' onclick='removeBookFromMyBookListHandler("${book.$id}", "${book.isbn}")'><i class='fa fa-minus' aria-hidden='true'></i></button>` + 
                    `<button title="Buch getauscht" class='btn' onclick='changeBookStateToTradedHandler("${book.$id}", "${book.isbn}")'><i class='fa fa-exchange' aria-hidden='true'></i></button>`;
            });

        });

    });
    
}
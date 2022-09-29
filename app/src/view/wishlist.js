import {searchBooks} from "../services/google-book-api.js";
import {loadWishlist} from "../services/wishlist.js";
import {getBookTemplate} from "../view/book.js";

export function wishlistLoadUserData () {

    loadWishlist().then(e => {

        const ownedListEl = document.getElementById("wishlist-list");
        ownedListEl.innerHTML = "";

        e.documents.forEach(book => {

            searchBooks("isbn:"+book.isbn, (result) => {

                let bookItem = result.items[0].volumeInfo;
                const bookEl = getBookTemplate(bookItem);
                ownedListEl.append(bookEl);
                bookEl.querySelector(".actions").innerHTML =
                    `<button class='btn' onclick='removeBookFromWishlistHandler("${book.$id}")'><i class='fa fa-heart' aria-hidden='true'></i></button>`;

            });

        });

    });
    
}
import {searchBooks} from "../services/google-book-api.js";
import {loadFeedList} from "../services/feed.js";
import {getBookTemplate} from "../view/book.js";
import {loadUsersByISBN} from "../services/users.js";
import {database, DB_ID_USERS} from "../appwrite.js";
import {getUserTemplate} from "../view/user.js";

function openModalMoreInformation (isbn, bookTitle) {

    document.getElementById("book-modal").classList.add("open");    

    loadUsersByISBN(isbn).then(e => {

        let userIDs = e.documents.map(element => {
            return element.user_id;
        });

         database.listDocuments(DB_ID_USERS, [
            Appwrite.Query.equal("$id", [userIDs]), // eslint-disable-line
        ]).then(users => {

            const userListEl = document.getElementById("user-entry-list");
            userListEl.innerHTML = "";

            users.documents.forEach((user =>{
                if(user.$id === window.user.userData.$id) {
                    return;
                }

                let userEl = getUserTemplate(user);
                userListEl.append(userEl);
                userEl.querySelector(".actions").innerHTML =
                    `<button class='btn' onclick='sendMessageToUser("${user.$id}", "${bookTitle.replaceAll("'", " ")}")'><i class='fa fa-envelope' aria-hidden='true'></i></button>`;

                userEl.querySelector(".actions").innerHTML +=
                    `<button class='btn' onclick='window.openUserModal("${user.$id}")'><i class='fa fa-info' aria-hidden='true'></i></button>`;
                
            }));

        });
    });

}

export function loadFeedData (orderBy, orderType) {

    loadFeedList(orderBy, orderType).then(e => {

        const userlListEl = document.getElementById("book-feed-list");
        userlListEl.innerHTML = "";

        e.documents.forEach(entry => {

            // searchBooks ist async, um die richtige Reihenfolge 
            // beizubehalten, wird zunächst ein Platzhalter eingefügt.

            const placeholder = document.createElement("li");
            userlListEl.append(placeholder);

            searchBooks("isbn:"+entry.$id, (result) => {

                let bookItem = result.items[0].volumeInfo;
                const isbn = bookItem.industryIdentifiers[0].identifier,
                      bookEl = getBookTemplate(bookItem);

                placeholder.after(bookEl);
                placeholder.remove();
                bookEl.querySelector(".actions").innerHTML =
                    `<button class='btn' onclick='addBookToMyWishlist("${isbn}")'><i class='fa fa-heart-o' aria-hidden='true'></i></button>`;

                bookEl.addEventListener("click", event => {
                    if (event.target.tagName === "I" || event.target.tagName === "BUTTON") {
                        return;
                    }
                    openModalMoreInformation(isbn, bookItem.title);
                });

            });

        });

    });
    
}
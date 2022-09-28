import {database, DB_ID_WISHLIST} from "../appwrite.js";

export function loadWishlist () {
    return database.listDocuments(DB_ID_WISHLIST, [
        Appwrite.Query.equal("user_id", [window.user.userData.$id]),  // eslint-disable-line
    ]);
}

export function addBookToMyWishlist(isbn) {
    database.createDocument(DB_ID_WISHLIST, "unique()", {
        user_id: window.user.userData.$id, isbn: String(isbn),
    }, ["role:member"])
    .then(() => {
        alert("Buch wurde hinzugefügt.");
    }, () => {
        alert("Es ist ein Fehler aufgetreten.");
    });
}

export function removeBookFromWishlist(book_id) {

    return database.deleteDocument(DB_ID_WISHLIST, book_id);

}
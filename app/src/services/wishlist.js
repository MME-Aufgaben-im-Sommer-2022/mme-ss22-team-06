/* eslint-disable no-alert */
import {database, DB_ID_WISHLIST} from "../appwrite.js";

export function loadWishlist (userID = window.user.userData.$id) {
    return database.listDocuments(DB_ID_WISHLIST, [
        Appwrite.Query.equal("user_id", [userID]),  // eslint-disable-line
    ]);
}

export function addBookToMyWishlist(isbn) {
    database.createDocument(DB_ID_WISHLIST, "unique()", {
        // eslint-disable-next-line camelcase
        user_id: window.user.userData.$id, isbn: String(isbn),
    }, ["role:member"])
    .then(() => {
        alert("Buch wurde hinzugefügt.");
    }, () => {
        alert("Es ist ein Fehler aufgetreten.");
    });
}

export function removeBookFromWishlist(bookId) {

    return database.deleteDocument(DB_ID_WISHLIST, bookId);

}
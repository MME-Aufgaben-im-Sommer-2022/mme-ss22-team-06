import { database, DB_ID_STATISTICS, DB_ID_BOOKS } from "../appwrite.js";

export function addBookToMyBookList (isbn) {

    // add to statistics
    database.getDocument(DB_ID_STATISTICS, isbn)
    .then((entry) => {
        // count available up
        database.updateDocument(DB_ID_STATISTICS, isbn, {
            available: entry.available+1,
        });
    }, () => {
        // book not exists
        database.createDocument(DB_ID_STATISTICS, isbn, {
            available: 1,
            traded: 0,
        });
    });

    return database.createDocument(DB_ID_BOOKS, "unique()", {
        // eslint-disable-next-line camelcase
        user_id: window.user.userData.$id, isbn: String(isbn), book_state: "available",
    }, ["role:member"] );

}

export function changeBookStateToTraded (bookId, isbn) {

    // remove from statistics
    database.getDocument(DB_ID_STATISTICS, isbn)
    .then((entry) => {
        // count available down
        database.updateDocument(DB_ID_STATISTICS, isbn, {
            available: entry.available-1,
            traded: entry.traded+1,
        });
    });

    return database.updateDocument(DB_ID_BOOKS, bookId, {
        // eslint-disable-next-line camelcase
        book_state: "traded",
    });

}

export function removeBookFromMyBookList (bookId, isbn) {

    // remove from statistics
    database.getDocument(DB_ID_STATISTICS, isbn)
    .then((entry) => {
        // count available down
        database.updateDocument(DB_ID_STATISTICS, isbn, {
            available: entry.available-1,
        });
    });

    return database.deleteDocument(DB_ID_BOOKS, bookId);

}

export function loadTradedList (userID = window.user.userData.$id) {

    return database.listDocuments(DB_ID_BOOKS, [
        Appwrite.Query.equal("user_id", [userID]),  // eslint-disable-line
        Appwrite.Query.equal("book_state", ["traded"]),  // eslint-disable-line
    ]);

}

export function loadMyBookList (userID = window.user.userData.$id) {

    return database.listDocuments(DB_ID_BOOKS, [
        Appwrite.Query.equal("user_id", [userID]),  // eslint-disable-line
        Appwrite.Query.equal("book_state", ["available"]),  // eslint-disable-line
    ]);

}

export function deleteMyBookList (callBack) {
    database.listDocuments(DB_ID_BOOKS, [
        Appwrite.Query.equal("user_id", [window.user.userData.$id]),  // eslint-disable-line
    ]).then(async (res) =>{
        for (const book of res.documents) {
            await removeBookFromMyBookList(book.$id, book.isbn);
        }
        callBack();
    });
}
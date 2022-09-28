import { database } from "../appwrite.js";

export function addBookToMyBookList (isbn) {

    // add to statistics
    database.getDocument("632701f4118aab49ac92", isbn)
    .then((entry) => {
        // count available up
        database.updateDocument("632701f4118aab49ac92", isbn, {
            available: entry.available+1,
        });
    }, () => {
        // book not exists
        database.createDocument("632701f4118aab49ac92", isbn, {
            available: 1,
            traded: 0,
        });
    });

    return database.createDocument("632636e3e35316b100d2", "unique()", {
        user_id: window.user.userData.$id, isbn: String(isbn), book_state: "available",
    }, ["role:member"] );

}

export function removeBookFromMyBookList (book_id, isbn) {

    // remove from statistics
    database.getDocument("632701f4118aab49ac92", isbn)
    .then((entry) => {
        // count available down
        database.updateDocument("632701f4118aab49ac92", isbn, {
            available: entry.available-1,
        });
    });

    return database.deleteDocument("632636e3e35316b100d2", book_id);

}


export function loadMyBookList () {

    return database.listDocuments("632636e3e35316b100d2", [
        Appwrite.Query.equal("user_id", [window.user.userData.$id]),  // eslint-disable-line
        Appwrite.Query.equal("book_state", ["available"]),  // eslint-disable-line
    ]);

}

export function deleteMyBookList (callBack) {
    database.listDocuments("632636e3e35316b100d2", [
        Appwrite.Query.equal("user_id", [window.user.userData.$id]),  // eslint-disable-line
    ]).then(async (res) =>{
        for (const book of res.documents) {
            await removeBookFromMyBookList(book.$id, book.isbn);
        }
        callBack();
    });
}
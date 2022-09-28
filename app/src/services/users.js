import { database } from "../appwrite.js";

export function loadUsersByISBN(isbn) {
    return database.listDocuments("632636e3e35316b100d2", [
        Appwrite.Query.equal("isbn", [isbn]), // eslint-disable-line  
    ]);
}
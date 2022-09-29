import { database, storage, STORAGE_ID_AVATARS, DB_ID_USERS, DB_ID_BOOKS } from "../appwrite.js";

export function loadUsersByISBN(isbn) {
    return database.listDocuments(DB_ID_BOOKS, [
        Appwrite.Query.equal("isbn", [isbn]), // eslint-disable-line  
    ]);
}

export function getProfilePic(userID){
    return storage.getFileDownload(STORAGE_ID_AVATARS, userID);
}

export function getUserByID (userID) {
    return database.getDocument(DB_ID_USERS, userID);
}
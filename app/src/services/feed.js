import { database } from "../appwrite.js";

export function loadFeedList () {

    const LIMIT = 25;

    // listDocuments(collectionId, queries, limit, offset, cursor, cursorDirection, orderAttributes, orderTypes)
    return database.listDocuments("632701f4118aab49ac92", [
        Appwrite.Query.greater("available", 0), // eslint-disable-line
    ], LIMIT, 0, undefined, undefined, ['traded', "available"], ['ASC']);

}
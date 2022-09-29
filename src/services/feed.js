import { database, DB_ID_STATISTICS } from "../appwrite.js";

export function loadFeedList (orderBy, orderType = "ASC") {

    const LIMIT = 25;
    let orderAttributes = [];

    if (orderBy === "trend") {
        orderAttributes = ["traded", "available"];
    }

    if (orderBy === "createdAt") {
        orderAttributes = ["$createdAt"];
    }

    // listDocuments(collectionId, queries, limit, offset, cursor, cursorDirection, orderAttributes, orderTypes)
    return database.listDocuments(DB_ID_STATISTICS, [
        Appwrite.Query.greater("available", 0), // eslint-disable-line
    ], LIMIT, 0, undefined, undefined, orderAttributes, [orderType]);

}
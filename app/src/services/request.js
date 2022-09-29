/* eslint-disable no-undef */
import {database, DB_ID_MESSAGES} from "../appwrite.js";

export function getContacts(callBack) {

    database.listDocuments(DB_ID_MESSAGES, [
        Appwrite.Query.equal("action", ["request"]),
        Appwrite.Query.equal("receiver_user_id", [window.user.userData.$id]),
    ]).then(res1 => {

        database.listDocuments(DB_ID_MESSAGES, [
            Appwrite.Query.equal("action", ["request"]),
            Appwrite.Query.equal("sender_user_id", [window.user.userData.$id]),
        ]).then(res2 => {
            let contactList = res1.documents.concat(res2.documents).map(e => {
                if (e.sender_user_id === window.user.userData.$id) {
                    return e.receiver_user_id;
                }
                if (e.receiver_user_id === window.user.userData.$id) {
                    return e.sender_user_id;
                }
                return e.sender_user_id;
            });
            callBack([...new Set(contactList)]);
        });

    });

}

export function getMessages(contactUserId) {

    const LIMIT = 100;

    return database.listDocuments(DB_ID_MESSAGES, [
        Appwrite.Query.equal("sender_user_id", [contactUserId, window.user.userData.$id]),
        Appwrite.Query.equal("receiver_user_id", [contactUserId, window.user.userData.$id]),
    ], LIMIT, 0, undefined, undefined, ["$createdAt"], ["DESC"]);

}

export function sendMessage(receiverUserId, messageBody, action) {

    return database.createDocument(DB_ID_MESSAGES, "unique()", {
        // eslint-disable-next-line camelcase
        receiver_user_id: receiverUserId,
        // eslint-disable-next-line camelcase
        sender_user_id: window.user.userData.$id,
        // eslint-disable-next-line camelcase
        message_body: messageBody,
        action,
        state: "new",
    }, [ "role:member"]);

    // FIXME: remove role member
    // Problem: Uncaught (in promise) AppwriteException: Read permissions must be one of: (role:all, role:member, user:632b7eb72b92f0ed3255 (=window.user.userData.$id))

}
import { getContacts, getMessages } from "../services/request.js";
import { getUserByID, getProfilePic } from "../services/users.js";

export function loadContactList () {

    let currentChatUserId = location.hash.split("/");
    if (location.hash.split("/").length > 1) {
        currentChatUserId = location.hash.split("/")[1];
    }

    const contactsEl = document.getElementById("chat-contacts");

    getContacts((contacts) => {

        contacts.forEach((userID) => {

            const profilePic = getProfilePic(userID),
                  template = document.getElementById("chat-contact-li");

            contactsEl.append(document.importNode(template.content, true));
            // eslint-disable-next-line one-var
            const contactEl = contactsEl.lastElementChild;
            contactEl.querySelector("img").src = profilePic;
            contactEl.dataset.userid = userID;

            getUserByID(userID)
            .then(userData => {

                const name = userData.firstname + " " + userData.lastname,
                      contactEl = contactsEl.querySelector(`[data-userid="${userData.$id}"]`);
                
                if (currentChatUserId === userData.$id) {
                    contactEl.querySelector("a").classList.add("active");
                    document.getElementById("current-chat-username").innerText = name;
                }
                contactEl.querySelector("a").href = "#request/" + userData.$id;
                contactEl.querySelector(".name").innerText = name;

            });

        });
        
    });
}

export function loadMessages(userID) {

    document.querySelector(`[data-userid="${userID}"]`)?.classList.add("active");

    getMessages(userID).then((res) => {

        const messagesEl = document.getElementById("chat-messages");

        messagesEl.innerHTML = "";

        res.documents.forEach((message) => {

            const template = document.getElementById("chat-messages-li");

            messagesEl.prepend(document.importNode(template.content, true));

            // eslint-disable-next-line one-var
            const messageEl = messagesEl.firstElementChild;

            messageEl.querySelector(".message").innerText = message.message_body;
            if (message.sender_user_id === window.user.userData.$id) {
                messageEl.classList.add("send");
            }

        });

        // scroll to end
        messagesEl.parentElement.scrollTop = 1000000;
        
    });

}
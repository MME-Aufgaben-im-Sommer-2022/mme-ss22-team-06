/* eslint-disable no-alert */
import { database, storage, STORAGE_ID_AVATARS, DB_ID_USERS } from "../appwrite.js";
import { getProfilePic } from "../services/users.js";

export function loadProfile () {
    database.getDocument(DB_ID_USERS, window.user.userData.$id)
    .then(data => {
        const form = document.getElementById("profile-form");

        form.lastname.value = data.lastname || "";
        form.firstname.value = data.firstname || "";
        form.description.value = data.description || "";
        
    });

    const url = getProfilePic(window.user.userData.$id);
    document.getElementById("profile-img").src = url.href + "&disableCache=" + String(Math.random());
}

// eslint-disable-next-line no-unused-vars
export function updateProfile (form) {

    const data = {
        lastname: form.lastname.value,
        firstname: form.firstname.value,
        description: form.description.value,
    };

    database.updateDocument(DB_ID_USERS, window.user.userData.$id, data)
    .then(() => {
        alert("Erfolgreich.");
    }, error => {
        alert(error.messages);
    });

    if (form.file.files.length === 1) {

        storage.createFile(STORAGE_ID_AVATARS, window.user.userData.$id, form.file.files[0])
        .then(() => {
            alert("Profilbild hochgeladen.");
        }, (error) => {
            alert(error.messages);
        });

    }

    return false;

}

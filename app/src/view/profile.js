import { database, storage } from "../appwrite.js";

export function loadProfile () {
    console.log(window.user.userData.$id);
    database.getDocument('631dc5d578112759fe25', window.user.userData.$id)
    .then(data => {
        const form = document.getElementById("profile-form");

        form.lastname.value = data.lastname || "";
        form.firstname.value = data.firstname || "";
        form.description.value = data.description || "";
        
    });

    const url = getProfilePic(window.user.userData.$id);
    //const url = storage.getFileDownload('631dd36b0c511ff97f9f', window.user.userData.$id);
    console.log(url.href);
    document.getElementById("profile-img").src = url.href + "&disableCache=" + String(Math.random());
}

export function getProfilePic(userID){
    return storage.getFileDownload('631dd36b0c511ff97f9f', userID);
}

// eslint-disable-next-line no-unused-vars
export function updateProfile (form) {

    const data = {
        lastname: form.lastname.value,
        firstname: form.firstname.value,
        description: form.description.value,
    };

    database.updateDocument('631dc5d578112759fe25', window.user.userData.$id, data)
    .then(() => {
        alert("Erfolgreich.");
    }, error => {
        alert(error.messages);
    });

    if (form.file.files.length === 1) {

        storage.createFile('631dd36b0c511ff97f9f', window.user.userData.$id, form.file.files[0])
        .then(() => {
            alert("Profilbild hochgeladen.");
        }, (error) => {
            alert(error.messages);
        });

    }

    return false;

}

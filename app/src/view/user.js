import {getProfilePic} from "../view/profile.js";

export function getUserTemplate(user) {

    const resultEl = document.createElement("li"),
    template = document.getElementById("user-entry-template");
    
    resultEl.append(document.importNode(template.content, true));
    let userEl = resultEl.lastElementChild,
    url = getProfilePic(user.$id);

    userEl.querySelector(".name").innerText = user.firstname +" "+ user.lastname;
    userEl.querySelector(".description").innerText = user.description || "";
    
    if (url.href) {
        userEl.querySelector("img").src = url.href;
    }
    return resultEl;

}
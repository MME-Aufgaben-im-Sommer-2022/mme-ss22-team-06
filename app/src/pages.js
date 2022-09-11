
// Available pages with options
const PAGES = {
    "feed": {
        title: "Feed",
        requireLogin: true,
    },
    "profile": {
        title: "Profil",
        requireLogin: true,
    },
    "request": {
        title: "Anfrage",
        requireLogin: true,
    },
    "settings": {
        title: "Einstellungen",
        requireLogin: true,
    },
    "login": {
        title: "Anmelden",
        requireLogin: false,
    },
    "register": {
        title: "Registrieung",
        requireLogin: false,
    },
    "favBookList": {
        title: "Deine Wunschliste",
        requireLogin: true,
    },
    "ownedBookList": {
        title: "Bücher in deinem Besitz",
        requireLogin: true,
    },
};

function include(includeEl) {

    // Fetches and includes html code into placeholder
    fetch(`./resources/includes/${includeEl.dataset.include}.html`)
        .then(e => e.text())
        .then(includeBody => {
            includeEl.innerHTML = includeBody;
        });

}

function showPage(pageId) {

    // Checks if pageId is correct
    if (!PAGES[pageId]) {
        location.hash = "feed";
        return;
    }

    if (location.hash.slice(1) !== pageId) {
        location.hash = pageId;
        return;
    }

    // If user isn't logged in only pages without required login option
    if (!window.user.isLoggedIn && PAGES[pageId].requireLogin) {
        showPage("login");
        return;
    }

    // If user is logged in but the page requires a login the feed is shown
    //e.g. pageId is login page but the user is already logged in
    if (window.user.isLoggedIn && !PAGES[pageId].requireLogin) {
        showPage("feed");
        return;
    }

    // Changes title for the specific page
    document.title = PAGES[pageId]["title"] + " - Book-Temple";

    const pageEl = document.getElementById("page");

    // Loads source code from the given pageId
    fetch(`./resources/pages/${pageId}.html`)
        .then(e => e.text())
        .then(pageBody => {
            pageEl.innerHTML = "";
            // https://stackoverflow.com/a/62641523
            pageEl.append(document.createRange().createContextualFragment(pageBody));
            // Includes shared html code (e.g. header is used in multiple pages)
            pageEl.querySelectorAll("[data-include]").forEach(el => {
                include(el);
            });
        });

}

export default showPage;
import Account from "./services/account.js";
import showPage from "./pages.js";
// import feedView from "./view/feedView.js";

function init() {

  // var feed = new feedView();
  // feed.openBookInformation();
  // feed.onFavButtonClicked();
  
  // Listens for page changes
  // Then loads the current page from hash
  window.addEventListener('hashchange', () => {
    showPage(location.hash.slice(1));
  });

  
  // Checks if User is already logged in
  window.user = new Account();
  window.user.loadData()
  .then((loggedIn) => {
    let startPage = "";
    if (loggedIn) {
      startPage = "feed";
    } else {
      startPage = "login";
    }
    showPage((location.hash.slice(1) === "") ? startPage : location.hash.slice(1));
  }).catch(console.log);

}

init();
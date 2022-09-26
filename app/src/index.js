import Account from "./services/account.js";
import showPage from "./pages.js";
import feedView from "./view/feedView.js";

function init() {
  
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
    // Uses the hash of the URL if not existing the start page is used 
    showPage(location.hash.slice(1) || startPage);
  }).catch(console.log);

}

init();
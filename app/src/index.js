import Account from "./services/account.js";
import showPage from "./pages.js";

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
    if (loggedIn) {
      showPage("feed");
    } else {
      showPage((location.hash.slice(1) === "") ? "login" : location.hash.slice(1));
    }
  }).catch(console.log);

}

init();
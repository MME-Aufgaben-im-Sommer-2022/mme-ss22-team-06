import { client, database } from "../appwrite.js";
import showPage from "../pages.js";
import { deleteMyBookList } from "./my-books.js";

// Account is the user who logs in
// Users can register, update and delete

class Account {

  constructor() {
    this.account = new Appwrite.Account(client); // eslint-disable-line 
    this.userData = null; // user information from appwrite
    this.isLoggedIn = false;
  }

  loadData () {

    // When logged in userData is loaded from appwrite
    // Returns true if logged in if not returns false
    return new Promise(re => {
      this.account.get()
      .then((userData) => {
          console.log(userData);
          this.userData = userData;
          this.isLoggedIn = true;
          re(true);
      }, () => {
          re(false);
      });
    });

  }

  // FIXME: Should send email to logged in user,
  // but problems with Appwrite
  createPasswordRecovery (email) {

    this.account.createRecovery(email, location.origin + "#password-confirmation")
    .then(() => {
        alert("Bitte E-Mails überprüfen.");
        showPage("login");
    }, (error) => {
        alert(error.message);
    });
    return false;
  }

  // Register new user and auto login 
  create(email, firstname, lastname, password) {

    this.account.create('unique()', email, password)
    .then(async (response) => {
      
      this.signIn(email, password, async () => {
        await this.createUserDocument(response.$id, firstname, lastname);
        location.reload();
      });
    }, (error) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
    });

    return false; // prevent browser form submission
    
  }

  signIn (email, password, callBack = null) {
    
    this.account.createEmailSession(email, password)
    .then(() => {
        if (callBack) {
          callBack();
        } else {
          location.reload();
        }
    }, (error) => {
        // eslint-disable-next-line no-alert
        alert(error.message);
    });

    return false; // prevent browser form submission

  }

  signOut () {

    this.account.deleteSessions()
    .finally(() => {
      location.reload();
    });

  }

  createUserDocument (userId, firstname, lastname) {

    return database.createDocument('631dc5d578112759fe25', userId, {
      firstname, lastname,
    }, ["role:member"] );

  }

  updateEmail(email, password) {

      if (this.appwriteUser === null) {
        return null;
      }
      return this.account.updateEmail(email, password);
  }

  updatePassword(newPassword, oldPassword) {
    return this.account.updatePassword(newPassword, oldPassword);
  }

  // FIXME: Deleting Account doesn't work with Appwrite
  delete(callBack) {
    this.account.updateEmail("deleted"+String(Math.random())+"@deleted.com", prompt("Passwort")) // eslint-disable-line 
    .then(() => {
      // The MyBookList has to be deleted so the books
      // don't show up in other users feeds anymore
      deleteMyBookList(() => {
        // FIXME: When status is updated to blocked the Cookie
        // isn't deleted which creates problems so we just 
        // change the mail-address to a random address and
        // sign the user out
        // this.account.updateStatus(() => {
        //   location.reload();
        // });
        this.signOut();
      });
    }, (e) => {
      console.log(e);
      callBack(true);
    });
  }

}

export default Account;

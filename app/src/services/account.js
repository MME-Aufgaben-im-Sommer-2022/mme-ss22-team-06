import { client, database } from "../appwrite.js";
import showPage from "../pages.js";

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
          this.userData = userData;
          this.isLoggedIn = true;
          re(true);
      }, () => {
          re(false);
      });
    });

  }

  // Register new user and auto login 
  create(email, firstname, lastname, password) {

    this.account.create('unique()', email, password)
    .then(async (response) => {
      
      this.signIn(email, password, async () => {
        await this.createUserDocument(response.$id, firstname, lastname);
        showPage("feed");
      });
    }, (error) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
    });

    return false; // prevent browser form submission
    
  }

  signIn (email, password, callBack = null) {
    
    this.account.createEmailSession(email, password)
    .then((userData) => {
        this.userData = userData;
        this.isLoggedIn = true;
        if (callBack) {
          callBack();
        } else {
          showPage("feed");
        }
    }, (error) => {
        // eslint-disable-next-line no-alert
        alert(error.message);
    });

    return false; // prevent browser form submission

  }

  signOut () {
    
    this.account.deleteSessions()
    // .then(() => {}, console.error)
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
    return new Promise((re, rj) => {
      if (this.appwriteUser === null) {
        rj("No user given.");
      } else {
        this.account.updateEmail(email, password)
        .then(() => {
          re();
        }, (error) => {
          console.log(error);
          rj(error);
        });
      }
    });
  }

  updatePassword(newPassword, oldPassword) {

    return new Promise((re, rj) => {
      this.account.updatePassword(newPassword, oldPassword)
      .then((response) => {
        console.log(response);
        re();
      }, rj);
    });
  }

  delete() {

    return new Promise((re, rj) => {
      this.account.updateStatus()
      .then((response) => {
        console.log(response);
        re();
      }, rj);
    });

  }
}

export default Account;
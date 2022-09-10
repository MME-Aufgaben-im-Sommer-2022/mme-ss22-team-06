import { client } from "../appwrite.js";
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

    return new Promise((re) => {
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
  create(email, fname, sname, password) {

    this.account.create('unique()', email, password, fname + "::" + sname)
    .then(() => {
      this.signIn(email, password);
    }, error => {
      console.log(error);
      // eslint-disable-next-line no-alert
      alert(error.message);
    });

    return false; // prevent browser form submission
    
  }

  signIn (email, password) {
    
    this.account.createEmailSession(email, password)
    .then((userData) => {
        this.userData = userData;
        this.isLoggedIn = true;
        showPage("feed");
    }, (error) => {
        console.log(error);
        // eslint-disable-next-line no-alert
        window.alert(error.message);
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

  updateName(fname, sname) {
    return new Promise((re) => {
      this.account.updateName(fname + "::" + sname)
      .then(() => {
        re();
      }, (error) => {
        console.log(error);
        rj(error);
      });
    });
  }

  updateAddress(street, housenumber, postalCode, city) {
    // FIXME: Currently not working
    let address = [street, housenumber, postalCode, city];
    return new Promise((re, rj) => {
      if (this.appwriteUser === null) {
        rj("No user given.");
      } else {
        this.account.updatePrefs(JSON.stringify(address))
        .then(() => {
          re();
        }, (error) => {
          console.log(error); // Failure
          re();
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
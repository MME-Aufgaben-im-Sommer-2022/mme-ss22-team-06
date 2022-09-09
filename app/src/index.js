
function init() {
  console.log("### Starting MME Project ###"); // eslint-disable-line no-console
}

const client = new Appwrite.Client(); // eslint-disable-line

client
  .setEndpoint('https://appwrite.software-engineering.education/v1') // Your Appwrite Endpoint
  .setProject('62ecf7be7e25d98c6928') // Your project ID
;

const account = new Appwrite.Account(client); // eslint-disable-line

// Register User
account.create('unique()', 'me@example.com', 'password', 'Jane Doe')
.then(response => {
    console.log(response);
}, error => {
    console.log(error);
});

account.delete();



init();
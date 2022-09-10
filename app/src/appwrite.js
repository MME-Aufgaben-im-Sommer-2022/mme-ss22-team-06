
export const client = new Appwrite.Client(); // eslint-disable-line

// export const databases = new Appwrite.Databases(client, '63176b49a99bb69f9dc5'); // eslint-disable-line

client
  .setEndpoint('https://appwrite.software-engineering.education/v1')
  .setProject('62ecf7be7e25d98c6928');
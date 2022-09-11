
export const client = new Appwrite.Client(); // eslint-disable-line

// export const databases = new Appwrite.Databases(client, '63176b49a99bb69f9dc5'); // eslint-disable-line

client
  .setEndpoint('https://appwrite.software-engineering.education/v1')
  .setProject('62ecf7be7e25d98c6928');

// eslint-disable-next-line one-var, no-undef
export const database = new Appwrite.Databases(client, '631dc374066960711054');
export const storage = new Appwrite.Storage(client);
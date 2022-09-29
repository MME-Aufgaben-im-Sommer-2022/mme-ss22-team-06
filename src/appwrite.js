/* eslint-disable one-var, no-undef */

export const client = new Appwrite.Client(); // eslint-disable-line

// export const databases = new Appwrite.Databases(client, "63176b49a99bb69f9dc5"); // eslint-disable-line

client
  .setEndpoint("https://appwrite.software-engineering.education/v1")
  .setProject("62ecf7be7e25d98c6928");

export const database = new Appwrite.Databases(client, "631dc374066960711054");
export const storage = new Appwrite.Storage(client);

export const STORAGE_ID_AVATARS = "631dd36b0c511ff97f9f";
export const DB_ID_USERS = "631dc5d578112759fe25";
export const DB_ID_WISHLIST = "632a1d7067587dbef5ec";
export const DB_ID_MESSAGES = "63348b3620a1fc728d91";
export const DB_ID_STATISTICS = "632701f4118aab49ac92";
export const DB_ID_BOOKS = "632636e3e35316b100d2";
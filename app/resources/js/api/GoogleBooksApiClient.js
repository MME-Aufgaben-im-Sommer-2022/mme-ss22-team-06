/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
require("isomorphic-fetch");
let items = [];

//Persönlicher API-Key für GoogleBooks
const API_KEY = "AIzaSyD78ZjX5C5By3xzU4xjyfJanOA4tiFZaeQ";

fetch(`https://www.googleapis.com/books/v1/volumes?q=${API_KEY}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (result) {
    items = result.items;
    console.log(result);
  }),
  function (error) {
    console.log(error);
  };
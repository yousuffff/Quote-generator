'use strict'
const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const tweetBtn = document.querySelector('#twitter');
const newquoteBtn = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

let apiquote = [];

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const api = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
// const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

function newQuote() {
  loading();
  const newQuote = apiquote[Math.floor(Math.random() * apiquote.length)];
  // console.log(newquote);
  if (!newQuote.author) {
    author.textContent = ' ~Unknown';
  } else {
    author.textContent = ` ~ ${newQuote.author}`;
  }

  //change font size if quote 
  if (newQuote.text.length >= 120) {
    quoteContainer.classList.add('long-quote')
  }
  else {
    quoteContainer.classList.remove('long-quote')
  }
  quote.textContent = newQuote.text;
  complete()
  
}


async function getquote() {
  loading();
  try{
    const reponse = await fetch(api);
   apiquote = await reponse.json();
   
  } catch(error){
  console.log(error);
  }
  newQuote();
}

function tweetQuote(){
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(tweetUrl, '-blank')
}

tweetBtn.addEventListener('click', tweetQuote)
newquoteBtn.addEventListener('click', newQuote)


getquote();

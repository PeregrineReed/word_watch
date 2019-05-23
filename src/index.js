import $ from 'jquery'

const postWord = async (word) => {
  let addWord = await fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word: { value: word } })
  });
  let results = await addWord.json();
  return results;
}

const getWord = async () => {
  console.log('get')
  let topWord = await fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word');
  let results = await topWord.json();
  return results;
}

const setTopWord = async () => {
  let topWord = await getWord();
  topWord = topWord.word
  let top = $('#top-word');
  let count = $('#word-count');
  let word = Object.keys(topWord)[0]
  top.text(word.toUpperCase() + ': ');
  count.text(Object.values(topWord)[0]);
}

$(document).ready(() => {

  setTopWord();

  $(".break-down").on("click", async function() {
    const tag = $('.words');
    const input = tag[0].value
    const array = input.split(' ');
    console.log(array);
    array.map(async (word) => {
      postWord(word);
    });
    if (array.length === 1) {
      $('.submit-msg').text(array[0] + ' added!');
    } else {
      $('.submit-msg').text('words added!');
    }
    setTimeout(function() {
        $('.submit-msg').text('')
    }, 1000);
    setTopWord();
  })

})

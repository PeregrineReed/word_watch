import $ from 'jquery'

$(document).ready(() => {
  $(".break-down").on("click", async function() {
    const tag = $('.words');
    const input = tag[0].value
    let x = await fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word: { value: input } })
    });
    x = await x.json()
    console.log(x)
  })
})

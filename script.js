// our function start area

function toggleButton() {
  button.disabled = !button.disabled;
}
function tellMe(joke) {
  console.log('tell me:', joke);
  VoiceRSS.speech({
    key: '14f82388e4b843f08cb991b1de73b13d',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// get jokes form joke api
async function getJokes() {
  let joke = '';
  const url =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text to speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    // Catch Errors Here
    console.log('The error is: ', error);
  }
}
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

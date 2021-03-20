const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

const btnLetters = document.getElementsByClassName('btn-letters')[0];
const btnNotes = document.getElementsByClassName('btn-notes')[0];
const btnFullScreen = document.getElementsByClassName('fullscreen')[0];


// console.log(btnNotes);

function playAudio(src) {	
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

//события мыши
function startPlayUser (event) {
	function continuePlayUser (event) {
		if (event.target.classList.contains('piano-key')) {
	      const note = event.target.dataset.note;
	      const src = `assets/audio/${note}.mp3`;
	      playAudio(src);

	      event.target.classList.add("piano-key-active");
	      event.target.classList.add("piano-key-active-pseudo");
	    } 
	}
	continuePlayUser (event);

	piano.addEventListener('mouseover',continuePlayUser);

	piano.addEventListener('mouseout', (event) => {
		event.target.classList.remove("piano-key-active");
		event.target.classList.remove("piano-key-active-pseudo");
	});

	document.addEventListener('mouseup', (event) => {
		event.target.classList.remove("piano-key-active");
		event.target.classList.remove("piano-key-active-pseudo");

		piano.removeEventListener('mousedown', startPlayUser);
		piano.removeEventListener('mouseover', continuePlayUser);
		piano.addEventListener('mousedown', startPlayUser);		
	});
}

piano.addEventListener('mousedown', startPlayUser);


//событя клавиатуры

function startPlayUserOnKeyboard (event) {
	for (let i = 0; i < pianoКeys.length; i++) {	
		if (pianoКeys[i].dataset.letter === String.fromCharCode(event.keyCode) && (!event.repeat)){
			const note = pianoКeys[i].dataset.note;
	     	const src = `assets/audio/${note}.mp3`; 
    		playAudio(src);

    		pianoКeys[i].classList.add("piano-key-active");
	      	pianoКeys[i].classList.add("piano-key-active-pseudo");
		}


		window.addEventListener('keyup', (event) => {
			switch (String.fromCharCode(event.keyCode)) {
				case pianoКeys[i].dataset.letter:			
				pianoКeys[i].classList.remove("piano-key-active");
				pianoКeys[i].classList.remove("piano-key-active-pseudo");
		
				window.addEventListener('keydown', startPlayUserOnKeyboard);
				break;
			}

		});
	}
}

window.addEventListener('keydown', startPlayUserOnKeyboard);

// изменения  надписи клавишь
function willSwitchLetters(event){
	btnNotes.classList.remove("btn-active");
	event.target.classList.add("btn-active");
	for (let i = 0; i < pianoКeys.length; i++) {
		pianoКeys[i].classList.add("piano-key-letter");
	}
}

function willSwitchNotes(event){
	btnLetters.classList.remove("btn-active");
	event.target.classList.add("btn-active");
	for (let i = 0; i < pianoКeys.length; i++) {
		pianoКeys[i].classList.remove("piano-key-letter");
	}
}

btnLetters.addEventListener('click', willSwitchLetters);
btnNotes.addEventListener('click', willSwitchNotes);


//кнопка fullscreen

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

btnFullScreen.addEventListener("click", (event) => {toggleFullScreen();});
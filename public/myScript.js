function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
  }
  var user = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
  var userStats = {avgWPM: 40, low: 20, high: 60};
  var vocab = ["Saab", "Volvo", "BMW"];
  
  
  function printRandom(min,max) {
    document.getElementById("demo").innerHTML = getRandom(min,max)
  }
  
  function displayDate(){
    var d = new Date();
    document.getElementById("demo").innerHTML = d;
  }
  
  // Typing game
  
  
  
  
  
  window.addEventListener('load', init);
  
  // Globals
  
  // Available Levels
  const levels = {
    easy: 5,
    medium: 3,
    hard: 1
  };
  
  // To change level
  const currentLevel = levels.easy;
  
  let time = currentLevel;
  let score = 0;
  let isPlaying;
  
  // DOM Elements
  let wordInput = document.querySelector('#word-input');
  const currentWord = document.querySelector('#current-word');
  const scoreDisplay = document.querySelector('#score');
  const timeDisplay = document.querySelector('#time');
  const message = document.querySelector('#message');
  const seconds = document.querySelector('#seconds');
  
  const letters = [
    
    '하나',
    '둘',
    '감사',
    '돈',
    '상처',
    '학생',
    '학교'
    
  ];
  
  // Initialize Game
  function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(letters);
  
  
    //Prevent white spaces
    wordInput.addEventListener('keydown', function (event) {
      if (wordInput.value.length === 0 && event.which === 32) {
          event.preventDefault();
      }
    });
  
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
  }
  
  // Start match
  function startMatch() {
    if(whiteSpace()){
      if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(letters);
    
        // to clear words
        //wordInput.value = '';
        document.getElementById("myForm").reset();
        score++;
        scoreDisplay.innerHTML = score;
      }
    }
    }
    
  
  // Match currentWord to wordInput
  
  function matchWords() {
    if (wordInput.value.trim() === currentWord.innerHTML) {
      message.innerHTML = 'Correct!!!';
      return true;
    } else {
      message.innerHTML = '';
      return false;
    }
  }
  
  // Pick & show random word
  function showWord(letters) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
  }
  
  // Countdown timer
  function countdown() {
    // Make sure time is not run out
    if (time > 0) {
      // Decrement
      time--;
    } else if (time === 0) {
      // Game is over
      isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
  }
  
  // Check game status
  function checkStatus() {
    if (!isPlaying && time === 0) {
      message.innerHTML = 'Game Over!!!';
      score = 0;
    }
  }
  
  
  //typing.js
  
  
  const textDisplayElement = document.getElementById('textDisplay')
  const textInputElement = document.getElementById('textInput')
  
  const numWords = 100
  var vocab =[
      {word: '수건', keyStrokes: 5},
      {word: '학생', keyStrokes: 6},
      {word: '없어', keyStrokes: 6},
      {word: '확실', keyStrokes: 7},
      {word: '학생', keyStrokes: 6},
      {word: '버터', keyStrokes: 4},
      {word: '연필', keyStrokes: 6},
      {word: '지갑', keyStrokes: 5},
      {word: '계단', keyStrokes: 5},
      {word: '계란', keyStrokes: 5},
      {word: '학교', keyStrokes: 5},
      {word: '김치', keyStrokes: 5},
      {word: '감사', keyStrokes: 5},
      {word: '야', keystroke: 2}
  
  ]
  
  var words = vocab.map(vocabElement => vocabElement.word)
  
  
  showWord(words)
  function showWord(words) {
      
      for (i=0; i< numWords; i++) {
          // Generate random array index
          const randIndex = Math.floor(Math.random() * words.length);
  
          // creat span and custom attribute, the content of the span changes average time it is looped
          var content ="";
          var span = document.createElement("span");
          span.setAttribute('wordNum', i+1)
          content += words[randIndex]+ ' ';
          span.innerHTML=content
          // Output the list with comma seperating them
          textDisplayElement.appendChild(span)
  
      }
  }
  
   //Prevent white spaces
   textInputElement.addEventListener('keydown', function (event) {
      if (textInputElement.value.length === 0 && event.which === 32) {
          event.preventDefault();
      }
    });
  
  // test white space
  function whiteSpace(){
      var patt = new RegExp(" ");
      var res = patt.test(textInputElement.value);
      return res
    }
  
  
  let wordTyped = 0
  let rowLength = 886.007 //length of word display box
  let keyStrokeCorrect= 0
  let keyStrokeWrong = 0
  textInputElement.addEventListener('input', () => {
      // get all span type in an array
      console.log(wordTyped)
      const arrayText = document.getElementsByTagName("span")
      //array value is values of all that is typed in
      const arrayValue = textInputElement.value.split('')
    
      letterTyped = arrayValue.length
      // -1 because index needs to start from 0 and length is always at least 1
      const inputCharacter = arrayValue[letterTyped-1]
      //remove all styling if nothing has been typed
      if (inputCharacter == null) {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.remove('wrong')
      // add incorrect if the user presses the space button and the word is incorrect
      } else if(whiteSpace(inputCharacter)&&
          textInputElement.value !== arrayText[wordTyped].innerHTML){
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          textInputElement.value = []
          rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
          //remove space to compare, and add quotation mark
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          keyStrokeWrong += vocab[index].keyStrokes
          wordTyped += 1
      //if word is correct then add correct class. Compare word to get index to find keystroke
      //empty out the currently typed value for next comparision, reduce rowLength
      } else if(textInputElement.value === arrayText[wordTyped].innerHTML){
          arrayText[wordTyped].classList.add('correct')
          arrayText[wordTyped].classList.remove('wrong')
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          keyStrokeCorrect += vocab[index].keyStrokes
          wordTyped += 1
          textInputElement.value = []
          rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
  
      //add correct if everything is correct
      } else if (inputCharacter === arrayText[wordTyped].innerHTML[letterTyped-1]) {
          arrayText[wordTyped].classList.add('correct')
          arrayText[wordTyped].classList.remove('wrong')
          
      
      
      }
      // this is to add incorrect while the user is typing
      else {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          correct = false
          
      }
      
      if (rowLength + 10.48 < wordLengthCalculator(arrayText[wordTyped].innerHTML.length)){
        $('#textDisplay').css('top','-=60px')
        rowLength = 886.007
      }
    })
    
    function wordLengthCalculator(wordLength) {
        return (wordLength-1)*40 + 10.48
    }
  
  
  
  const textDisplayElement = document.getElementById('textDisplay')
  const textInputElement = document.getElementById('textInput')
  
  const numWords = 10
  var vocab =[
      {word: 'box', keystroke:1},
      {word: 'sand', keystroke:1},
      {word: 'keyboard', keystroke:1},
      {word: 'girl', keystroke:1},
      {word: 'boy', keystroke:1},
      {word: 'legend', keystroke:1},
      {word: 'length', keystroke:1},
      {word: 'width', keystroke:1},
      /*{word: '수건', keyStrokes: 5},
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
      {word: '야', keystroke: 2}*/
  
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
          wordTyped += 1
          textInputElement.value = []
          rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
          //remove space to compare, and add quotation mark
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          keyStrokeWrong += vocab[index].keyStrokes
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
          if(wordTyped !==numWords){
            rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
          }
  
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
      let wordProgress = wordTyped/numWords*100
      const progress = document.querySelector('.progressBar')

      progress.style.width = `${wordProgress}%`
      if (rowLength + 10.48 < wordLengthCalculator(arrayText[wordTyped].innerHTML.length)){
        $('#textDisplay').css('top','-=60px')
        rowLength = 886.007
      }
      getTextWidth(arrayText[wordTyped].innerHTML)
      console.log(arrayText[wordTyped].innerHTML)
    })
    
    function wordLengthCalculator(wordLength) {
        return (wordLength-1)*40 + 10.48
    }
		function getTextWidth(word) { 

			text = document.createElement("span"); 
			document.body.appendChild(text); 

			text.style.font = "times new roman"; 
			text.style.fontSize = 16 + "px"; 
			text.style.height = 'auto'; 
			text.style.width = 'auto'; 
			text.style.position = 'absolute'; 
			text.style.whiteSpace = 'no-wrap'; 
			text.innerHTML = word; 

			width = Math.ceil(text.clientWidth); 

      console.log(width)
    } 
    
    var language = document.getElementById('languageSelect').innerHTML
    console.log(language)

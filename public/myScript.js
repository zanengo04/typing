  const textDisplayElement = document.getElementById('textDisplay')
  const textInputElement = document.getElementById('textInput')
  
  const numWords = 20
  var vocab =[
      {word: 'box', keystroke:3},
      {word: 'sand', keystroke:4},
      {word: 'keyboard', keystroke:8},
      {word: 'girl', keystroke:4},
      {word: 'boy', keystroke:3},
      {word: 'legend', keystroke:6},
      {word: 'length', keystroke:6},
      {word: 'width', keystroke:5},
      {word: 'you', keystroke:3},
      {word: 'love', keystroke:4},
      {word: 'table', keystroke:5},
      {word: 'desk', keystroke:4},
      {word: 'camera', keystroke:6},
      {word: 'hello', keystroke:5},
      {word: 'water', keystroke:5},
      {word: 'fire', keystroke:4},
      {word: 'earth', keystroke:5},
      {word: 'teeth', keystroke:5},
      {word: 'tooth', keystroke:5},
      {word: 'fairy', keystroke:5},
      {word: 'tail', keystroke:4},
      {word: 'cable', keystroke:5},
      {word: 'laptop', keystroke:6},
      {word: 'remote', keystroke:6},
      {word: 'speaker', keystroke:7},
      {word: 'paper', keystroke:5},
      {word: 'clock', keystroke:5},
      {word: 'time', keystroke:4},
      {word: 'music', keystroke:5},
  
  ]
  
  var words = vocab.map(vocabElement => vocabElement.word)
  
  
  showWord(words)
  function showWord(words) {
      
      for (i=0; i< numWords; i++) {
          const randIndex = Math.floor(Math.random() * words.length);
          var content ="";
          var span = document.createElement("span");
          span.setAttribute('wordNum', i+1)
          content += words[randIndex]+ ' ';
          span.innerHTML=content
          textDisplayElement.appendChild(span)
  
      }
  }
   textInputElement.addEventListener('keydown', function (event) {
      if (textInputElement.value.length === 0 && event.which === 32) {
          event.preventDefault();
      }
    });
  
  function whiteSpace(){
      var patt = new RegExp(" ");
      var res = patt.test(textInputElement.value);
      return res
    }
var backspaceCount = 0
textInputElement.addEventListener("keydown", function(event){
  if(event.key === "Backspace") {
    backspaceCount +=1
  }
});
  let wordTyped = 0
  let rowLength = 886.007
  let keyStrokeCorrect= 0
  let keyStrokeWrong = 0
  var spaceLength = 11.1132813
  var wrongCharacter = 0
  var characterScore = 0
  
  textInputElement.addEventListener('input', () => {

      const arrayText = document.getElementsByTagName("span")
      const arrayValue = textInputElement.value.split('')
    
      letterTyped = arrayValue.length
      const inputCharacter = arrayValue[letterTyped-1]
      
      if (inputCharacter == null) {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.remove('wrong')
      } else if(whiteSpace(inputCharacter)&&
          textInputElement.value !== arrayText[wordTyped].innerHTML){
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          textInputElement.value = []
          //rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          keyStrokeWrong += vocab[index].keyStrokes
          rowLength -= getTextWidth(arrayText[wordTyped].innerHTML)
          wordTyped += 1
          characterScore =0
      } else if(textInputElement.value === arrayText[wordTyped].innerHTML){
          arrayText[wordTyped].classList.add('correct')
          arrayText[wordTyped].classList.remove('wrong')
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          keyStrokeCorrect += vocab[index].keyStrokes

          textInputElement.value = []
          if(wordTyped !==numWords){
            //rowLength -= wordLengthCalculator(arrayText[wordTyped].innerHTML.length)
            rowLength -= getTextWidth(arrayText[wordTyped].innerHTML)
            wordTyped += 1
          }
          characterScore = 0

      } else if (inputCharacter === arrayText[wordTyped].innerHTML[letterTyped-1]) {
          if ((letterTyped==characterScore+1 && backspaceCount ==0)|| (characterScore ==2 && letterTyped ==1)) {
            arrayText[wordTyped].classList.add('correct')
            arrayText[wordTyped].classList.remove('wrong')
          }
          const wordCompare = arrayText[wordTyped].innerHTML.replace(/\s+/g,'')
          const index = words.findIndex(object => object === wordCompare);
          console.log(letterTyped)
          if ( vocab[index].keystroke > letterTyped){
              characterScore += 1
              if (letterTyped ==1 && backspaceCount >0){
                characterScore =1
                backspaceCount =0
                console.log(characterScore)
              }
              else if (characterScore >1 && backspaceCount >0) {
                characterScore -= 2
                if(letterTyped>characterScore){
                  characterScore +=1
                }
                backspaceCount = 0
                console.log("letter typed=", letterTyped)
                console.log("charcter score=", characterScore)
              }
              
          } else if (vocab[index].keystroke == letterTyped && backspaceCount ==0){
            characterScore += 1
              if (letterTyped ==0 && backspaceCount >0){
                characterScore =0
                backspaceCount =0
                console.log(letterTyped)
                console.log(characterScore)
              }
              else if (characterScore >1 && backspaceCount >0) {
                backspaceCount = 0
                console.log("letter typed=", letterTyped)
                console.log("charcter score=", characterScore)
              }
          }
          console.log("charcter score=", characterScore)

      }
      else {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          correct = false
      }
      let wordProgress = wordTyped/numWords*100
      const progress = document.querySelector('.progressBar')

      progress.style.width = `${wordProgress}%`
      //if (rowLength + 10.48 < wordLengthCalculator(arrayText[wordTyped].innerHTML.length)){
      if (rowLength +spaceLength < getTextWidth(arrayText[wordTyped].innerHTML)){
        $('#textDisplay').css('top','-=60px')
        rowLength = 886.007
      }
      getTextWidth(arrayText[wordTyped].innerHTML)
    })
    

    function wordLengthCalculator(wordLength) {
        return (wordLength-1)*40 + 10.48
    }
		function getTextWidth(word) { 
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.font = "40px Arial";
      var txt = word
      length = ctx.measureText(txt).width
      return length
    } 
    

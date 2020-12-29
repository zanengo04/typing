import React, {useState} from 'react'

import ProgressBar from './ProgressBar/ProgressBar'
import Reload from './Reload'
import Select from './Select'
export default function Typing() {
    const [language,setLanguage] = useState('English')
    function languageSelect() {
        var language1 = document.getElementById("language");
        var selectedText = language1.options[language1.selectedIndex].text;
        document.getElementById("languageSelect").innerHTML = selectedText
        setLanguage(selectedText)
        
    }

    const numWords = 10
    var vocab=[
        {word: 'box', keystroke:1},
        {word: 'sand', keystroke:1},
        {word: 'keyboard', keystroke:1},
        {word: 'girl', keystroke:1},
        {word: 'boy', keystroke:1},
        {word: 'legend', keystroke:1},
        {word: 'length', keystroke:1},
        {word: 'width', keystroke:1}]
        
        
    var words = vocab.map(vocabElement => vocabElement.word)

    window.onload = () => showWord(words)
    function showWord(words) {
        const textDisplayElement = document.getElementById('textDisplay')
        var i
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
    function updateWords(words){
        document.getElementById('textDisplay').innerHTML =""
        const textDisplayElement = document.getElementById('textDisplay')
        var i
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

    }}

    function onChangeFunction() {
        languageSelect()
        updateWords(words)
    }
    return (
        <div className="typingContainer">
            <script src="typing.js" defer></script>
            <p id="languageSelect"></p>
            <select id="language" name="language" onChange={onChangeFunction}>
                <option value="language">Select Language</option>
                <option value="english">English</option>
                <option value="korean">Korean</option>
            </select>
            <Select />
            <div className="textBox" id='textBox'>
                <div className="text-display" id= "textDisplay"/>
            </div>
            
            <input type='text' className="text-Input" id="textInput" autoFocus></input>
            <Reload />
            <ProgressBar />
        </div>
    )
}
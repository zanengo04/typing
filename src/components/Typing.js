import React from 'react'

import ProgressBar from './ProgressBar/ProgressBar'
export default function Typing() {
    return (
        <div className="typingContainer">
            <script src="typing.js" defer></script>
            <div className="textBox">
                <div className="text-display" id= "textDisplay"/>
            </div>
            
            <input type='text' className="text-Input" id="textInput" autoFocus></input>
            <ProgressBar />
        </div>
    )
}
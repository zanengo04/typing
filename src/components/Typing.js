import React from 'react'

export default function Typing() {
    return (
        <main>
            <script src="typing.js" defer async></script>
            <div class="typingContainer">
                <script src="typing.js" defer></script>
                <div class="textBox">
                    <div class="text-display" id= "textDisplay">
                
                    </div>
                </div>
                
                <input type='text' class="text-Input" id="textInput" autofocus></input>
   
            </div>
        </main>
        
    )
}
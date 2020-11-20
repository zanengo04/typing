import React from 'react'
const refreshPage = ()=>{
    window.location.reload();
 }
export default function Reload() {
    return (
        <button class="btn" id='reload' onClick={refreshPage}><i class="fas fa-redo"></i></button>
    )
}

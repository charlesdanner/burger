document.addEventListener("DOMContentLoaded", function(event) {

const textArea = document.getElementById('textArea');

document.getElementById('submit').addEventListener('click', () =>{
     console.log(textArea.value.trim())
})



})
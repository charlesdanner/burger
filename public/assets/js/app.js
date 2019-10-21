document.addEventListener("DOMContentLoaded", event => {        //event listener listening for if the DOM has been loaded completely or not

    const textArea = document.getElementById('textArea');           //HTML text are assigned to a variable
    const devourBtn = document.getElementsByClassName('devourBtn')      //all instances of .devourBtn are assigned to devourBtn
    const trashBtn = document.getElementsByClassName('trashBtn')

    document.getElementById('submit').addEventListener('click', () => { //when the submit button is clicked...
        const newBurger = textArea.value.trim()                     //get the value of the text area
        document.getElementById('error').style.display = 'none';        //set the error message back to its default css display style

        if (textArea.value.trim() != "") {          //if the textare isn't empty..

            axios.post('/api/new-burger', { newBurger })                          //make an axios call sending the value of the text input contained within an object
                .then(response => !response.data.burgerExists ? location.reload() : document.getElementById('badName').style.display = 'block', 
                                                                                    document.getElementById('badName').style.color = 'red')
        } else document.getElementById('error').style.display = 'block', document.getElementById('error').style.color = 'red'

    })

    for (var i = 0; i < devourBtn.length; i++) {        //for loop looping through the devourBtn array creating click event listeners for each one
        devourBtn[i].addEventListener('click', function() { //not using ES6 arrow function because it changes the scope to the window
            axios.put(`/api/devour-burger/${this.id}`)
            .then(response => {
                response.data === 1 ? location.reload() : console.log('an error occurred')
            })    
        })
    }

    for (var i = 0; i < trashBtn.length; i++) {        //for loop looping through the trashBtn array creating click event listeners for each one
        trashBtn[i].addEventListener('click', function() { //not using ES6 arrow function because it changes the scope to the window
            axios.delete(`/api/delete-burger/${this.id}`)
            .then(response => {
                response ? location.reload() : console.log('an error occurred')
            })    
        })
    }


})
document.addEventListener("DOMContentLoaded", event => {        //event listener listening for if the DOM has been loaded completely or not

    const textArea = document.getElementById('textArea');           //HTML text are assigned to a variable
    const devourBtn = document.getElementsByClassName('devourBtn')      //all instances of .devourBtn are assigned to devourBtn

    const resetErrorMessages = () => {
        document.getElementById('error').style.display = 'none';        //set the error message back to its default css display style
        document.getElementById('badName').style.display = 'none';
        document.getElementById('tooManyBurgers').style.display = 'none';
        document.getElementById('tooMuchOnPlate').style.display = 'none';
    }

    document.getElementById('submit').addEventListener('click', () => { //when the submit button is clicked...
        const newBurger = textArea.value.trim()                     //get the value of the text area
        resetErrorMessages()

        if (textArea.value.trim() != "") {          //if the textare isn't empty..
            if (devourBtn.length < 4) {
                axios.post('/api/new-burger', { newBurger })                          //make an axios call sending the value of the text input contained within an object
                    .then(response => !response.data.burgerExists ? location.reload() : document.getElementById('badName').style.display = 'block',
                        document.getElementById('badName').style.color = 'red')
            } else {
                document.getElementById('tooMuchOnPlate').style.display = 'block'
                document.getElementById('tooMuchOnPlate').style.color = 'red'
            }
        } else {
            document.getElementById('error').style.display = 'block'
            document.getElementById('error').style.color = 'red'
        }
    })

    for (var i = 0; i < devourBtn.length; i++) {        //for loop looping through the devourBtn array creating click event listeners for each one
        devourBtn[i].addEventListener('click', function () { //not using ES6 arrow function because it changes the scope to the window
           resetErrorMessages()
            axios.put(`/api/devour-burger/${this.id}`)
                .then(response => {
                    if (response.data.tooManyBurgers) {
                        document.getElementById('tooManyBurgers').style.display = 'block'
                        document.getElementById('tooManyBurgers').style.color = 'red'
                    } else location.reload()
                })
        })
    }

    document.addEventListener('click', event => {

        if(event.target.matches('.trashBtn')){
            axios.delete(`/api/delete-burger/${event.target.id}`)
                .then(response => {
                    response ? location.reload() : console.log('an error occured')
                })
        }
    })

})
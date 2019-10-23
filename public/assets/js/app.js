document.addEventListener("DOMContentLoaded", event => {        //event listener listening for if the DOM has been loaded completely or not

    const textArea = document.getElementById('textArea');           //HTML text are assigned to a variable
    const devourBtn = document.getElementsByClassName('devourBtn')      //all instances of .devourBtn are assigned to devourBtn
                                                    

    ////RESET ERROR MESSAGES WHENEVER A BUTTON IS PRESSED
    const resetErrorMessages = () => {
        document.getElementById('error').style.display = 'none';        //set the error message back to its default css display style
        document.getElementById('badName').style.display = 'none';
        document.getElementById('tooManyBurgers').style.display = 'none';
        document.getElementById('tooMuchOnPlate').style.display = 'none';
    }

    const showErrorMessage = (element) => {
        document.getElementById(element).style.display = 'block';       //function for setting up the error messages
        document.getElementById(element).style.display = 'block'
    }
    ////CLICK EVENT LISTENERS
    document.addEventListener('click', event => {

            /////SUBMIT BUTTON LISTENER
        if (event.target.matches('.submit')) {              //listener for the submit button
            const newBurger = textArea.value.trim();  
            resetErrorMessages();                        //reset the error messages, in case there are any.

            if (textArea.value.trim() != "") {                       //run the function if text area isn't empty                                              
                if (devourBtn.length < 4) {
                    axios.post('/api/new-burger', { newBurger })                          //make an axios call sending the value of the text input contained within an object
                        .then(response => !response.data.burgerExists ? location.reload() : showErrorMessage('badName')) //if the response from the server says the user input was a burger that didn't exist, reload the page,                                                                                                                               //if it did exist show the error message
                } else showErrorMessage('tooMuchOnPlate')           //if there are too many instances of burgers on the page already show the error message
            } else showErrorMessage('error')                            //if no value is in the text are when client hits submit, call the error
        }

        //////DEVOUR BUTTON LISTENER
        if (event.target.matches('.devourBtn')) {
            resetErrorMessages();
            axios.put(`/api/devour-burger/${event.target.id}`)  //make a put request to the server
                .then(response => {
                    response.data.tooManyBurgers ? showErrorMessage('tooManyBurgers') : location.reload();  //if the response states there are too many burgers on the devoured side an error message appears, otherwise page refreshes
                })
        }

        //////DELETE BUTTON LISTENER
        if (event.target.matches('.trashBtn')) {
            axios.delete(`/api/delete-burger/${event.target.id}`) //delete the burger in the database where the table id equals the target id
                .then(response => {
                    response ? location.reload() : console.log('an error occured')
                })
        }
    })
})
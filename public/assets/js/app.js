document.addEventListener("DOMContentLoaded", event => {        //event listener listening for if the DOM has been loaded completely or not

    const devouredContainer = document.getElementById('devouredContainer')
    const notDevouredContainer = document.getElementById('notDevouredContainer')
    const submit = document.getElementById('submit');

    /////SUBMIT BUTTON function
    const submitNewBurger = () => {
        const textArea = document.getElementById('textArea');           //HTML text are assigned to a variable
        const devourBtn = document.getElementsByClassName('devourBtn')      //all instances of .devourBtn are assigned to devourBtn
        const newBurger = textArea.value.trim();

        resetErrorMessages();                        //reset the error messages, in case there are any.

        if (textArea.value.trim() != "") {                       //run the function if text area isn't empty                                              
            if (devourBtn.length < 4) {
                axios.post('/api/new-burger', { newBurger })                          //make an axios call sending the value of the text input contained within an object
                    .then(response => !response.data.burgerExists ? location.reload() : showErrorMessage('badName')) //if the response from the server says the user input was a burger that didn't exist, reload the page,                                                                                                                               //if it did exist show the error message
            } else showErrorMessage('tooMuchOnPlate')           //if there are too many instances of burgers on the page already show the error message
        } else showErrorMessage('error')                            //if no value is in the text are when client hits submit, call the error
    }

    //////DEVOUR BUTTON FUNCTION
    const devourBurger = burger => {
        resetErrorMessages();
        axios.put(`/api/devour-burger/${burger}`)  //make a put request to the server
            .then(response => {
                response.data.tooManyBurgers ? showErrorMessage('tooManyBurgers') : location.reload();  //if the response states there are too many burgers on the devoured side an error message appears, otherwise page refreshes
            })
    }

    //////DELETE BUTTON FUNCTION
    const throwBurgerInTrash = burger => {
        axios.delete(`/api/delete-burger/${burger}`) //delete the burger in the database where the table id equals the target id
            .then(response => {
                response ? location.reload() : console.log('an error occured')
            })
    }

    ////RESET ERROR MESSAGES WHENEVER A BUTTON IS PRESSED
    const resetErrorMessages = () => {
        document.getElementById('error').style.display = 'none';
        document.getElementById('badName').style.display = 'none';
        document.getElementById('tooManyBurgers').style.display = 'none';
        document.getElementById('tooMuchOnPlate').style.display = 'none';
    }

    /////SETS ERROR MESSAGE
    const showErrorMessage = element => {
        document.getElementById(element).style.display = 'block';
        document.getElementById(element).style.color = 'red'
    }

    /////CLICK EVENTS
    devouredContainer.addEventListener('click', event => {  //call throwBurgerInTrash function when a trashBtn is pressed
        event.preventDefault();
        if (event.target.name === 'trashBtn') {
            throwBurgerInTrash(event.target.id)
        }
    });

    notDevouredContainer.addEventListener('click', event => {   //call devourBurger function when a devourBtn is pressed
        event.preventDefault();
        if (event.target.name === 'devourBtn') {
            devourBurger(event.target.id)
        }
    });

    submit.addEventListener('click', event => {     //call submitNewBurger when submit button is pressed
        event.preventDefault();
        submitNewBurger();
    });
});
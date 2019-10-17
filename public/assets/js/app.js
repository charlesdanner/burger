document.addEventListener("DOMContentLoaded", function (event) {

    const textArea = document.getElementById('textArea');

    document.getElementById('submit').addEventListener('click', () => {
        const newBurger = textArea.value.trim()

        if (textArea.value.trim() != "") {

            axios.post('/', { newBurger })
                .then(response => {
                    response.data.burgerExists ?   console.log('this shit is fucked') : location.reload();          
                })
        }
    })



})
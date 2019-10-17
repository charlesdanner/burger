document.addEventListener("DOMContentLoaded", function (event) {

    const textArea = document.getElementById('textArea');
    const devourBtn = document.getElementsByClassName('devourBtn')

    document.getElementById('submit').addEventListener('click', () => {
        const newBurger = textArea.value.trim()
        document.getElementById('error').style.display = 'none';

        if (textArea.value.trim() != "") {

            axios.post('/', { newBurger })
                .then(response => {
                    response.data.burgerExists ?   console.log('this shit is fucked') : location.reload();          
                })
        } else {
            document.getElementById('error').style.display = 'block'
            document.getElementById('error').style.color = 'red';
        }
    })

   for(var i = 0; i < devourBtn.length; i++){
       devourBtn[i].addEventListener('click', function() {
           console.log(this.id)
       })
   }


})
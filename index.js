window.onload = () => {
    if (document.getElementById('contact') != null) {
        const contact = document.getElementById('contact');
        contact.onsubmit = (e) => {
            e.preventDefault();
            document.getElementById("name-error").innerHTML = "";
            document.getElementById("email-error").innerHTML = "";
            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const validEmailFormat = /\S+@\S+\.\S+/;

            if (nameField.value === "") {
                document.getElementById("name-error").innerHTML = "To submit the form, you need to tell me your name";
            } else if (emailField.value === "") {
                document.getElementById("email-error").innerHTML = "I need an email to get in touch with you"
            } else if (!validEmailFormat.test(emailField.value)) { //formato regex
                document.getElementById("email-error").innerHTML = "Invalid format, check your email"
            } else {
                showNotification();
            }
        }
    }
    if (document.getElementById('menu_mobile_icon') != null) {
        const menu_icon = document.getElementById('menu_mobile_icon');

        /** Validar el formulario antes de mostrar la notificacion */
        menu_icon.onclick = (e) => {
            let nav = document.getElementsByTagName('nav')[0];
            let icon = document.getElementById('menu_mobile_icon');
            let content = document.getElementsByClassName('container')[0];
            if (nav.style.display === '') {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                nav.style.display = 'block';
                nav.style.height = '90vh';
                nav.style.maxHeight = '90vh';
                content.style.display = 'none';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                nav.style.display = '';
                content.style.display = 'block';
            }
        }

    }
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
    document.getElementById("name-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    nombre = document.getElementById("name").value;
    correo = document.getElementById("email").value;
    mensaje = escapeRegExp(document.getElementById("message").value);

    //Exito 
    jQuery.ajax({
        url: "./contact-form.php",
        type: "POST",
        dataType: "json",
        data: {
            Name: nombre,
            Email: correo,
            Message: mensaje
        }
    }).done(function(data) {
        console.dir(data);
        document.querySelector('.form-container').reset();
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification").innerHTML = "Message sent.";
        setTimeout(function() {
            document.querySelector(".notification").style.display = "none";
        }, 3000);
    }).fail(function(data) {
        document.querySelector('.form-container').reset();
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification").innerHTML = "Message sent.";
        setTimeout(function() {
            document.querySelector(".notification").style.display = "none";
        }, 3000);
        console.dir(data);
    });
}
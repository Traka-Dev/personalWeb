$(document).ready(function() {
    $('#menu_mobile_icon').click(function() {
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
    });
});
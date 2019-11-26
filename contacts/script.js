$(document).ready(function(){
    var user= localStorage.getItem('user');
    $('#log').append(user);
})
$(document).ready(function(){
    var user= localStorage.getItem('user');
    $('#log').append(user);

    $('button').on('click', function(){
        getValues();
    });
})

function getValues(){
    let concern = $('#concern').val()
    let message = $("#message").val()
    let any_empty = (concern == "" || message == "");
    if(!any_empty){
        sendMail(concern, message);
    }
}

function sendMail(concern, message){
    let mail = localStorage.getItem("mail");
    Email.send({
        Host: "smtp.gmail.com",
        Username: "linus.m.muema@gmail.com",
        Password: "Barralle0.",
        To: 'linus.m.muema@gmail.com',
        From: mail,
        Subject: "Finance tracker : "+ concern,
        Body: message
     }).then(function(response){
         if(response == "OK"){
             $('form')[0].reset();
         }
     });
}
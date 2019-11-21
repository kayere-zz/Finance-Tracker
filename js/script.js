$(document).ready(function(){
    $(".btn-login").on('click', function(){validate()});
});

function validate(){
    let mail = $("#mail").val();
    let pass = $("#pass").val();

    if(mail == "" || pass == ""){
        console.log("A field is empty")
    }
    else{
        verify(mail, pass);
    }
}

function verify(mail, pass){
    mail = mail.toLowerCase();
    let arr = mail.split("@");
    let end = arr[0];
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info().then(function (info) {
       if(info.doc_count < 1){
           $(".user_err").show();
       }
       else{
           cont_verify(db, mail, pass)
       }
    })
}

function cont_verify(db, mail, pass){
    db.get(mail+"_id").then(function(doc){
        (doc.password !== pass)? $('.pass_err').show() : window.location.href = '/homepage.html';
    }); 
}
$(document).ready(function(){
    $(".btn-login").on('click', function(){validate()});
    var status = localStorage.getItem('logStatus');
    if (status=="loggedout"){
    alert("You have logged out. Please Login again")
}
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

let end;
function verify(mail, pass){
    mail = mail.toLowerCase();
    let arr = mail.split("@");
    end = arr[0].replace(/[^a-zA-Z0-9]/g, "");
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
        if(doc.password !== pass)
        $('.pass_err').show()
        else {
            localStorage.setItem('end', end);
            localStorage.setItem('mail',mail);
            localStorage.removeItem('logStatus');
            window.location.href = './homepage.html';
        }
    }); 
}
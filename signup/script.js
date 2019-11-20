$(document).ready(function(){
    $('.pass_err').hide();
    $('#btn-signup').on('click',function(){validate()});
});

function validate(){
    let first = $('#first_name').val();
    let last = $('#last_name').val();
    let mail = $('#Email').val();
    let pass = $('#Password').val();
    let pass_rpt =$('#confirm_password').val();
    
    if(first == "" || last == "" || mail == ""){
        console.log("A field is empty")
    }
    else if(pass != pass_rpt){
        $('.pass_err').show();
    }
    else{
        $('form')[0].reset();
        createDB(first, last, mail, pass);
    }
}

function createDB(first, last, mail, pass){
    let arr = mail.split("@");
    let end = arr[0];
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info() 

    let user = {
        "_id": mail+"_id",
        "first_name": first,
        "last_name": last,
        "email": mail,
        "password" : pass
    }

    db.put(user).then(function(){
        window.location.href = '/homepage.html';
    });
}

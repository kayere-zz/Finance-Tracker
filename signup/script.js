
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
    localStorage.setItem('end', end);
    localStorage.setItem('mail', mail);
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info() 

    let user = {
        "_id": mail+"_id",
        "first_name": first,
        "last_name": last,
        "email": mail,
        "password" : pass
    }

    let school_fees = {
        "_id": "school_fees",
        "amount": 0
    }

    let loans = {
        "_id": "loans",
        "amount": 0
    }

    let food = {
        "_id": "food",
        "amount": 0
    }
    var salary = {
        "_id": "salary",
        "amount": 0
    }
    var business = {
        "_id": "business",
        "amount": 0
    }
    var debts = {
        "_id": "debts",
        "amount": 0
    }

    let income_total = {
        "_id" : "income_total",
        "totals": []
    }

    let expenditure_total = {
        "_id" : "expenditure_total",
        "totals": []
    }

    let all_months = {
        "_id" : "months",
        "months" : []
    }

    db.put(school_fees).then(function(){
        db.put(loans).then(function(){
            db.put(food).then(function(){ 
                db.put(user).then(function(){
                    db.put(salary).then(function(){
                        db.put(business).then(function(){
                            db.put(debts).then(function(){
                               db.put(income_total).then(function(){
                                   db.put(expenditure_total).then(function(){
                                        db.put(all_months).then(function(){
                                            window.location.href = '/homepage.html';
                                        });
                                   });
                               });
                            });
                        });
                    });
                });
            });
        });
    });
}

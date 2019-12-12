var status = localStorage.getItem('logStatus');
if (status=="loggedout"){
    window.location.href = 'index.html';
}

$(document).ready(function(){
    var end = localStorage.getItem('end');
    var user= localStorage.getItem('user');
    $('#log').append(user);
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info();

    function blink_text(){
        $('.total').fadeOut(500);
        $('.total').fadeIn(500);
    }
    setInterval(blink_text, 1000);

    $('.btn').on('click', function(){
        var selected= $('#select').val();
        var amount= $('#amount').val();
        db.get(selected).then(function(doc){
            var new_amount=parseInt(doc.amount)+parseInt(amount);
            return db.put({
                _id: selected,
                _rev: doc._rev,
                amount: new_amount
            });
        }).then(function(){
            window.location.href = 'income.html';
        });

    });

    var salary, business,debts, total;

    db.get('salary').then(function(doc){
        salary = doc.amount;
        $('#salary').append(salary);
        db.get('business').then(function(doc){
            business = doc.amount;
            $('#business').append(business);
            db.get('debts').then(function(doc){
                debts=doc.amount;
                $('#debts').append(debts);
                total= parseInt(salary)+parseInt(business)+parseInt(debts);
                $('#total').append(total);
            })
        })
    })
   
});

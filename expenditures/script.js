var status = localStorage.getItem('logStatus');
$("#school_fees").hide();
$('#loans').hide();
$('#food').hide();
$("#total").hide();
if (status=="loggedout"){
    window.location.href = 'index.html';
}

$(document).ready(function(){
    var user= localStorage.getItem('user');
    $('#log').append(user);
    let end = localStorage.getItem("end");
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info()

    let sch_fees,loans,food, total;
        
    db.get('school_fees').then(function(doc){
        sch_fees = doc.amount;
        db.get('loans').then(function(doc){
            loans = doc.amount;
            db.get('food').then(function(doc){
                food = doc.amount;
                total = parseInt(sch_fees)+parseInt(loans)+parseInt(food);
                $("#school_fees").append(sch_fees);
                $('#loans').append(loans);
                $('#food').append(food);
                $("#total").append(total);
                $("#school_fees").show("fast", function(){
                    $('#loans').show("fast", function(){
                        $('#food').show("fast", function(){
                            $("#total").show("fast");
                        });
                    });
                });
            });
        });
    
    })

    function blink_text(){
        $('.total').fadeOut(500);
        $('.total').fadeIn(500);
    }
    setInterval(blink_text, 1000);

    $('.btn-submit').on('click', function(){validate()});
});

function validate(){
   let category = $('.mdb-select').val()
   let amount = $('#amount').val()

   if(category == null || amount == ""){
       console.log("error in fields")
   }
   else{
       $('form')[0].reset();
       $(".modal").modal('toggle');
       addDoc(category, amount)
   }
}

function addDoc(category, amount){
    let end = localStorage.getItem("end");
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info()

    let db_amount;
    let new_amount;
    
    db.get(category).then(function(doc) {
        db_amount = doc.amount;
        new_amount = parseInt(db_amount) + parseInt(amount);

        return db.put({
          _id: category,
          _rev: doc._rev,
          amount : new_amount
        });
      }).then(function(response) {
       console.log(response);
       window.location.href = "./expenditures.html";
      }).catch(function (err) {
        console.log(err);
      });
}

var mail= localStorage.getItem('mail');
if (mail==null){
  localStorage.setItem('logStatus', "loggedout");
  window.location.href = 'index.html';
}

$(document).ready(function() {
    var name, firstName, lastName;
    var end= localStorage.getItem('end');
    var db= new PouchDB('http://localhost:5984'+end);
    db.info();
    username(db, mail);
  });

  function username(db, mail){
    db.get(mail+"_id").then(function(doc){
      firstName= doc.first_name;
      lastName= doc.last_name;
      name= firstName+' '+lastName;
      localStorage.setItem('user',name);
      $('#log').append(name);
      });
    animation();

    $("#clear").on("click", function(){
      localStorage.removeItem('end');
      localStorage.removeItem('mail');
      localStorage.removeItem('user');
      window.location.href ='index.html'
    })
  }

  function animation(){
    $("#home").animate({bottom: "27px"}, 100,function(){
      $("#expenditure").animate({bottom: "10px"}, 100, function(){
        $("#home").animate({top: "0px"}, 100, function(){
          $("#income").animate({bottom: "10px"}, 100, function(){
            $("#expenditure").animate({top: "0px"}, 100, function(){
              $("#reports").animate({bottom: "10px"}, 100, function(){
                $("#income").animate({top: "0px"}, 100, function(){
                  $("#feedback").animate({bottom: "10px"}, 100, function(){
                    $("#reports").animate({top: "0px"}, 100, function(){
                      $("#logout").animate({bottom: "10px"}, 100, function(){
                        $("#feedback").animate({top: "0px"}, 100, function(){
                          $("#logout").animate({top: "0px"}, 100);
                            $("#log").animate({marginLeft: '330px'},"fast");
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
    });
  }
  
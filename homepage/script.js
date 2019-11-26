$(document).ready(function() {
    var name, firstName, lastName;
    var end= localStorage.getItem('end');
    var mail= localStorage.getItem('mail');
    var db= new PouchDB('http://localhost:5984'+end);
    db.info();
    username(db, mail);
  });

  function username(db, mail){
    db.get(mail+"_id").then(function(doc){
      console.log(doc);
      firstName= doc.first_name;
      lastName= doc.last_name;
      name= firstName+' '+lastName;
      localStorage.setItem('user',name);
      $('#log').append(name); 
    });
  }
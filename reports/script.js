$(document).ready(function(){
    var user= localStorage.getItem('user');
    $('#log').append(user);
    
    let end = localStorage.getItem('end');
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info().then(function(info){
        getExpenditures(db);
        getIncome(db);
        previous_reportChart(db);
    });

    $("#get_report").on('click', function(){
        updateInc(db);
    });

    $("#btn_target").on('click', function(){
        getTarget(db);
    });
});

function getIncome(db){
    let salary, debts, business;
    db.get('salary').then(function(doc){
        salary= doc.amount;
        db.get('business').then(function(doc){
            business= doc.amount;
            db.get('debts').then(function(doc){
                debts= doc.amount;
                income_tots = parseInt(salary)+parseInt(debts)+parseInt(business);
                localStorage.setItem("income_tots", income_tots)
                incomeChart(salary, debts, business);
            });
        });
    });
}

function getExpenditures(db){
    let food,fees,loan;
    db.get("loans").then(function(doc){
        loan = doc.amount;
        db.get("food").then(function(doc){
            food = doc.amount
            db.get("school_fees").then(function(doc){
                fees = doc.amount;
                expenditure_tots = parseInt(fees)+parseInt(loan)+parseInt(food);
                localStorage.setItem("expenditure_tots", expenditure_tots)
                expenditureChart(fees, loan, food);
            });
        });
    });
}

function incomeChart(salary,debts,business){
    //bar
var ctxB = $('#income');
var myBarChart = new Chart(ctxB, {
type: 'bar',
data: {
labels: ["Salary", "Debts", "Business"],
datasets: [{
label: '',
data: [salary, debts, business],
backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(75, 192, 192, 0.2)'
],
borderColor: [
'rgba(255,99,132,1)',
'rgba(54, 162, 235, 1)',
'rgba(75, 192, 192, 1)'
],
borderWidth: 1
}]
},
options: {
scales: {
yAxes: [{
ticks: {
beginAtZero: true
}
}]
}
}
});
}

function expenditureChart(fees, loan, food){
    //bar
var ctxB = $('#expenditure');
var myBarChart = new Chart(ctxB, {
type: 'bar',
data: {
labels: ["School fees", "Loans", "Food"],
datasets: [{
label: '',
data: [fees, loan, food],
backgroundColor: [
'rgba(255, 206, 86, 0.2)',
'rgba(200, 180, 72, 0.2)',
'rgba(255, 159, 64, 0.2)'
],
borderColor: [
'rgba(255, 206, 86, 1)',
'rgba(75, 192, 192, 1)',
'rgba(255, 159, 64, 1)'
],
borderWidth: 1
}]
},
options: {
scales: {
yAxes: [{
ticks: {
beginAtZero: true
}
}]
}
}
});
}

function previous_reportChart(db){
    let months, inc_data, exp_data;
    db.get("months").then(function(doc){
        months = doc.values;
        db.get("income_total").then(function(doc){
            inc_data = doc.values;
            db.get("expenditure_total").then(function(doc){
                exp_data = doc.values;
                populateChart(months, inc_data, exp_data);
            });
        });
    });
}

function populateChart(months, inc_data, exp_data){
    var ctx = $('#previous_income');
    var data = {
    labels: months,
    datasets: [
        {
            label: "Total Income",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255,99,132,1)',
            borderWidth: 1,
            data: inc_data
        },
        {
            label: "Total Expenditure",
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: exp_data
        },
    ]
};

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        barValueSpacing: 20,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        }
    }
});
}

function updateInc(db){
    let income_total;
    let income_tots = localStorage.getItem('income_tots');
    db.get('income_total').then(function(doc){
       income_total = doc.values;
       income_total.push(parseInt(income_tots));
       return db.put({
           _id: doc._id,
           _rev: doc._rev,
           values: income_total
       }).then(function(response){
           if(response.ok){
             updateExp(db)
           }
       });
    });

}

function updateExp(db){
    let expenditure_total;
    let expenditure_tots = localStorage.getItem('expenditure_tots');
    db.get("expenditure_total").then(function(doc){
        expenditure_total = doc.values;
        expenditure_total.push(parseInt(expenditure_tots));
        return db.put({
            _id: doc._id,
            _rev: doc._rev,
            values: expenditure_total
        }).then(function(response){
            if(response.ok){
               updateMonths(db)
            }
        });
    });
}

function updateMonths(db){
    let month = moment().format('MMMM YYYY');
    let months;
    db.get("months").then(function(doc){
        months = doc.values;
        months.push(month); 
        return db.put({
            _id : doc._id,
            _rev: doc._rev,
            values : months
        }).then(function(response){
            if(response.ok){
                sendMail(month, db);
            }
        });
    });
}

function sendMail(month, db){
    var mail= localStorage.getItem('mail');
    let total_inc = localStorage.getItem("income_tots");
    let total_exp = localStorage.getItem("expenditure_tots");

    Email.send({
        Host: "smtp.gmail.com",
        Username: "linus.m.muema@gmail.com",
        Password: "Barralle0.",
        To: mail,
        From: "info@financetracker.com",
        Subject: "Finance tracker monthly summary ",
        Body: "<h1> The finance report of "+ month + "</h1>" + "<h2> Total Expenditure : "+total_exp+" </h2> <br>" + "<h2>Total Income : "+total_inc+"</h2>"
     }).then(function(response){
         if(response == "OK"){
             alert("Report sent to your email")
             resetDocs(db);
         }
     });
}

function resetDocs(db){
    let docs = ["business", "salary", "debts", "school_fees", "loans", "food", "target"];
    for(i = 0; i < docs.length; i++){
        db.get(docs[i]).then(function(doc){
            db.put({
                _id : doc._id,
                _rev : doc._rev,
                amount : 0
            }).then(function(response){
                if(response.ok){
                   window.location.href = "./reports.html"
                }
            });
        });
    }
}

function getTarget(db){
    let target = $("#target").val();
    $("form")[0].reset();
    $(".target_div").hide();
    db.get("target").then(function(doc){
        return db.put({
            _id : doc._id,
            _rev: doc._rev,
            amount: target
        });
    });

    $("#target_text").append("Your target is "+ target);
}
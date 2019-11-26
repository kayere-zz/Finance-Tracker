$(document).ready(function(){
    var user= localStorage.getItem('user');
    $('#log').append(user);
    previous_reportChart();
    let food, fees, loan, salary, debts, business;
    let end = localStorage.getItem('end');
    let db = new PouchDB('http://localhost:5984/'+end);
    db.info().then(function(info){
        getExpenditures(db);
        getIncome(db);
    });
});

function getIncome(db){
    db.get('salary').then(function(doc){
        salary= doc.amount;
        db.get('business').then(function(doc){
            business= doc.amount;
            db.get('debts').then(function(doc){
                debts= doc.amount;
                incomeChart(salary, debts, business);
            });
        });
    });
}

function getExpenditures(db){
    db.get("loans").then(function(doc){
        loan = doc.amount;
        db.get("food").then(function(doc){
            food = doc.amount
            db.get("school_fees").then(function(doc){
                fees = doc.amount;
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

function previous_reportChart(){
    var ctx = $('#previous_income');

var data = {
    labels: ["August", "September", "October"],
    datasets: [
        {
            label: "Total Income",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255,99,132,1)',
            borderWidth: 1,
            data: [30000,70000,40000]
        },
        {
            label: "Total Expenditure",
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: [40000,20000,50000]
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

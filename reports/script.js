$(document).ready(function(){
    incomeChart();
    expenditureChart();
    previous_incomeChart();
    previous_expenditureChart();
});

function incomeChart(){
    //bar
var ctxB = $('#income');
var myBarChart = new Chart(ctxB, {
type: 'bar',
data: {
labels: ["Salary", "Debts", "Business"],
datasets: [{
label: '',
data: [5000, 20000, 60000],
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

function expenditureChart(){
    //bar
var ctxB = $('#expenditure');
var myBarChart = new Chart(ctxB, {
type: 'bar',
data: {
labels: ["School fees", "Loans", "Food"],
datasets: [{
label: '',
data: [70000, 10000, 40000],
backgroundColor: [
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
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

function previous_income(){

}

function previous_expenditureChart(){
    
}
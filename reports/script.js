$(document).ready(function(){
    incomeChart();
    expenditureChart();
    previous_reportChart();
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
'rgba(255, 206, 86, 0.2)',
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

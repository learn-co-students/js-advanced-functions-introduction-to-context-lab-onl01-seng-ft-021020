// Your code here
function createEmployeeRecord(ray) {
    let employee = {
        firstName: ray[0],
        familyName: ray[1],
        title: ray[2],
        payPerHour: ray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employee
}

function createEmployeeRecords(rayRay) {
    let employees = rayRay.map(e => createEmployeeRecord(e))
    return employees
}

function createTimeInEvent(emp, dateTime) {
    let [date, hour] = dateTime.split(" ")

    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return emp 
}

function createTimeOutEvent(emp, dateTime) {
    let [date, hour] = dateTime.split(" ")

    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return emp 
}

function hoursWorkedOnDate(emp, date) {
    let startTime = emp.timeInEvents.find(element => element.date === date)
    let endTime = emp.timeOutEvents.find(element => element.date === date)
    let hoursWorked = (endTime.hour - startTime.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate (emp, date) {
    let payOwed = hoursWorkedOnDate(emp, date) * emp.payPerHour
    return payOwed
}

function allWagesFor(emp) {
    let datesWorked = emp.timeInEvents.map(function(e) {
        return e.date
    })

    let totalPay = datesWorked.reduce(function(memo, day){
        return memo + wagesEarnedOnDate(emp, day)
    }, 0)

    return totalPay
}

function findEmployeeByFirstName (ray, firstName) {
    let emp = ray.find(e => e.firstName === firstName)
    return emp
}

function calculatePayroll(empRay) {
    let totalPay = empRay.reduce(function(memo, emp){
        return memo + allWagesFor(emp)
    }, 0)

    return totalPay
}
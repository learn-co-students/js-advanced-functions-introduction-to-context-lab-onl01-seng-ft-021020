// Your code here
function createEmployeeRecord(employeeArray) {
    const employeeObject = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObject;
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, dateStamp) {
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    employeeObj.timeInEvents.push(timeInObject);
    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp) {
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    employeeObj.timeOutEvents.push(timeOutObject);
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateString) {
    const start = employeeObj.timeInEvents.find(event => event.date === dateString).hour
    const end = employeeObj.timeOutEvents.find(event => event.date === dateString).hour

    return (end - start)/100
}

function wagesEarnedOnDate(employeeObj, dateString) {
    return hoursWorkedOnDate(employeeObj, dateString) * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
    const allWages = employeeObj.timeInEvents.map((day) => {return wagesEarnedOnDate(employeeObj, day.date)})
    return allWages.reduce((total, num) => total+num)
}

function calculatePayroll(employeesArray) {
    const allPay = employeesArray.map((employee) => {return allWagesFor(employee)})
    return allPay.reduce((total, num) => total + num)
}

function findEmployeeByFirstName(employeesArray, firstNameString) {
    return employeesArray.find((employee) => employee.firstName === firstNameString)
}
// Your code here
function createEmployeeRecord([name, surname, title, hourRate]) {
  return {
    firstName: name,
    familyName: surname,
    title: title,
    payPerHour: hourRate,
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employerObj, dateTime) {
  let timeEvent = {
    type: "TimeIn",
    hour: Number(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0],
  };
  employerObj.timeInEvents.push(timeEvent);
  return employerObj;
}

function createTimeOutEvent(employerObj, dateTime) {
  let timeEvent = {
    type: "TimeOut",
    hour: Number(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0],
  };
  employerObj.timeOutEvents.push(timeEvent);
  return employerObj;
}

function hoursWorkedOnDate(employerObj, date) {
  let startTime = employerObj.timeInEvents.find((obj) => obj.date == date).hour;
  let endTime = employerObj.timeOutEvents.find((obj) => obj.date == date).hour;
  return (endTime - startTime) / 100;
}

function wagesEarnedOnDate(employerObj, date) {
  let hours = hoursWorkedOnDate(employerObj, date);
  let payPerHour = employerObj.payPerHour;
  return hours * payPerHour;
}

function allWagesFor(employerObj) {
  let daysWorked = employerObj.timeInEvents.map((event) => event.date);
  let total = daysWorked.reduce((sum, day) => {
    return sum + wagesEarnedOnDate(employerObj, day);
  }, 0);
  return total;
}

function findEmployeeByFirstName(array, firstName) {
  let output = array.find((employee) => employee.firstName == firstName);
  return output;
}

function calculatePayroll(array) {
  return array.reduce((sum, employerObj) => {
    return sum + allWagesFor(employerObj);
  }, 0);
}

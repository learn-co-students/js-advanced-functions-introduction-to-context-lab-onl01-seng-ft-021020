// Your code here
const testemp = ["matt", "edwards", "worker", 50]
const testin = "2014-08-05 1400"
const testout = "2014-08-05 1800"

const me = createEmployeeRecord(testemp)
createTimeInEvent(me, testin)
createTimeOutEvent(me, testout)

function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map( emp => createEmployeeRecord(emp))
}

function createTimeInEvent(emp, date) {
  emp.timeInEvents.push(Object.assign({}, {type: "TimeIn", hour: getHour(date), date: date.split(' ')[0] }))
  return emp
}

function getHour(stamp) {
  return parseInt(stamp.split(' ')[1])
}

function createTimeOutEvent(emp, date) {
  emp.timeOutEvents.push(Object.assign({}, {type: "TimeOut", hour: getHour(date), date: date.split(' ')[0] }))
  return emp
}

function hoursWorkedOnDate(emp, findDate) {
  let tindex = emp.timeInEvents.findIndex(el => el.date === findDate)
  return (parseInt(emp.timeOutEvents[tindex].hour) - parseInt(emp.timeInEvents[tindex].hour))/100
}

function wagesEarnedOnDate(emp, date) {
  return emp.payPerHour * hoursWorkedOnDate(emp, date)
}

function allWagesFor(emp) {
  return emp.timeInEvents.reduce( (total, el) => (total += wagesEarnedOnDate(emp, el.date)), 0)
}

function findEmployeeByFirstName(srcArray, name) {
  return srcArray.find( el => el.firstName === name )  
}

function calculatePayroll(emps) {
  return emps.reduce(((total, el) => total += allWagesFor(el)), 0)
}

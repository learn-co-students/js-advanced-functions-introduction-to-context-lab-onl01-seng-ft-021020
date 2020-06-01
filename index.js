let createEmployeeRecord = function(employee) {
   let timeInEvents = []
   let timeOutEvents = []

   const record = {
       firstName: employee[0], 
       familyName: employee[1],
       title: employee[2],
       payPerHour: employee[3],
       timeInEvents: timeInEvents,
       timeOutEvents: timeOutEvents
   }
  return record
}

let createEmployeeRecords = function(employees) {
   return employees.map(function(employee){
       return createEmployeeRecord(employee)
   })
}

let createTimeInEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    } 
    employee.timeInEvents.push(timeIn)
    return employee
}

let createTimeOutEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(hour,10), 
        date: date
    } 
    employee.timeOutEvents.push(timeOut)
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    const timeInDate = employee.timeInEvents.find(obj => obj.date === date)
    const timeOutDate = employee.timeOutEvents.find(obj => obj.date === date)

    let hoursWorked = (timeOutDate.hour - timeInDate.hour) / 100 

    return hoursWorked 
}

let wagesEarnedOnDate = function(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
}

let allWagesFor = function(employee) {
   const employeeDates = employee.timeInEvents.map(event => {return event.date})

   const wagesPayable = employeeDates.reduce(function(accumulator, d){
    return accumulator + wagesEarnedOnDate(employee, d)
    }, 0)

    return wagesPayable
}

let findEmployeeByFirstName = function(employeesArray, firstName) {
    return employeesArray.find(employee => employee.firstName === firstName)
}

// calculatePayroll
// Argument(s)
// Array of employee records
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
// Amount should be returned as a number.

let calculatePayroll = function(employeesArray) {
    return employeesArray.reduce(function(accumulator, employee){
        return accumulator + allWagesFor(employee)
    }, 0)
} 
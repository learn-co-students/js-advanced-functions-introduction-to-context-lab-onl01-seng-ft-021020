function createEmployeeRecord(array){
    const info ={
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: [] 
    }

    // const {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents} = array

    return info
}

function createEmployeeRecords(array){

    let newArray = array.map(element=> createEmployeeRecord(element))
    return newArray

}

function createTimeInEvent(record, dateStamp){

    const timeIn = "TimeIn"
    let newObject = {
        type: timeIn, 
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    
    record.timeInEvents.push(newObject)
    return record

}

function createTimeOutEvent(record, dateStamp){
    const timeOut = "TimeOut"
    let newObject = {
        type: timeOut, 
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    
    record.timeOutEvents.push(newObject)
    return record
}

function hoursWorkedOnDate(record, date){
    // debugger
    let index = record.timeInEvents.findIndex(element => element.date === date)
    let hours
    hours = record.timeOutEvents[index].hour - record.timeInEvents[index].hour
    return hours/100
}

function wagesEarnedOnDate(record, date){

    let hours = hoursWorkedOnDate(record, date)
    let wages = record.payPerHour * hours
    return wages
}

function allWagesFor(record){
    //debugger
    const wages = record.timeInEvents.map((day)=> {return wagesEarnedOnDate(record, day.date)})
    return wages.reduce((acc,cv)=> acc+cv)
}

function findEmployeeByFirstName(srcArray, firstName){

    let result = srcArray.find(record => record.firstName === firstName)

    return result

}

function calculatePayroll(array){
    const all = array.map(employee => {return allWagesFor(employee)})
    return all.reduce((acc, cv)=> acc+cv)
}

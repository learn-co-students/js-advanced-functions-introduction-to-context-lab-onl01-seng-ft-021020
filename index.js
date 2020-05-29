function createEmployeeRecord(array){
    let record
    return record = { 
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return employee
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeOutEvent(employee, dateStamp){
    employee.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return employee
}
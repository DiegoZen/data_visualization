export function calculateAvg(dataArray) {
    var sum = null
    dataArray.forEach(element => {
      sum += element.y
    });
    const avg = (sum/dataArray.length).toFixed(1)
    return avg
  }

export function readableData(data) {
    const date = new Date(data.x).toLocaleTimeString()
    return {name: data.name, x:date , y: data.y};
  }

export default {calculateAvg, readableData}
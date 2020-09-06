const API_URL = 'http://localhost:3000/metrics'

class API {
    fetchMetrics = async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        const mappedData = data.map(function(x) {
          const timestamp = new Date(x.created_at).getTime()
          return {name: x.name, x:timestamp , y: x.value};
       });
       return mappedData
    }

    postMetric = async (data) => {
        fetch(API_URL, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
}

export default API;
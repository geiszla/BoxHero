export function sendQuery (query, callback) {
  fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({query: query})
  }).then((response) => {
    return response.json().then((json) => {
      callback(json.data);
    });
  });
}

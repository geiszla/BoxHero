export default function sendQuery (query, isMutation, callback) {
  fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ query: `${isMutation ? 'mutation' : ''} { ${query} }` })
  }).then((response) => {
    return response.json().then((json) => {
      callback(json.data);
    });
  });
}

export default function sendQuery (query, isMutation, callback) {
  fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ query: `${isMutation ? 'mutation' : ''} { ${query} }` })
  }).then((response) => {
    return response.json().then((json) => {
      if (callback) callback(json.data);
    });
  });
}

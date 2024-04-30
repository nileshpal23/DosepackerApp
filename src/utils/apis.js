export async function postData(url = '', data = {}) {
    // Convert data object to URL-encoded string
    console.log('form data', data);
    const formData = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

    // Default options are marked with *
    console.log('post url ', url);
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im4yYmNxaGI4dnlLWmZmV0VJWXY0endwbmU0M1VKOU83Sm5rcVNlaTBDdFUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJkcC13ZWItYXBwIiwic3ViIjoidG9tc0BzcCIsInNjb3BlcyI6ImRwLWZ1bGwtc2NvcGUiLCJqdGkiOiI5MHkwa0FJMlVnYnlqTjRBVmZ1b2U0cTlsemRsby0wZVFEU2tPZjhSUU1jIiwic3RhdGUiOiJUUGxMQ3h1WnNleGxxS2FtTHlvZiIsImlzcyI6ImRwLWF1dGgiLCJpYXQiOjE3MTQzOTkyOTQsImV4cCI6MTcyMDM5OTI5NH0.Qte8Shsxl0B2zXwpc4BMphVrO6PAaxSva8pVItG8ymwokFJdotSOEn4BrCtvMapLM9RpOLgTYidEqSS7eHUQULqtiuWsIzotgY_IIppdqZCM_qn0p0MtKP59TkkkBvBkaqTx7aoqzPOH9_sCeXknAIVgo0LW8ObbNIFMFjMsrmQKQijcK295bMlA03cUwl-D_zwg5zGTETfwXEXNyBfa31UgvO9vpbjszTeGKbdAeC3bR_j8L6qTOD6uAPEULvWW9vFYwUzBbumKfIfGHxNL_pULgzp44bpPOkXmQlGFYDQjgHsG6wfZdUdUS3mi_RkYoP0L_YPUc5Dn7DDUSmnfug'
      },
      body: formData // body data type must match "Content-Type" header
    }); 
    return response.json(); // parses JSON response into native JavaScript objects
  }

export async function getData(url = '') {
  console.log('get url', url);
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im4yYmNxaGI4dnlLWmZmV0VJWXY0endwbmU0M1VKOU83Sm5rcVNlaTBDdFUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJkcC13ZWItYXBwIiwic3ViIjoidG9tc0BzcCIsInNjb3BlcyI6ImRwLWZ1bGwtc2NvcGUiLCJqdGkiOiI5MHkwa0FJMlVnYnlqTjRBVmZ1b2U0cTlsemRsby0wZVFEU2tPZjhSUU1jIiwic3RhdGUiOiJUUGxMQ3h1WnNleGxxS2FtTHlvZiIsImlzcyI6ImRwLWF1dGgiLCJpYXQiOjE3MTQzOTkyOTQsImV4cCI6MTcyMDM5OTI5NH0.Qte8Shsxl0B2zXwpc4BMphVrO6PAaxSva8pVItG8ymwokFJdotSOEn4BrCtvMapLM9RpOLgTYidEqSS7eHUQULqtiuWsIzotgY_IIppdqZCM_qn0p0MtKP59TkkkBvBkaqTx7aoqzPOH9_sCeXknAIVgo0LW8ObbNIFMFjMsrmQKQijcK295bMlA03cUwl-D_zwg5zGTETfwXEXNyBfa31UgvO9vpbjszTeGKbdAeC3bR_j8L6qTOD6uAPEULvWW9vFYwUzBbumKfIfGHxNL_pULgzp44bpPOkXmQlGFYDQjgHsG6wfZdUdUS3mi_RkYoP0L_YPUc5Dn7DDUSmnfug'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('get response', response);
    return response.json(); // parses JSON response into native JavaScript objects
  }
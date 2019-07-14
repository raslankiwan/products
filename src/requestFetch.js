export const postRequest = (url, data, method, callBackSuccess, callBackFail) => {
    let body = null;
    if (method !== 'GET') {
        body = JSON.stringify(data);
    } 
    
    return fetch(url, {
        method: method,
        body,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    })
    .then(response => response.json())
    .then(json => {  
        if (json.result === 'success') {
            callBackSuccess(json) 
        } else if (json.result === 'failed') {
            callBackFail(json)
        }
    })
    .catch(error => console.log(error));
}
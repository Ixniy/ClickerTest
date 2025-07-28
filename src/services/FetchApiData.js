const API_URL = 'https://cuddly-umbrella-67jg9rqvr7g35r7g-80.app.github.dev';

export async function fetchApiData(str) {
    const response = await fetch(API_URL + str);
    const data = await response.json();
    return data;
}



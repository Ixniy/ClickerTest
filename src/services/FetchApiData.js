const API_URL = 'https://animated-invention-qgwq79j7w9vc9497-80.app.github.dev';

export async function fetchApiData(str) {
    const response = await fetch(API_URL + str);
    const data = await response.json();
    return data;
}



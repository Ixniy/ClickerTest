const API_URL = 'https://redesigned-acorn-gwgq45jxqv4hpq4-80.app.github.dev';

export async function fetchApiData(str) {
    const response = await fetch(API_URL + str);
    const data = await response.json();
    return data;
}



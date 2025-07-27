const API_URL = 'https://bug-free-halibut-r474gvjr4wh6pg-80.app.github.dev';

export async function fetchApiData(str) {
    const response = await fetch(API_URL + str);
    const data = await response.json();
    return data;
}



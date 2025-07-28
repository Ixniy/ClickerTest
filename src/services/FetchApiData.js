const API_URL = 'https://cuddly-umbrella-67jg9rqvr7g35r7g-80.app.github.dev';

export async function fetchApiData(str) {
    try {
        const response = await fetch(API_URL + str);
        if (!response.ok) {
            throw new Error(`Ошибка, бро! чекни: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Не зафетчилось', err);
    }


}



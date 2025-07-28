const API_URL = 'https://bookish-bassoon-gwgq45jx4x6fpwqx-80.app.github.dev';

export async function fetchApiData(str, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(API_URL + str, options);
        if (!response.ok) {
            throw new Error(`Ошибка, бро! чекни: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Не зафетчилось', err);
        throw err;
    }


}



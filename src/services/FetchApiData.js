const API_URL = 'https://ominous-palm-tree-44g65ww4pwx27pxx-8000.app.github.dev/api/users/';

export async function fetchApiData() {
    const response = await fetch(API_URL);
    const data = response.json();
    return {
        data
    }
}



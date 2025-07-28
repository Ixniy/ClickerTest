import { useState } from 'react';
import { fetchApiData } from '../services/FetchApiData';

export function usePostApiData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postData = async (url, body) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchApiData(url, 'POST', body);
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error, data};
}
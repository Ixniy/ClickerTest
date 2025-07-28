import {useEffect, useState} from 'react';
import { fetchApiData } from '../services/FetchApiData';

export function useApiData(str) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!str) return;
        const loadData = async () => {
            try {
                const result = await fetchApiData(str);
                setData(result);
            }
            catch (err) {
                setError(err.message);
            }
        };

        loadData();
    }, [str]);

    return {data, error};

}
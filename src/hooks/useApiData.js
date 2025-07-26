import {useEffect, useState} from 'react';
import { fetchApiData } from '../services/FetchApiData';

export function useApiData(str) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchApiData(str);
            setData(result);
        };

        loadData();
    }, [str]);


    return data;

}
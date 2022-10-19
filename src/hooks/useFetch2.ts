import axios, { AxiosError } from 'axios';
import config from '../assets/config/config.json'
import { useState, useEffect } from 'react';

export const useFetch2 =  (url: string, params?: any) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const result = await (await axios.get(config.api + url, { params, signal: controller.signal })).data;
                setResponse(result)
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }

        }
        fetchData();
        return () => {
            controller.abort();
        }
    }, []);
    return [response, error, loading]
}
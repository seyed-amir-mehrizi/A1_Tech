import axios, { AxiosError } from 'axios';
import config from '../assets/config/config.json'
import { useState, useEffect } from 'react';

export const useFetch = (url: string, params?: any) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const controller = new AbortController();
    useEffect(() => {
        fetchData();
        return () => {
            controller.abort();
        }
    }, []);
    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await (await axios.get(config.api + url, { params, signal: controller.signal })).data;

            setResponse(result)
        } catch (error: any) {
            if (error instanceof AxiosError) {
                setError(error.message);

            }
        } finally {
            setLoading(false)
        }

    }
    return [response, error, loading, fetchData]
}
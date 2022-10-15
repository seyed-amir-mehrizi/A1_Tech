import axios from 'axios';
import config from '../assets/config/config.json'

export const useFetch = async (url: string) => {
    try {
        const result = await (await axios.get(config.api + url)).data;
        return result
    } catch (error) {
        
    }
}
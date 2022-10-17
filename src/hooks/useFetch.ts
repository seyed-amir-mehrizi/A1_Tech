import axios from 'axios';
import config from '../assets/config/config.json'

export const useFetch = async (url: string , params?:any) => {
    try {
        const result = await (await axios.get(config.api + url , {params})).data;
        return result
    } catch (error) {
        
    }
}
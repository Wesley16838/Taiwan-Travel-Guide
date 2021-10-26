import API from '../api'
import { useState, useEffect } from 'react';
// temp type
export const useFetch = (url: string, initialData: any, params: object) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const loadData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          let result = await API.get( url, {
            params: params
          });
          setData(result);
        } catch(error) {
          setIsError(true);
        }
        
        setIsLoading(false);
      }
  
      loadData();
    }, []);
  
    return [data, isLoading, isError];
  }
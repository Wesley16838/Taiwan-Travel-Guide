import API from '../api'
import { useState, useEffect } from 'react';
import { useTourisms } from "../context/tourismProvider"; //Activity

// temp type
export const useFetch = (url: string, initialData: any, params: object, fn: any, name?: any, ref?: any) => {
    const [isError, setIsError] = useState(false);
    const { addLoading } = useTourisms()

    useEffect(() => {
      const loadData = async () => {
        setIsError(false);
        addLoading(true);
        try {
          let result = await API.get( encodeURI(url), {
            params: params
          });
          fn(name as string, result.data)
        } catch(error) {
          setIsError(true);
        }
        addLoading(false)
      }
      loadData();
    }, [ref]);
  }
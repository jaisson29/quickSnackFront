import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/Auth/Autenticacion';
import axios from 'axios';

function useFetch(url: string) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { instance }: any = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: any = await instance.get(url);
				if (response.status !== 200 || response.status !== 204) {
					throw new Error('Network response was not ok');
				}
				const data: any = await response;
				setData(data);
			} catch (error: any) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, instance]);

	return { data, isLoading, error };
}

export default useFetch;


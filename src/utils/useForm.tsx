/** @format */

import { useState } from 'react';

const useForm = () => {
	const [form, setForm]: any = useState({});
	const [files, setFile]: any = useState([]);

	const handleForm = (event: any) => {
		if (event.target.type === 'file') {
			setFile([...files, ...event.target.files]);
		} else {
			setForm({
				...form,
				[event.target.name]: event.target.value,
			});
		}
	};

	const getFormData = () => {
		const formData = new FormData();
		for (const key in form) {
			formData.append(key, form[key]);
		}
		if (files) {
			files.forEach((file: any, index: any) => {
				formData.append(`file${index}}`, file);
			});
		}
		return formData;
	};

	const resetForm = () => {
		setForm(new FormData());
		setFile(null);
	};
	return [form, handleForm, resetForm, getFormData];
};

export default useForm;


/** @format */

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
const QrCode = () => {
	const [url, setUrl] = useState('http://localhost:3000/');
	const downloadQRCode = (e) => {
		e.preventDefault();
		setUrl('http://localhost:3000/');
	};
	const qrCodeEncoder = (e) => {
		setUrl(e.target.value);
	};
	return (
		<div>
			<QRCodeSVG id='qrCode' value={url} size={300} bgColor={'#fff '} />
		</div>
	);
};
export default QrCode;

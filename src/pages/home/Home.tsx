import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
	useEffect(() => {
    nav('/menu')
  }, [nav]);
	return <div></div>;
}

export default App;


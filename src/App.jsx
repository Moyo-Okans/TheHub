import React from 'react';
import './App.css';
import AppRoutes from './router/route';


function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/hello')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data); // See it in browser console
  //       setMessage(data.message); // Display it on screen
  //     })
  //     .catch(err => console.error('Fetch error:', err));
  // }, []);

  return (
    <>
      {/* <h2>{message}</h2> Show message from backend */}
      <AppRoutes />
    </>
  );
}

export default App;

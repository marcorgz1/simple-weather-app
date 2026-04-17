import { useEffect, useState } from "react";
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect((city_name) => {
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${API_KEY}`)
        .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
  }, [])

  return (
    <main className="flex flex-col justify-center items-center gap-16">
      <h1 className="text-4xl">Conoce qué clima hace 🌤️</h1>
      <form>
        <input placeholder='Introduce una ciudad...' />
        <button className="text-white bg-purple-700 py-2 px-4 rounded">Enviar</button>
        <section>{data}</section>
      </form>
    </main>
  )
}

export default App;

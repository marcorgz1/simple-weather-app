import { useEffect, useState } from "react";
import axios from 'axios';
import { Search } from 'lucide-react';

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
      <div className="flex flex-col justify-center items-center gap-8 mb-6">
        <h1 className="text-4xl">Consulta el tiempo actual de tu ciudad 🌤️</h1>
        <h3>Busca cualquier ciudad y consulta las condiciones climatológicas al instante.</h3>
      </div>
      <form className="flex justify-center items-center gap-20">
        <input 
          placeholder='Introduce una ciudad...'
          className="h-9 min-w-0 rounded-md border border-gray-100/40 bg-transparent px-3 py-1 text-base shadow-xs w-md outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 
            focus-visible:ring-[3px] focus-visible:ring-gray-400/40" />
        <button className="flex items-center gap-4 text-white bg-slate-800 py-2 px-4 rounded">
          <Search />
          Buscar
        </button>
        <section>{data}</section>
      </form>
    </main>
  )
}

export default App;

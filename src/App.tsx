import { useEffect, useState } from "react";
import { Search } from 'lucide-react';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const response = await
    } catch (err) {
      
    }
  }, []);

  // Se utiliza 'ev: React.FormEvent<HTMLFormElement>' para indicar a TypeScript que estamos utilizando form submission
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Cambiar valor del estado "loading" a true ya que se está esperando a obtener los datos
    setLoading(true);

    // Limpiar posibles errores anteriores
    setError(null);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`);

      if(!response.ok) throw new Error('La ciudad no ha sido encontrada');

      const waeatherData = await response.json();
      console.log('Datos obtenidos: ', waeatherData);
      setData(waeatherData);
    } catch (err) {
      // Manejar errores al realizar la petición
      // Se utiliza 'instanceof Error' para indicar que la variable 'err' en un objeto de tipo 'Error' y así TypeScript sabe como manejarlo
      if (err instanceof Error) setError(`No se ha podido realizar la petición correctamente ${err.message}`);
    } finally {
      // Volver a cambiar el estado 'loading' a false ya que se ha terminado de realizar la petición
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-16">
      <div className="flex flex-col justify-center items-center gap-8 mb-6">
        <h1 className="text-4xl">Consulta el tiempo actual de tu ciudad 🌤️</h1>
        <h3>Busca cualquier ciudad y consulta las condiciones climatológicas al instante.</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-12">
        <input
          value={city}
          // Almacenar en el estado 'city' el contenido introducido en el input
          onChange={(ev) => setCity(ev.target.value)}
          placeholder='Introduce una ciudad...'
          className="h-9 min-w-0 rounded-md border border-gray-100/40 bg-transparent px-3 py-1 text-base shadow-xs w-md outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 
            focus-visible:ring-[3px] focus-visible:ring-gray-400/40" />
        <button type="submit" className="flex items-center gap-4 text-black bg-white cursor-pointer hover:bg-white/90 py-2 px-4 rounded-lg">
          <Search />
          {/* Si se está realizando la búsqueda añadir texto 'Buscando...' en el botón, 
          si no es así dejar el texto 'Buscar' */}
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {/* Sección para mostrar la información obtenida o los posibles errores existentes */}
      <section className="mt-6">
        {error && <p className="text-red-600">{error}</p>}
        {
          data ? (
            <section className="flex flex-col gap-16">
              <h2 className="text-4xl font-bold">🏙️ {data.name}</h2>
              <div className="flex flex-col gap-2">
                <p>🌡️ Temperatura máxima: {data.main.temp_max} ºC</p>
                <p>🌡️ Temperatura mínima: {data.main.temp_min} ºC</p>
                <p>💨 Velocidad viento: {data.wind.deg} km/h</p>
                <p>☔ Humedad: {data.main.humidity}%</p>
              </div>
            </section>
          ) : (
            <section className="flex flex-col justify-center items-center gap-8">
              <h3 className="text-4xl font-semibold">🌍 Escribe una ciudad</h3>
              <p className="text-white/60">Introduce el nombre de una ciudad para obtener su información.</p>
            </section>
          )
        }
      </section>
    </main>
  )
}

export default App;

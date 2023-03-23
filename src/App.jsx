import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {

  const [country , setCountry] = useState("Bangkok")
  const [dataWeather , setDataWeather] = useState([])
  const [weather , setWeather] = useState("")
  const [temp , setTemp] = useState("")
  const [sysCountry , setSysCountry] = useState("")
  const [windSpeed , setWindSpeed] = useState("")
  const [cloudiness , setCloudiness] = useState("")
  const [imageBG , setImageBG] = useState("")
  
  const apiKey_weather = "ca0204d365f1ce02aaf19abeb33d6ab7";
  const apiKey_image = "34658008-4c7cbc5ba10b5932fde73fdd4";

  async function getWeather() {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey_weather}`);
      const resultImage = await axios.get(`https://pixabay.com/api/?key=${apiKey_image}&q=${country}&image_type=photo&pretty=true`)
      setDataWeather(result.data)
      setWeather(result.data.weather[0])
      setTemp(result.data.main)
      setSysCountry(result.data.sys.country)
      setWindSpeed(result.data.wind.speed)
      setCloudiness(result.data.clouds.all)
      setImageBG(resultImage.data.hits[0].largeImageURL)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeather()
    setCountry("")
  },[]);

  // Date format "Monday, January 1"
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  options.weekday = options.weekday.replace(',', '');
  const formattedNewDate = new Intl.DateTimeFormat('en-US', options).format(date);

  function handleSubmit() {
    getWeather()
    setCountry("")
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      getWeather()
      setCountry("")
    }
  }

  return (
    <div className="App text-white">
          <div className='py-28 px-16 flex flex-col gap-16'>
          <div className="flex justify-center">
              <input type="search" id="default-search" className="w-1/3 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none max-lg:w-full" placeholder="Search Country..." required
              onChange={(e)=>{setCountry(e.target.value)}}
              value={country}
              onKeyDown={handleKeyDown}
              />
              <button type="button" className="p-4 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 outline-none"
              onClick={handleSubmit}
              >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
              </button>
              
          </div>     
              <div className='flex flex-col gap-2 max-md:items-center'>
                <div className='text-6xl max-sm:text-5xl'>{dataWeather.name}, {sysCountry}</div>
                <div className='text-2xl max-sm:text-xl'>{formattedNewDate}</div>
              </div> 
              <div className='flex flex-row flex-wrap justify-center gap-20'>
              <div className='container-left relative flex flex-row flex-wrap gap-5 items-center bg-white bg-opacity-5 shadow-md rounded-xl justify-center py-5 pr-5 bg-cover bg-center z-1 w-5/12 max-xl:w-full'
                style={{backgroundImage: `url(${imageBG})`}}>
                  <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="weather image"/>
                  <div className='flex flex-col'>
                    <p className='text-[120px] max-sm:text-6xl max-sm:mb-5'>{temp.temp}°C</p>
                    <p className='text-2xl max-sm:text-xl'>Feel like: {temp.feels_like}°C</p>
                    <p className='text-2xl max-sm:text-xl'>{weather.main}</p>
                  </div>
                </div>

                <div className='flex flex-row w-1/2 rounded-xl gap-10 p-10 flex-wrap shadow-md text-xl bg-white bg-opacity-5 justify-center max-xl:w-full'>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div className='text-5xl'>{temp.temp_max} °C</div>
                    <div className='text-gray-100 opacity-80'>Highest</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div className='text-5xl'>{temp.temp_min} °C</div>
                    <div className='text-gray-100 opacity-80'>Lowest</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div className='text-5xl'>{windSpeed} m/s</div>
                    <div className='text-gray-100 opacity-80'>Wind Speed</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div className='text-5xl'>{cloudiness}%</div>
                    <div className='text-gray-100 opacity-80'>Cloudiness</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div className='text-5xl'>{temp.humidity}%</div>
                    <div className='text-gray-100 opacity-80'>Humidity</div>
                  </div>
                </div>
              </div>        
          </div>
    </div>
  )
}

export default App

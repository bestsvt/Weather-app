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
  console.log(dataWeather);

  const apiKey = "ca0204d365f1ce02aaf19abeb33d6ab7";
  // const apiKey = process.env.REACT_APP_API_KEY;
  async function getWeather() {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`);
      setDataWeather(result.data)
      setWeather(result.data.weather[0])
      setTemp(result.data.main)
      setSysCountry(result.data.sys.country)
      setWindSpeed(result.data.wind.speed)
      setCloudiness(result.data.clouds.all)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getWeather()
  },[country]);

  // Date format "Monday, January 1"
  const date = new Date(); // Get the current date and time
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  options.weekday = options.weekday.replace(',', '');
  const formattedNewDate = new Intl.DateTimeFormat('en-US', options).format(date);

  function searchCountry(event) {
    event.preventDefault();
  }


  return (
    <div className="App text-white">
      
          <div className='p-10 flex flex-col gap-5'>

          <div className="relative mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" className="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Search Country..." required
              onChange={(e)=>{setCountry(e.target.value)}}
              value={country}
              ></input>
          </div>

              <div className='flex flex-col gap-2'>
                <div className='text-6xl'>{dataWeather.name}, {sysCountry}</div>
                <div className='text-2xl'>{formattedNewDate}</div>
              </div> 
              <div className='flex flex-row flex-wrap'>
                <div className='flex flex-row flex-wrap gap-5 items-center w-1/2 justify-center'>
                  <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="weather image" className='w-64' />
                  <div className='flex flex-col gap-4'>
                    <div className='text-[120px]'>{temp.temp}°C</div>
                    <div className='text-2xl'>Feel like: {temp.feels_like}°C</div>
                    <div className='text-2xl'>{weather.main}</div>
                  </div>
                </div>

                <div className='flex flex-row w-1/2 rounded-xl bg-transparent gap-10 p-10 flex-wrap shadow-md text-xl'>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div>{temp.temp_max} °C</div>
                    <div>Highest</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div>{temp.temp_min} °C</div>
                    <div>Lowest</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div>{windSpeed} m/s</div>
                    <div>Wind Speed</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div>{cloudiness}%</div>
                    <div>Cloudiness</div>
                  </div>
                  <div className='w-56 flex flex-col items-center justify-center'>
                    <div>{temp.humidity}%</div>
                    <div>Humidity</div>
                  </div>
                </div>
              </div>
              <div className='text-4xl'>
                Forcast
              </div>
            
            
          </div>
    </div>
  )
}

export default App

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch,} from 'react-icons/io';
import {BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudHaze2Fill} from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im'

const APIkey = '5c56ef35bf8c591551f2e3a547388588';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Toronto');
  const [inputValue, setInputValue] = useState ('');
  const [animate, SetAnimate] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  


  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {

    if (inputValue !== ''){
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if (input.value === ''){
      SetAnimate(true);
      setTimeout (()=> {
        SetAnimate(false);
      },500);
    }

    input.value = '';

    e.preventDefault();
  }

  useEffect (()=> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() =>{
        setData(res.data);
      },1);
    }).catch(err => {
      setErrorMsg(err)
    })
  },[location]);

  useEffect(()=> {
    const timer = setTimeout (() => {
      setErrorMsg('')
    },2000)
    return ()=> clearTimeout(timer);
  },[errorMsg])

  if (!data) {
    return (
      <div className='flex w-full h-screen items-center justify-center'>
        <div>
          <ImSpinner8 className='text-3xl animate-spin'/>
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy className='text-cyan-200' />
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill className='text-cyan-100' />
      break
    case 'Rainy':
      icon = <IoMdRainy className='text-blue-300' />
      break
    case 'Clear':
      icon = <IoMdSunny className='text-yellow-300' />
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-cyan-200'/>
      break
    case 'Snow':
      icon = <IoMdSnow className='text-gray-200'/>
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-slate-700'/>
      break
    case 'Mist':
      icon = <IoMdRainy className='text-cyan-200'/>
      break
  }

  const date = new Date();

  return ( 
  <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center 
    flex flex-col items-center justify-center px-4 lg-px-0'>
      {errorMsg && <div className='animate-shake py-2 px-3 absolute top-8 capitalize text-white bg-red-400 rounded-3xl'>{`${errorMsg.response.data.message}`}</div>}
    <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
      <div className='h-full relative flex items-center justify-between p-2'>
        <input 
        onChange={(e) => handleInput(e)} 
        className ='flex-1 bg-transparent outline-none placeholder:text-white
         text-white text-[15px] font-light pl-6 h-full' 
        type="text" 
        placeholder='Search by City or Country'/>
        <button onClick={(e) => handleSubmit(e)}
        className='text-white pr-6 text-xl hover:scale-125 hover:text-gray-300'><IoMdSearch /></button>
      </div>
    </form>
    {/*card*/}
    <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white 
    backdrop-blur-[32px] rounded-3xl py-12 px-6'>
      
      
      <div>
        {/*card top*/}
        <div className='flex rounded-3xl items-center'>
          <div className='text-[87px]'>{icon}</div>
            <div className='px-4'>
              <div 
                className='text-2xl font-bold'>{data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
              </div>
            </div>
        </div>
        {/*card body*/}
        <div className='my-20'>
          <div className='flex justify-center items-center'>
            <div className='text-[144px] leading-none'>{parseInt(data.main.temp)}</div>
            <div className='text-4xl'> <TbTemperatureCelsius /> </div>
          </div>
          <div className='capitalize text-center'>{data.weather[0].description}</div>
        </div>
        {/*card bottom*/}
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsEye />
              </div>
              <div>
                Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsThermometer />
              </div>
                <div className='flex'>
                  Feels like <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius /> 
                </div>
              </div>

            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWater />
              </div>
              <div>
                Humidity <span className='ml-2'>{data.main.humidity} %</span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <BsWind />
              </div>
                <div className='flex'>
                  Wind <span className='ml-2'>{data.wind.speed} m/s
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default App;

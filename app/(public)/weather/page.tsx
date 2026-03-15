"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  CloudRain, Cloud, Sun, CloudSnow, CloudLightning, 
  Wind, Droplets, ThermometerSun, MapPin, ChevronDown,
  Search, Sunrise, Sunset, Moon, CloudMoon, SunDim, CloudFog
} from "lucide-react";

const API_KEY = "7ad39889913d6faeca0817cd74ba1a17"; 

export default function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeatherData(28.4089, 77.3178); // Faridabad
        }
      );
    } else {
      fetchWeatherData(28.4089, 77.3178);
    }
  }, []);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setCurrentWeather(currentRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastRes.data.list);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`
      );
      
      const { lat, lon } = res.data.coord;
      await fetchWeatherData(lat, lon);
      setSearchQuery(""); 
    } catch (error) {
      alert("Location not found. Please try entering a valid City, State, Country, or Zip Code.");
      setLoading(false);
    }
  };

  const getDailyForecast = () => {
    if (!forecast) return [];
    const daily: any = {};
    forecast.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "2-digit" });
      if (!daily[date]) {
        daily[date] = { ...item, min: item.main.temp_min, max: item.main.temp_max };
      } else {
        daily[date].min = Math.min(daily[date].min, item.main.temp_min);
        daily[date].max = Math.max(daily[date].max, item.main.temp_max);
      }
    });
    return Object.values(daily).slice(0, 5); 
  };

  const getWeatherIcon = (item: any, size = 24) => {
    if (!item || !item.weather) return <Cloud size={size} className="text-gray-400" />;
    
    const weatherId = item.weather[0].id;
    const temp = item.main?.temp || 0;
    
    let isDay = true;
    let isSunrise = false;
    let isSunset = false;

    if (item.sys?.sunrise && item.sys?.sunset) {
      const now = item.dt;
      isDay = now >= item.sys.sunrise && now < item.sys.sunset;
      isSunrise = Math.abs(now - item.sys.sunrise) < 1800;
      isSunset = Math.abs(now - item.sys.sunset) < 1800;
    } else if (item.sys?.pod) {
      isDay = item.sys.pod === 'd';
    } else {
      const hour = new Date(item.dt * 1000).getHours();
      isDay = hour >= 6 && hour < 18;
    }

    if (weatherId >= 200 && weatherId <= 232) return <CloudLightning size={size} className="text-purple-500" />;
    if (weatherId >= 300 && weatherId <= 531) {
      if (temp < 0) return <CloudSnow size={size} className="text-sky-300" />; 
      return <CloudRain size={size} className="text-blue-500" />;
    }
    if (weatherId >= 600 && weatherId <= 622) return <CloudSnow size={size} className="text-white drop-shadow-md" />;
    if (weatherId >= 701 && weatherId <= 781) return <CloudFog size={size} className="text-gray-400" />;
    if (weatherId === 800) {
      if (isSunrise) return <Sunrise size={size} className="text-orange-400" />;
      if (isSunset) return <Sunset size={size} className="text-orange-500" />;
      if (!isDay) return <Moon size={size} className="text-indigo-200" />; 
      if (temp >= 35) return <ThermometerSun size={size} className="text-red-500 animate-pulse" />; 
      if (temp <= 10) return <SunDim size={size} className="text-yellow-100" />; 
      return <Sun size={size} className="text-yellow-400" />; 
    }
    if (weatherId > 800) {
      if (!isDay && weatherId === 801) return <CloudMoon size={size} className="text-indigo-300" />; 
      return <Cloud size={size} className="text-gray-300" />;
    }

    return <Cloud size={size} className="text-gray-300" />;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  if (loading || !currentWeather || !forecast) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-title)] flex flex-col items-center justify-center">
        <Sun className="animate-spin-slow text-yellow-400 mb-4" size={40} />
        Loading Weather Data...
      </div>
    );
  }

  const dailyData = getDailyForecast();
  const hourlyData = forecast.slice(0, 10);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-title)] p-4 md:p-8 transition-colors duration-300 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* TOP BAR: Toggle & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
          
          <div className="flex items-center gap-2 bg-[var(--bg-section)] p-1 rounded-full w-full md:w-fit">
            <button className="bg-[var(--bg-card)] text-[var(--text-title)] px-6 py-2 rounded-full font-semibold shadow-sm text-sm w-1/2 md:w-auto">Weather</button>
          </div>

          <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto bg-[var(--bg-section)] rounded-full px-4 py-2 border border-[var(--border-color)] focus-within:ring-2 focus-within:ring-blue-500 transition-shadow shadow-[var(--shadow-card)]">
            <Search size={18} className="text-[var(--text-muted)] mr-2" />
            <input 
              type="text" 
              placeholder="Search City, State, or Zip..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[var(--text-title)] text-sm w-full md:w-64"
            />
            <button type="submit" className="hidden">Search</button>
          </form>

        </div>

        {/* Hero Card */}
        <div className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center text-gray-900 shadow-[var(--shadow-card)] relative overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)' }}>
          
          <div className="z-10">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={24} className="text-blue-500" />
              <h1 className="text-2xl md:text-3xl font-bold">{currentWeather.name}, {currentWeather.sys.country}</h1>
            </div>
            <p className="text-sm font-medium capitalize text-gray-700 flex items-center gap-2">
              {getWeatherIcon(currentWeather, 20)}
              {currentWeather.weather[0].description}
            </p>
            <p className="text-sm text-gray-600 mt-2">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="text-right mt-6 md:mt-0 z-10">
            <h2 className="text-6xl md:text-7xl font-bold mb-2">{Math.round(currentWeather.main.temp)}°<span className="text-4xl">C</span></h2>
            <p className="text-sm font-semibold text-gray-700">Max {Math.round(currentWeather.main.temp_max)}° | Min {Math.round(currentWeather.main.temp_min)}°</p>
            <p className="text-sm text-gray-600 mt-1">Feels like {Math.round(currentWeather.main.feels_like)}°C</p>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div>
          <h3 className="text-lg font-bold mb-3">Hourly Forecast</h3>
          <div className="bg-[var(--bg-section)] rounded-2xl p-4 md:p-6 flex overflow-x-auto gap-6 hide-scrollbar shadow-[var(--shadow-card)] border border-[var(--border-color)]">
            {hourlyData.map((hr: any, i: number) => (
              <div key={i} className="flex flex-col items-center justify-center min-w-[70px] gap-2">
                <span className="text-[var(--text-title)] font-bold">{Math.round(hr.main.temp)}°</span>
                {getWeatherIcon(hr, 28)}
                {/* 👇 Added Weather Text for Hourly */}
                <span className="text-[var(--text-muted)] text-[11px] font-medium capitalize text-center leading-tight">
                  {hr.weather[0].main}
                </span>
                <span className="text-[var(--text-muted)] text-xs font-semibold">{formatTime(hr.dt)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sunrise / Sunset Card */}
        <div className="rounded-2xl p-6 flex justify-between items-center shadow-[var(--shadow-card)] border border-[var(--border-color)] relative overflow-hidden"
             style={{ background: 'linear-gradient(90deg, #fef3c7 0%, #1e3a8a 100%)' }}>
          <div className="flex items-center gap-3 z-10 text-gray-900">
            <Sunrise size={28} className="text-orange-500" />
            <div>
              <p className="text-xs font-semibold uppercase">Sunrise</p>
              <p className="text-2xl font-bold">{formatTime(currentWeather.sys.sunrise)}</p>
            </div>
          </div>
          
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-48 h-24 border-t-2 border-dashed border-white/50 rounded-t-full"></div>

          <div className="flex items-center gap-3 z-10 text-white text-right">
            <div>
              <p className="text-xs font-semibold uppercase text-blue-200">Sunset</p>
              <p className="text-2xl font-bold">{formatTime(currentWeather.sys.sunset)}</p>
            </div>
            <Sunset size={28} className="text-yellow-400" />
          </div>
        </div>

        {/* 2-Column Grid: 7-Day & Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Daily Forecast */}
          <div>
            <h3 className="text-lg font-bold mb-3">5-Day Forecast</h3>
            <div className="space-y-3">
              {dailyData.map((day: any, i: number) => {
                const parts = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: '2-digit' }).split(', ');
                return (
                  <div key={i} className="bg-[var(--bg-section)] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[var(--border-color)]">
                    <div className="w-1/3">
                      <p className="font-semibold text-[var(--text-title)]">{i === 0 ? "Today" : parts[0]}</p>
                      <p className="text-[var(--text-muted)] text-xs">{parts[1]}</p>
                    </div>
                    {/* 👇 Added Weather Text alongside Icon for 5-Day */}
                    <div className="w-1/3 flex flex-col md:flex-row items-center justify-center gap-2">
                      {getWeatherIcon(day, 28)}
                      <span className="text-xs font-medium text-[var(--text-muted)] capitalize text-center">
                        {day.weather[0].description}
                      </span>
                    </div>
                    <div className="w-1/3 text-right">
                      <span className="font-bold text-[var(--text-title)]">{Math.round(day.max)}°</span>
                      <span className="text-[var(--text-muted)] ml-2">{Math.round(day.min)}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Current Conditions Grid */}
          <div>
            <h3 className="text-lg font-bold mb-3">Current Conditions</h3>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
              <div className="bg-[#f0fdf4] dark:bg-[#064e3b]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[#065f46] dark:text-[#34d399] font-medium mb-4">Wind Speed</p>
                <Wind className="text-[#10b981] mb-2" size={32} />
                <h4 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{currentWeather.wind.speed} <span className="text-sm font-normal">Km/h</span></h4>
                <p className="text-xs text-gray-500 mt-2">Direction: {currentWeather.wind.deg}°</p>
              </div>
              <div className="bg-[#eff6ff] dark:bg-[#1e3a8a]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[#1e40af] dark:text-[#60a5fa] font-medium mb-4">Humidity</p>
                <Droplets className="text-[#3b82f6] mb-2" size={32} />
                <h4 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{currentWeather.main.humidity}<span className="text-sm font-normal">%</span></h4>
              </div>
              <div className="bg-[#fffbeb] dark:bg-[#78350f]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[#b45309] dark:text-[#fbbf24] font-medium mb-4">UV Index</p>
                <ThermometerSun className="text-[#f59e0b] mb-2" size={32} />
                <h4 className="text-4xl font-bold text-gray-900 dark:text-gray-100">5.45</h4>
                <p className="text-xs text-gray-500 mt-2">Moderate</p>
              </div>
              <div className="bg-[#fef2f2] dark:bg-[#7f1d1d]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[#991b1b] dark:text-[#f87171] font-medium mb-4">Pressure</p>
                <ThermometerSun className="text-[#ef4444] mb-2" size={32} />
                <h4 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{currentWeather.main.pressure} <span className="text-sm font-normal">Mb</span></h4>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}} />
    </div>
  );
}
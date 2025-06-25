import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import menaPhoto from './assets/mena-photo.jpg'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState({})
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [candles, setCandles] = useState([
    { id: 1, lit: true },
    { id: 2, lit: true },
    { id: 3, lit: true },
    { id: 4, lit: true },
    { id: 5, lit: true }
  ])
  const [allCandlesBlown, setAllCandlesBlown] = useState(false)

  // Background themes that change every 5 seconds
  const backgrounds = [
    'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600',
    'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600',
    'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
    'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600',
    'bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600',
    'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600'
  ]

  // Calculate countdown to June 29th
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let birthday = new Date(currentYear, 5, 29) // June 29th (month is 0-indexed)
      
      // If birthday has passed this year, set it for next year
      if (birthday < now) {
        birthday = new Date(currentYear + 1, 5, 29)
      }

      const difference = birthday - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // Change background every 5 seconds
  useEffect(() => {
    const backgroundTimer = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length)
    }, 5000)

    return () => clearInterval(backgroundTimer)
  }, [backgrounds.length])

  // Blow out candle function
  const blowCandle = (candleId) => {
    setCandles(prev => {
      const updated = prev.map(candle => 
        candle.id === candleId ? { ...candle, lit: false } : candle
      )
      
      // Check if all candles are blown out
      const allBlown = updated.every(candle => !candle.lit)
      setAllCandlesBlown(allBlown)
      
      return updated
    })
  }

  // Reset all candles
  const relightCandles = () => {
    setCandles(prev => prev.map(candle => ({ ...candle, lit: true })))
    setAllCandlesBlown(false)
  }

  const isBirthday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgrounds[backgroundIndex]} flex flex-col items-center justify-center p-4`}>
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['🎉', '🎊', '🎈', '✨', '🎁'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse drop-shadow-lg">
          🎉 Happy Birthday 🎉
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-12 animate-bounce drop-shadow-lg">
          Mena Magdy!
        </h2>

        {/* Photo */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img 
              src={menaPhoto} 
              alt="Mena Magdy" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-8 border-white shadow-2xl animate-pulse"
            />
            <div className="absolute -top-4 -right-4 text-6xl animate-spin">🎂</div>
            <div className="absolute -bottom-4 -left-4 text-6xl animate-bounce">🎈</div>
          </div>
        </div>

        {/* Countdown Timer */}
        {!isBirthday ? (
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Countdown to Your Special Day!
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                  <div className="text-sm md:text-base text-white/80 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 animate-bounce drop-shadow-lg">
              🎊 IT'S YOUR BIRTHDAY! 🎊
            </h3>
          </div>
        )}

        {/* Virtual Cake */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Make a Wish and Blow Out the Candles!
          </h3>
          
          {/* Cake */}
          <div className="relative mx-auto w-80 h-60 mb-8">
            {/* Cake Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-full border-8 border-amber-700 shadow-2xl">
              {/* Cake Decoration */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-56 h-6 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
            
            {/* Candles */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {candles.map((candle) => (
                <div key={candle.id} className="relative">
                  {/* Candle */}
                  <div className="w-3 h-16 bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm border border-red-700"></div>
                  
                  {/* Flame */}
                  {candle.lit && (
                    <div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 cursor-pointer animate-pulse"
                      onClick={() => blowCandle(candle.id)}
                      title="Click to blow out!"
                    >
                      <div className="w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-bounce"></div>
                    </div>
                  )}
                  
                  {/* Smoke when blown out */}
                  {!candle.lit && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-400 animate-pulse">
                      💨
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cake Controls */}
          <div className="flex flex-col items-center space-y-4">
            <p className="text-white text-lg drop-shadow-lg">
              Click on the candle flames to blow them out! 🌬️
            </p>
            
            {allCandlesBlown && (
              <div className="text-center">
                <div className="text-4xl mb-4 animate-bounce">🎊 Wish Granted! 🎊</div>
                <p className="text-white text-xl mb-4 drop-shadow-lg">
                  All your dreams will come true this year!
                </p>
              </div>
            )}
            
            <Button 
              onClick={relightCandles}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              🕯️ Relight Candles
            </Button>
          </div>
        </div>

        {/* Birthday Message */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Special Birthday Wishes
          </h3>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-lg">
            May this special day bring you endless joy, laughter, and wonderful memories! 
            Here's to another year of amazing adventures, dreams coming true, and all the 
            happiness your heart can hold. You deserve all the best things in life! 🎈✨
          </p>
          <div className="mt-6 text-4xl">
            🎂🎉🎊🎁🎈
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


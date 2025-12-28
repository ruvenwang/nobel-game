import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { fetchNobelPrizes, getCategories, getYearRange, filterPrizes } from './services/nobelData'
import FilterPanel from './components/FilterPanel'
import GameArea from './components/GameArea'

function App() {
  const [prizes, setPrizes] = useState([])
  const [categories, setCategories] = useState([])
  const [availableYearRange, setAvailableYearRange] = useState({ min: 1900, max: 2024 })

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedYearRange, setSelectedYearRange] = useState({ min: 1900, max: 2024 })

  const [loading, setLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNobelPrizes()
      setPrizes(data)
      setCategories(getCategories(data))

      const range = getYearRange(data)
      setAvailableYearRange(range)
      setSelectedYearRange(range)

      setLoading(false)
    }
    loadData()
  }, [])

  const filteredPrizes = useMemo(() => {
    return filterPrizes(prizes, selectedCategory, selectedYearRange.min, selectedYearRange.max)
  }, [prizes, selectedCategory, selectedYearRange])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleBackToSettings = () => {
    setGameStarted(false)
  }

  return (
    <>
      <h1>Nobel Prize Game</h1>

      {loading ? (
        <div className="card"><p>Loading Nobel Prize Data...</p></div>
      ) : (
        <>
          {!gameStarted ? (
            <div className="start-screen">
              <FilterPanel
                categories={categories}
                minYear={availableYearRange.min}
                maxYear={availableYearRange.max}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedYearRange={selectedYearRange}
                onYearRangeChange={setSelectedYearRange}
              />
              <button className="start-btn" onClick={handleStartGame}>
                Start Game
              </button>
            </div>
          ) : (
            <div className="game-container">
              <GameArea prizes={filteredPrizes} />
              <button className="back-btn" onClick={handleBackToSettings}>
                Back to Settings
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default App

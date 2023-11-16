import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import NavBar from './components/NavBar'
import { CourtInfo, courtLists, filterStore } from './stores'

function App() {
  const [count, setCount] = useState(0)
  const [courts, setCourts] = useState<CourtInfo[]>([])
  const [text] = filterStore((state) => [state.text])

  useEffect(()=>{
    let newCourtsList = courtLists.filter((court) => {
      return court.name.toLowerCase().includes(text.toLowerCase()) || court.location.toLowerCase().includes(text.toLowerCase())
    })
    setCourts(newCourtsList)
  },[text])


  return (
    <>
      <NavBar />
      <h1>Choose your badminton courts</h1>
      {
        courts.map((court, index) => {
          return (
            <div className='court-card' key={index}>
                <h2>{court.name}</h2>
                <p>{court.location}</p>
                <div className='price'>{court.bookingCost}</div>
            </div>
          )
        })
      }
    </>
  )
}

export default App

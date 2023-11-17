import { useEffect, useState } from 'react'
import './Home.scss'
import { CourtInfo, courtLists, filterStore } from '../stores'
import { Link } from 'react-router-dom'

function App() {
  const [courts, setCourts] = useState<CourtInfo[]>([])
  const [text] = filterStore((state) => [state.text])

  useEffect(() => {
    let newCourtsList = courtLists.filter((court) => {
      return court.name.toLowerCase().includes(text.toLowerCase()) || court.location.toLowerCase().includes(text.toLowerCase())
    })
    setCourts(newCourtsList)
  }, [text])


  return (
    <>
      <h1>Choose your badminton courts</h1>
      {
        courts.map((court, index) => {
          return (
            <Link to={`/court/${court.id}`}>
              <div className='court-card' key={index}>
                <h2>{court.name}</h2>
                <p>{court.location}</p>
                <div className='price'>{court.bookingCost}฿</div>
              </div>
            </Link>
          )
        })
      }
    </>
  )
}

export default App

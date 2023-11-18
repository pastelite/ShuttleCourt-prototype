import { useEffect, useState } from 'react'
import './Home.scss'
import { filterStore } from '../stores'
import { Link } from 'react-router-dom'

import courtLists, { CourtInfo } from '../courtsList'

function Home() {
  const [filteredCourts, setFilteredCourts] = useState<CourtInfo[]>([])
  const [text] = filterStore((state) => [state.text])

  useEffect(() => {
    let newCourtsList: CourtInfo[] = courtLists.filter((court) => {
      return court.name.toLowerCase().includes(text.toLowerCase()) || court.location.toLowerCase().includes(text.toLowerCase())
    })
    setFilteredCourts(newCourtsList)
  }, [text])

  return (
    <>
      <h1>Choose your badminton courts</h1>
      <div className='container'>
      {
        filteredCourts.map((court, index) => (
          <CourtItem court={court} index={index}></CourtItem>
        ))
      }
      </div>

    </>
  )
}

function CourtItem(props: { court: CourtInfo, index: number }) {
  return (<Link to={`/court/${props.court.id}`}>
    <div className='court-card' key={props.index}>

      <h2>{props.court.name}</h2>
      <div className='price'>{props.court.bookingCost}฿</div>

      <p>{props.court.location}</p>
      <img src={props.court.img} alt="" id="img" />
    </div>
  </Link>);
}

export default Home

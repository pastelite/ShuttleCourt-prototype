import { Link, useNavigate, useParams } from "react-router-dom"
import "./CourtInfo.scss"
import { useMemo } from "react"

import JamMapMarker from "../assets/icons/jam-map-marker.svg?react"
import JamClock from "../assets/icons/jam-clock.svg?react"
import JamCoin from "../assets/icons/jam-coin.svg?react"
import courtsList from "../courtsList"

export default function CourtInfo() {
  let courtId = Number.parseInt(useParams().id ?? '0')

  let courtInfo = useMemo(() => {
    return courtsList.find((court) => court.id === courtId)
  }, [courtId])

  let navigate = useNavigate();

  return (
    <>

      <div id="img-container">
        <img src={courtInfo?.img} alt="" id="Court-Info-img" />
      </div>

      <div id="court-page">

        <section id="infobox">
          <h1>{courtInfo?.name}</h1>

          <p>
            {courtInfo?.description}
          </p>
          <p>
            <JamMapMarker fill='white' height='1em' />
            {courtInfo?.location}
          </p>
          <p>
            <JamClock fill='white' height='1em' />
            {courtInfo?.businessHour[0]}:00 - {courtInfo?.businessHour[1]}:00
          </p>
          <p>
            <JamCoin fill='white' height='1em' />
            {courtInfo?.bookingCost}฿
          </p>
          <Link to={`/court/${courtId}/book`}>
            <button className="book-button">
              Book Now
            </button>
          </Link>
        </section>

      </div>
    </>

  )
}
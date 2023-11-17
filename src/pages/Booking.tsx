import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import courtsList from "../courtsList"

import { BookingEquipments } from "../components/BookingEquipments"
import { BookingTime } from "../components/BookingTime"

import "./Booking.scss"
import JamCoin from "../assets/icons/jam-coin.svg?react"
import ProcessOrderPopup from "../components/ProcessOrderPopup"
import dayjs from "dayjs"

export default function Booking() {
  // Get court info from url
  let courtId = Number.parseInt(useParams().id ?? '0')
  let courtInfo = useMemo(() => {
    return courtsList.find((court) => court.id === courtId)
  }, [])

  // Setup shared state
  let [totalTime, setTotalTime] = useState(0)
  let [datetime, setDatetime] = useState(dayjs())
  let [formEquipments, setFormEquipments] = useState<StringNumberDict>({
    badmintonRack: 0,
    shuttlecock: 0,
  })
  let [showPopup, setShowPopup] = useState(false);
 
  // calculate price
  let bookingPrice = (courtInfo?.bookingCost || 0) 
  let equipmentPrice = formEquipments.badmintonRack * 5 + formEquipments.shuttlecock * 1
  let hourlyPrice = bookingPrice + equipmentPrice
  let price = hourlyPrice / 60 * totalTime

  return <div id="booking-page">
    <ProcessOrderPopup show={showPopup} setShow={setShowPopup}/>
    <h1>Booking</h1>
    <BookingTime courtInfo={courtInfo} setTotalTime={setTotalTime} />
    <BookingEquipments formEquipment={formEquipments} setFormEquipment={setFormEquipments}/>
    <p>
      <JamCoin fill='white' height='1em' />
      Final Price: {price.toFixed(2)}฿ ({hourlyPrice}฿/hr)
    </p>
    <div className="button-container">
      <button className="book-button" onClick={()=>setShowPopup(true)}>Confirm</button>
    </div>
  </div>
}



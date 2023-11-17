import { useEffect } from "react"
import { useParams } from "react-router-dom"
import courtsList from "../courtsList"

import { BookingEquipments } from "../components/BookingEquipments"
import { BookingTime } from "../components/BookingTime"

import "./Booking.scss"
import JamCoin from "../assets/icons/jam-coin.svg?react"
import ProcessOrderPopup from "../components/ProcessOrderPopup"
import useBookingStore from "./BookingStore"

export default function Booking() {

  let { totalTime, formEquipments, setShowPopup, courtInfo, setCourtInfo, setPrice, showPopup } = useBookingStore()

  let courtId = Number.parseInt(useParams().id ?? '0')

  useEffect(() => {
    let courtInfo = courtsList.find((court) => court.id === courtId)
    setCourtInfo(courtInfo)
  }, [])

  // calculate price
  let bookingPrice = (courtInfo?.bookingCost || 0)
  let equipmentPrice = formEquipments.badmintonRack * 5 + formEquipments.shuttlecock * 1
  let hourlyPrice = bookingPrice + equipmentPrice
  let price = hourlyPrice / 60 * totalTime

  function handleShowPopup() {
    setShowPopup(true)
    setPrice(price)
  }

  return <div id="booking-page">
    <ProcessOrderPopup />
    <h1>Booking</h1>
    <BookingTime />
    <BookingEquipments />
    <p>
      <JamCoin fill='white' height='1em' />
      Final Price: {price.toFixed(2)}฿ ({hourlyPrice}฿/hr)
    </p>
    <div className="button-container">
      <button className="book-button" onClick={handleShowPopup}>Confirm</button>
    </div>
  </div>
}



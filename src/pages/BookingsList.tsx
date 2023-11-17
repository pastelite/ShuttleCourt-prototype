import courtLists from "../courtsList";
import { BookingInfo, bookingStore } from "../stores"
import "./BookingsList.scss"

export default function BookingsList() {
  let bookings = bookingStore((state) => state.bookingInfo);

  return <>
  <h1>Booking Lists</h1>
  {
    bookings.map((booking) => (
      <BookingItem booking={booking}></BookingItem>
    ))
  }
  </>
}

function BookingItem({booking}: {booking: BookingInfo}) {
  let courtInfo = courtLists.find((court) => court.id === booking.courtId)
  let scheduleStart = booking.date.clone()
  let scheduleEnd = scheduleStart.clone().add(booking.time, 'minutes')
  let [removeBookingInfo] = bookingStore((state) => [state.removeBookingInfo]);

  function handleCancel() {
    removeBookingInfo(booking.bookingId || -1)
  }


  return <div className="booking-item-container">
    <h4>{courtInfo?.name}</h4>
    <p>{courtInfo?.location}</p>
    <p>{scheduleStart.format("DD/MM/YYYY")} {scheduleStart.format("HH:mm")} - {scheduleEnd.format("HH:mm")} </p>
    <p>Paid for: {booking.price}฿</p>

    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
  </div>
}
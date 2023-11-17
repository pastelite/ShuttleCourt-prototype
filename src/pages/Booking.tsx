import "./Booking.scss"
import JamClock from "../assets/icons/jam-clock.svg?react"
import { courtLists } from "../stores"
import { useParams } from "react-router-dom"
import { useMemo, useState } from "react"

export default function Booking() {
  let courtId = Number.parseInt(useParams().id ?? '0')
  let [{ startTime, endTime }, setBookingTime] = useState({ startTime: 0, endTime: 0 })
  let [timeErrorText, setTimeErrorText] = useState('')

  let courtInfo = useMemo(() => {
    return courtLists.find((court) => court.id === courtId)
  }, [courtId])

  function handleChangeStart(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target
    let time = convertTimeToInt(value)
    setBookingTime((prev) => ({ ...prev, startTime: time }))

    checkTimeValue(time, endTime)
  }

  function handleChangeEnd(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target
    let time = convertTimeToInt(value)
    setBookingTime((prev) => ({ ...prev, endTime: time }))

    checkTimeValue(startTime, time)
  }

  function checkTimeValue(startTime: number, endTime: number) {
    console.log(startTime, endTime)

    if (startTime > endTime) {
      setTimeErrorText('Error: End time must be after start time')
    } else if (startTime < (courtInfo?.businessHour[0] || 0) * 100) {
      setTimeErrorText('Error: Start time must be after openning which is ' + (courtInfo?.businessHour[0] || 0) + ':00')
    } else if (endTime > (courtInfo?.businessHour[1] || 0) * 100) {
      setTimeErrorText('Error: End time must be before closing which is ' + (courtInfo?.businessHour[1] || 0) + ':00')
    } else {
      setTimeErrorText('')
    }
      
  }

  return <>
    <h1>Booking</h1>
    <p>
      <JamClock fill='white' height='1em' />
      Choose your time <br />
      <input type="time" name="startTime" onChange={handleChangeStart} />
      -
      <input type="time" name="endTime" onChange={handleChangeEnd} />
      {timeErrorText}
    </p>
  </>
}

function convertTimeToInt(time: string) {
  let [hour, minute] = time.split(':')
  return Number.parseInt(hour) * 100 + Number.parseInt(minute)
}
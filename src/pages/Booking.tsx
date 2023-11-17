import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { equipmentsStore } from "../stores"
import courtsList, { CourtInfo } from "../courtsList"
import dayjs from "dayjs"

import "./Booking.scss"
import JamClock from "../assets/icons/jam-clock.svg?react"
import JamCoin from "../assets/icons/jam-coin.svg?react"

export default function Booking() {
  let courtId = Number.parseInt(useParams().id ?? '0')
  let courtInfo = useMemo(() => {
    return courtsList.find((court) => court.id === courtId)
  }, [])

  let [{ startTime, endTime }, setBookingTime] = useState({
    startTime: 0,
    endTime: 0
  })
  let [formEquipments, setFormEquipments] = useState({
    badmintonRack: 0,
    shuttlecock: 0,
  })
  let [dbEquipments, setDbEquipments] = equipmentsStore((state) => {
    let { setEquipments, ...equipments } = state
    return [equipments, setEquipments]
  })

  let [totalTime, setTotalTime] = useState(0)

  let [errorText, setErrorText] = useState('')

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

  function handleEquipmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value: valueString } = e.target
    let value = Number.parseInt(valueString)
    setFormEquipments((prev) => ({ ...prev, [name]: value }))

    // @ts-ignore
    let dbEquipmentsNumber: number = dbEquipments[name];

    // deal with negative and overflow
    if (value < 0) {
      e.target.value = '0'
      value = 0
    } else if (value > dbEquipmentsNumber) {
      e.target.value = dbEquipmentsNumber.toString()
      value = dbEquipmentsNumber
    }
  }

  function checkTimeValue(startTime: number, endTime: number) {
    console.log(startTime, endTime)

    if (startTime > endTime) {
      setErrorText('Error: End time must be after start time')
    } else if (startTime < (courtInfo?.businessHour[0] || 0) * 100) {
      setErrorText('Error: Start time must be after openning which is ' + (courtInfo?.businessHour[0] || 0) + ':00')
    } else if (endTime > (courtInfo?.businessHour[1] || 0) * 100) {
      setErrorText('Error: End time must be before closing which is ' + (courtInfo?.businessHour[1] || 0) + ':00')
    } else {
      setErrorText('')
    }
  }

  function calculateTime(startTime: number, endTime: number) {
    let minutes = endTime % 100 - startTime % 100
    let hours = Math.floor((endTime - startTime) / 100)

    if (minutes < 0) {
      minutes += 60
      hours -= 1
    }

    return [hours, minutes]
  }

  // calculate price
  let hourlyPrice = ((courtInfo?.bookingCost || 0) + formEquipments.badmintonRack * 5 + formEquipments.shuttlecock * 1)
  let price = hourlyPrice / 60 * totalTime

  return <div id="booking-page">
    <h1>Booking</h1>
    <BookingTime courtInfo={courtInfo} setTotalTime={setTotalTime} />
    <p>
      <h3>Equipment Reservation</h3>
      <div className="equipment-container">
        <div>
          <h4>Badminton Rack</h4>
          <p>
            Available: {dbEquipments.badmintonRack - formEquipments.badmintonRack}<br />
            Price: 5฿/hr
          </p>
          <input type="number" defaultValue={0} name="badmintonRack" onChange={handleEquipmentChange}></input>
        </div>
        <div>
          <div>Shuttlecock</div>
          <p>
            Available: {dbEquipments.shuttlecock - formEquipments.shuttlecock}<br />
            Price: 1฿/hr
          </p>
          <input type="number" defaultValue={0} name="shuttlecock" onChange={handleEquipmentChange}></input>
        </div>
      </div>
    </p>
    <p>
      <JamCoin fill='white' height='1em' />
      Final Price: {price.toFixed(2)}฿ ({hourlyPrice}฿/hr)
    </p>
  </div>
}

function convertTimeToInt(time: string) {
  let [hour, minute] = time.split(':')
  return Number.parseInt(hour) * 100 + Number.parseInt(minute)
}


// By far the most complicated component in this project

interface BookingTimeProps {
  courtInfo?: CourtInfo
  setTotalTime: React.Dispatch<React.SetStateAction<number>>
}

function BookingTime({ courtInfo, setTotalTime }: BookingTimeProps) {
  let [errorText, setErrorText] = useState('')

  let [formTime, setFormTime] = useState<{ [key: string]: string }>({
    startTime: `${new Date().getHours().toString().padStart(2, '0')}:00`,
    endTime: `${(new Date().getHours() + 1).toString().padStart(2, '0')}:00`
  })

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target
    setFormTime((prev) => ({ ...prev, [name]: value }))
    formTime[name] = value

    checkTimeValue(formTime.startTime, formTime.endTime)
  }

  // check if the time is valid, if not, set error text
  function checkTimeValue(startTimeStr: string, endTimeStr: string) {
    // convert to dayjs object for easier comparison
    let startTime = dayjs(startTimeStr, 'HH:mm')
    let endTime = dayjs(endTimeStr, 'HH:mm')
    let businessHour = courtInfo?.businessHour || [0, 0]
    let businessHourStart = dayjs(businessHour[0].toString(), 'H')
    let businessHourEnd = dayjs(businessHour[1].toString(), 'H')

    if (startTime.isAfter(endTime)) {
      setErrorText('End time must be after start time')
    } else if (startTime.isBefore(businessHourStart)) {
      setErrorText('Start time must be after openning which is ' + businessHourStart.format('HH:mm'))
    } else if (endTime.isAfter(businessHourEnd)) {
      setErrorText('End time must be before closing which is ' + businessHourEnd.format('HH:mm'))
    } else {
      setErrorText('')
    }
  }

  // only set total time when the form changes to prevent infinite loop
  let totalTime = useMemo(()=> {
    let startTime = dayjs(formTime.startTime, 'HH:mm')
    let endTime = dayjs(formTime.endTime, 'HH:mm')
    let total = endTime.diff(startTime, 'minute')
    setTotalTime(total)
    return total
  }, [formTime])

  return <p>
    <h3>
      <JamClock fill='white' height='1em' />
      Choose your time
      ({courtInfo?.businessHour[0]}:00 - {courtInfo?.businessHour[1]}:00)
    </h3>

    <input type="time" name="startTime" onChange={handleTimeChange}
      defaultValue={formTime.startTime} />
    -
    <input type="time" name="endTime" onChange={handleTimeChange}
      defaultValue={formTime.endTime}
    />

    <p>
      {Math.floor(totalTime / 60)} hours {totalTime % 60} minutes
      <span style={{ color: 'red' }}>{errorText}</span>
    </p>
  </p>
}
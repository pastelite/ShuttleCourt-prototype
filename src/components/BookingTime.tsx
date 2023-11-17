import { useEffect, useMemo, useState } from "react";
import { CourtInfo } from "../courtsList";
import dayjs from "dayjs";
import JamClock from "../assets/icons/jam-clock.svg?react";

// By far the most complicated component in this project
interface BookingTimeProps {
  courtInfo?: CourtInfo;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
}
export function BookingTime({ courtInfo, setTotalTime }: BookingTimeProps) {
  let [errorText, setErrorText] = useState('');

  let [formTime, setFormTime] = useState<{ [key: string]: string; }>({
    startTime: `${new Date().getHours().toString().padStart(2, '0')}:00`,
    endTime: `${(new Date().getHours() + 1).toString().padStart(2, '0')}:00`
  });

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;
    setFormTime((prev) => ({ ...prev, [name]: value }));
    formTime[name] = value;

    checkTimeValue(formTime.startTime, formTime.endTime);
  }

  // check if the time is valid, if not, set error text
  function checkTimeValue(startTimeStr: string, endTimeStr: string) {
    // convert to dayjs object for easier comparison
    let startTime = dayjs(startTimeStr, 'HH:mm');
    let endTime = dayjs(endTimeStr, 'HH:mm');
    let businessHour = courtInfo?.businessHour || [0, 0];
    let businessHourStart = dayjs(businessHour[0].toString(), 'H');
    let businessHourEnd = dayjs(businessHour[1].toString(), 'H');

    if (startTime.isAfter(endTime)) {
      setErrorText('End time must be after start time');
    } else if (startTime.isBefore(businessHourStart)) {
      setErrorText('Start time must be after openning which is ' + businessHourStart.format('HH:mm'));
    } else if (endTime.isAfter(businessHourEnd)) {
      setErrorText('End time must be before closing which is ' + businessHourEnd.format('HH:mm'));
    } else {
      setErrorText('');
    }
  }
  // Run once to check if the default time is valid
  useEffect(() => {
    checkTimeValue(formTime.startTime, formTime.endTime);
  }, []);

  // only set total time when the form changes to prevent infinite loop
  let totalTime = useMemo(() => {
    let startTime = dayjs(formTime.startTime, 'HH:mm');
    let endTime = dayjs(formTime.endTime, 'HH:mm');
    let total = endTime.diff(startTime, 'minute');
    setTotalTime(total);
    return total;
  }, [formTime]);

  return <p>
    <h3>
      <JamClock fill='white' height='1em' />
      Choose your time
      ({courtInfo?.businessHour[0]}:00 - {courtInfo?.businessHour[1]}:00)
    </h3>

    <input type="time" name="startTime" onChange={handleTimeChange}
      defaultValue={formTime.startTime}
    />
    -
    <input type="time" name="endTime" onChange={handleTimeChange}
      defaultValue={formTime.endTime}
    />

    <input type="date" defaultValue={dayjs().format('YYYY-MM-DD') }></input>

    <p>
      {Math.floor(totalTime / 60)} hours {totalTime % 60} minutes <span style={{ color: 'red' }}>{errorText}</span>
    </p>
  </p>;
}

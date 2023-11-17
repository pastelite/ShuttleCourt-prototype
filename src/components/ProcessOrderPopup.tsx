import "./ProcessOrderPopup.scss";
import JamClose from "../assets/icons/jam-close.svg?react";
import { bookingStore, equipmentsStore } from "../stores";
import useBookingStore from "../pages/BookingStore";
import { useNavigate } from "react-router-dom";

export default function ProcessOrderPopup() {
  let { showPopup, setShowPopup, courtInfo, datetime, totalTime, formEquipments, price } = useBookingStore();
  let navigate = useNavigate();

  let addBookingInfo = bookingStore((state) => state.addBookingInfo);
  let dbEquipments = equipmentsStore((state) => state);

  function handleClick() {
    // add booking info to database
    let bookingInfo = {
      courtId: courtInfo?.id || -1,
      date: datetime,
      time: totalTime,
      equipments: formEquipments,
      price: price
    };
    addBookingInfo(bookingInfo);
    
    // update equipments in database
    let newEquipments = {
      badmintonRack: dbEquipments.badmintonRack - formEquipments.badmintonRack,
      shuttlecock: dbEquipments.shuttlecock - formEquipments.shuttlecock
    };
    equipmentsStore.setState(newEquipments);

    setShowPopup(false);
    navigate('/home');
  }

  return <div className="process-order-popup-background" style={{
    display: showPopup ? 'flex' : 'none'
  }}>
    
    <div className="process-order-popup-container">
      <div className="close-button" onClick={()=>setShowPopup(false)}>
        <JamClose fill="white" height="2em" />
      </div>
      <h1>This is where payment should be</h1>
      <p>Please click continue if finished paying</p>
      <p>
        Data that will be saved to database:
        {courtInfo?.id}<br />
        {datetime.format("YYYY-MM-DD")}<br />
        {totalTime}<br />
        {JSON.stringify(formEquipments)}<br />
        {price}<br />
      </p>
      <button className="book-button" onClick={handleClick}>Continue</button>
    </div>
  </div>;
}

import "./ProcessOrderPopup.scss";
import JamClose from "../assets/icons/jam-close.svg?react";
import { bookingStore, equipmentsStore } from "../stores";

interface ProcessOrderPopupProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProcessOrderPopup({ show, setShow }: ProcessOrderPopupProps) {
  let addBookingInfo = bookingStore((state) => state.addBookingInfo);
  let dbEquipments = equipmentsStore((state) => state);

  function handleClick() {
    setShow(false);
    // courtId, date, time, equipments
    
  }

  return <div className="process-order-popup-background" style={{
    display: show ? 'flex' : 'none'
  }}>
    
    <div className="process-order-popup-container">
      <div className="close-button" onClick={()=>setShow(false)}>
        <JamClose fill="white" height="2em" />
      </div>
      <h1>This is where payment should be</h1>
      <p>Please click continue if finished paying</p>
      <button className="book-button" onClick={handleClick}>Continue</button>
    </div>
  </div>;
}

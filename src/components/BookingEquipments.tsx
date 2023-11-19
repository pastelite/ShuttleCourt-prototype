import useBookingStore from "../pages/Booking.store";
import { equipmentsStore } from "../stores";

export function BookingEquipments() {
  let { formEquipments, setFormEquipments } = useBookingStore();

  let dbEquipments = equipmentsStore();

  function handleEquipmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value: valueString } = e.target;
    let value = Number.parseInt(valueString);
    setFormEquipments({ ...formEquipments, [name]: value });

    // @ts-ignore
    let dbEquipmentsNumber: number = dbEquipments[name];

    // deal with negative and overflow
    if (value < 0) {
      e.target.value = '0';
      value = 0;
    } else if (value > dbEquipmentsNumber) {
      e.target.value = dbEquipmentsNumber.toString();
      value = dbEquipmentsNumber;
    }
  }

  return (<p>
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
  </p>);
}

import { equipmentsStore } from "../stores";

interface BookingEquipmentsProps {
  formEquipment: StringNumberDict;
  setFormEquipment: React.Dispatch<React.SetStateAction<StringNumberDict>>;
}
export function BookingEquipments({ formEquipment, setFormEquipment }: BookingEquipmentsProps) {
  let dbEquipments = equipmentsStore();

  function handleEquipmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value: valueString } = e.target;
    let value = Number.parseInt(valueString);
    setFormEquipment((prev) => ({ ...prev, [name]: value }));

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
          Available: {dbEquipments.badmintonRack - formEquipment.badmintonRack}<br />
          Price: 5฿/hr
        </p>
        <input type="number" defaultValue={0} name="badmintonRack" onChange={handleEquipmentChange}></input>
      </div>
      <div>
        <div>Shuttlecock</div>
        <p>
          Available: {dbEquipments.shuttlecock - formEquipment.shuttlecock}<br />
          Price: 1฿/hr
        </p>
        <input type="number" defaultValue={0} name="shuttlecock" onChange={handleEquipmentChange}></input>
      </div>
    </div>
  </p>);
}

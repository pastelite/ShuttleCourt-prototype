import dayjs from "dayjs";
import { CourtInfo } from "../courtsList";
import { create } from "zustand";


interface BookingStoreProps {
  courtInfo?: CourtInfo;
  totalTime: number;
  datetime: dayjs.Dayjs;
  formEquipments: StringNumberDict;
  showPopup: boolean;
  price: number;
  setCourtInfo: (courtInfo?: CourtInfo) => void;
  setTotalTime: (totalTime: number) => void;
  setDatetime: (datetime: dayjs.Dayjs) => void;
  setFormEquipments: (formEquipments: StringNumberDict) => void;
  setShowPopup: (showPopup: boolean) => void;
  setPrice: (price: number) => void;
}

const useBookingStore = create<BookingStoreProps>((set) => ({
  courtInfo: undefined,
  totalTime: 0,
  datetime: dayjs(),
  formEquipments: {
    badmintonRack: 0,
    shuttlecock: 0,
  },
  showPopup: false,
  price: 0,
  setCourtInfo: (courtInfo?) => set({ courtInfo }),
  setTotalTime: (totalTime) => set({ totalTime }),
  setDatetime: (datetime) => set({ datetime }),
  setFormEquipments: (formEquipments) => set({ formEquipments }),
  setShowPopup: (showPopup) => set({ showPopup }),
  setPrice: (price) => set({ price }),
}))

export default useBookingStore
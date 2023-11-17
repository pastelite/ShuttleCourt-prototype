import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type UserInfo = {
  username: string;
  setUsername: (username: string) => void;
};

export const userStore = create<UserInfo>((set) => ({
  username: "Username",
  setUsername: (username: string) => set({ username }),
}));

type FilterParams = {
  text: string;
  setText: (text: string) => void;
};

export const filterStore = create<FilterParams>((set) => ({
  text: "",
  setText: (text: string) => set({ text }),
}));

type EquipmentsStoreProps = {
  badmintonRack: number;
  shuttlecock: number;
  setEquipments: (badmintonRack: number, shuttlecock: number) => void;
  // setBadmintonRack: (badmintonRack: number) => void;
  // setShuttlecock: (shuttlecock: number) => void;
};

export const equipmentsStore = create<EquipmentsStoreProps>((set) => ({
  badmintonRack: 12,
  shuttlecock: 10,
  setEquipments: (badmintonRack?: number, shuttlecock?: number) => {
    if (badmintonRack) set({ badmintonRack })
    if (shuttlecock) set({ shuttlecock })
  }
}));

type BookingInfo = {
  courtId: number;
  bookingId?: number;
  date: string;
  time: number;
  equipments: StringNumberDict;
  price?: number;
};

type BookingStoreProps = {
  bookingInfo: BookingInfo[];
  latestBookingId: number;
  addBookingInfo: (bookingInfo: BookingInfo) => void;
  removeBookingInfo: (bookingId: number) => void;
};

export const bookingStore = create<BookingStoreProps>((set) => ({
  bookingInfo: [],
  latestBookingId: 1,
  addBookingInfo: (bookingInfo: BookingInfo) => set((state) => {
    const bookingId = state.latestBookingId + 1;
    return {
      bookingInfo: [...state.bookingInfo, { ...bookingInfo, bookingId }],
      latestBookingId: bookingId
    }
  }),
  removeBookingInfo: (bookingId: number) => set((state) =>
    ({ bookingInfo: state.bookingInfo.filter((info) => info.bookingId !== bookingId) })
  ),
}));
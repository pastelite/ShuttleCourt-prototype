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

mountStoreDevtool('Filter',filterStore)
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type UserInfo = {
  username: string;
  setUsername: (username: string) => void;
};

let userStore = create<UserInfo>((set) => ({
  username: "Username",
  setUsername: (username: string) => set({ username }),
}));

type FilterParams = {
  text: string;
  setText: (text: string) => void;
};

let filterStore = create<FilterParams>((set) => ({
  text: "",
  setText: (text: string) => set({ text }),
}));

export type CourtInfo = {
  id: number;
  name: string;
  location: string;
  businessHour: [number, number]; // [start, end]
  bookingCost: number;
  ruleSet?: string;
};

// It is weird to store here but fuck it
let courtLists: CourtInfo[] = [
  {id: 1, name: "Court near ICT", location: "ICT", businessHour: [9,16], bookingCost: 100, ruleSet: "Don't bring food in"},
  {id: 2, name: "Sports Science Badminton Court 1", location: "Sports Science",businessHour: [8,18],bookingCost:80},
  {id: 3, name: "Sports Science Badminton Court 2", location: "Sports Science",businessHour: [8,18],bookingCost:70},
  {id: 4, name: "Sports Science Badminton Court 3", location: "Sports Science",businessHour: [10,14],bookingCost:50},
  {id: 5, name: "Central badminton court 1",location: "MLC", businessHour: [12,18],bookingCost: 100},
  {id: 6, name: "Central badminton court 2",location: "MLC", businessHour: [12,18],bookingCost: 100}
]

mountStoreDevtool('Filter',filterStore)


export {userStore, filterStore, courtLists}
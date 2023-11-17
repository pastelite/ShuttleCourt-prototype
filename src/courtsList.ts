export type CourtInfo = {
  id: number;
  name: string;
  location: string;
  businessHour: [number, number]; // [start, end]
  bookingCost: number;
  ruleSet?: string;
};

// It is weird to store here but fuck it
const courtLists: CourtInfo[] = [
  {id: 1, name: "Court near ICT", location: "ICT", businessHour: [9,16], bookingCost: 100, ruleSet: "Don't bring food in"},
  {id: 2, name: "Sports Science Badminton Court 1", location: "Sports Science",businessHour: [8,18],bookingCost:80},
  {id: 3, name: "Sports Science Badminton Court 2", location: "Sports Science",businessHour: [8,18],bookingCost:70},
  {id: 4, name: "Sports Science Badminton Court 3", location: "Sports Science",businessHour: [10,14],bookingCost:50},
  {id: 5, name: "Central badminton court 1",location: "MLC", businessHour: [12,18],bookingCost: 100},
  {id: 6, name: "Central badminton court 2",location: "MLC", businessHour: [12,18],bookingCost: 100}
]

export default courtLists
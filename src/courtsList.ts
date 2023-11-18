export type CourtInfo = {
  id: number;
  name: string;
  location: string;
  businessHour: [number, number]; // [start, end]
  bookingCost: number;
  img: string;
  description: string;
  ruleSet?: string;
};

//Due to time limitation we will use fake database for the mockup
const courtLists: CourtInfo[] = [
  { id: 1, description: `Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our`, name: "Court near ICT", location: "ICT", businessHour: [9, 16], bookingCost: 100, img: 'https://i.redd.it/ahchezqlxsc51.jpg', ruleSet: "Don't bring food in" },
  { id: 2, description: 'Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our', name: "Sports Science Badminton Court 1", location: "Sports Science", businessHour: [8, 18], img: 'https://as1.ftcdn.net/v2/jpg/00/94/64/46/1000_F_94644610_TlQJQoGtqbxwtFjvUobrSvXkO6kDvEDF.jpg', bookingCost: 80 },
  { id: 3, description: 'Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our', name: "Sports Science Badminton Court 2", location: "Sports Science", businessHour: [8, 18], img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67aaef6b-f551-42bd-81a5-8b3559144fac/dedjwvx-440e9a0c-7566-49cf-98ff-33d5a0f563e6.jpg/v1/fill/w_1024,h_683,q_75,strp/in_an_abandoned_tennis_court_by_frxasc_dedjwvx-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgzIiwicGF0aCI6IlwvZlwvNjdhYWVmNmItZjU1MS00MmJkLTgxYTUtOGIzNTU5MTQ0ZmFjXC9kZWRqd3Z4LTQ0MGU5YTBjLTc1NjYtNDljZi05OGZmLTMzZDVhMGY1NjNlNi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Z6N1HSy0n-oTluUUQJTmgLYMJaQfdwXHkq78i5In-n0', bookingCost: 70 },
  { id: 4, description: 'Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our', name: "Sports Science Badminton Court 3", location: "Sports Science", businessHour: [10, 14], img: 'https://weburbanist.com/wp-content/uploads/2016/01/abandoned-tennis-court-feature.jpg', bookingCost: 50 },
  { id: 5, description: 'Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our', name: "MUICT Badminton Court", location: "MLC", businessHour: [12, 18], img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fweburbanist.com%2F2016%2F01%2F24%2Funcanny-volley-15-abandoned-tennis-courts-clubs%2F&psig=AOvVaw3ogLE9mtSvkq9lGw8-Npwk&ust=1700415132793000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODPy5GKzoIDFQAAAAAdAAAAABAJ', bookingCost: 100 },
  { id: 6, description: 'Embark on an extraordinary badminton journey within our championship-caliber courts that transcend the ordinary. These otherworldly sanctuaries are crafted for shuttlecock enthusiasts seeking the pinnacle of mastery. Defying the laws of mediocrity, our space invites players of all skill levels, from novices dreaming of shuttlecock stardom to seasoned pros aiming to transcend reality. Experience the rush of adrenaline as you navigate carefully plotted dimensions, where serves become cosmic events and rallies are dances with destiny. Our', name: "Central badminton court 2", location: "MLC", businessHour: [12, 18], img: 'https://miro.medium.com/v2/resize:fit:1400/1*qHfMI1O3aqjy6rHJnGYZgQ.jpeg', bookingCost: 100 }
]

export default courtLists
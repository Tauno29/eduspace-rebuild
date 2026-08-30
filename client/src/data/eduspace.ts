/* EduSpace recovery style: screenshot-faithful mobile utility UI with pale lavender surfaces, raised white cards, EduSpace Indigo actions, mint availability cues, and compact rounded typography. */

export type Region = {
  id: string;
  name: string;
  schools: number;
  available: number;
  icon: string;
  tone: string;
};

export type School = {
  id: string;
  name: string;
  region: string;
  location: string;
  category: "Secondary" | "Primary";
  type: "Government" | "Private";
  spaces: number;
  boarding: "Hostel" | "Day school";
  image: string;
  description: string;
};

export const regions: Region[] = [
  { id: "erongo", name: "Erongo", schools: 0, available: 0, icon: "≋", tone: "blue" },
  { id: "hardap", name: "Hardap", schools: 0, available: 0, icon: "◎", tone: "lilac" },
  { id: "karas", name: "Karas", schools: 0, available: 0, icon: "⚓", tone: "violet" },
  { id: "kavango-east", name: "Kavango East", schools: 0, available: 0, icon: "✣", tone: "lilac" },
  { id: "kavango-west", name: "Kavango West", schools: 0, available: 0, icon: "◌", tone: "mint" },
  { id: "khomas", name: "Khomas", schools: 0, available: 0, icon: "⌂", tone: "yellow" },
  { id: "kunene", name: "Kunene", schools: 0, available: 0, icon: "♧", tone: "blue" },
  { id: "ohangwena", name: "Ohangwena", schools: 0, available: 0, icon: "♧", tone: "lilac" },
  { id: "omaheke", name: "Omaheke", schools: 0, available: 0, icon: "✤", tone: "violet" },
  { id: "omusati", name: "Omusati", schools: 1, available: 0, icon: "◡", tone: "mint" },
  { id: "oshana", name: "Oshana", schools: 0, available: 0, icon: "◒", tone: "blue" },
  { id: "oshikoto", name: "Oshikoto", schools: 0, available: 0, icon: "◆", tone: "lilac" },
  { id: "otjozondjupa", name: "Otjozondjupa", schools: 0, available: 0, icon: "◎", tone: "violet" },
  { id: "zambezi", name: "Zambezi", schools: 0, available: 0, icon: "▥", tone: "yellow" },
];

export const schools: School[] = [
  {
    id: "nuyoma",
    name: "Nuyoma Senior Secondary School",
    region: "Oshikoto Region",
    location: "Oshikuku",
    category: "Secondary",
    type: "Government",
    spaces: 84,
    boarding: "Hostel",
    image: "/manus-storage/eduspace-classroom_b42ae36b.jpg",
    description:
      "This is a school located in Oshikoto region Oshikuku that has a legacy and is committed in terms of educational performance.",
  },
];

export const vacancyRows = [
  {
    grade: "Grade 8",
    note: "2 classes • 119 spots total",
    enrolled: 89,
    capacity: 119,
    occupied: 76,
    tone: "mint",
    streams: [
      { name: "8A", enrolled: 43, capacity: 60 },
      { name: "8B", enrolled: 23, capacity: 34 },
      { name: "8C", enrolled: 23, capacity: 25 },
    ],
  },
  {
    grade: "Grade 9",
    note: "2 classes • 146 spots total",
    enrolled: 92,
    capacity: 146,
    occupied: 63,
    tone: "mint",
    streams: [
      { name: "9A", enrolled: 48, capacity: 70 },
      { name: "9B", enrolled: 44, capacity: 76 },
    ],
  },
];

export const onboardingSteps = [
  { title: "Welcome to Edu Space", copy: "Your central gateway to the Namibian National School Placement Database. Find the perfect school for your child with ease." },
];

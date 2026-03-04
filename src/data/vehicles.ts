export type VehicleType = "car" | "suv" | "van" | "buggy" | "atv" | "scooter" | "ebike";

export type Transmission = "automatic" | "manual";

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  type: VehicleType;
  transmission: Transmission;
  seats: number;
  luggage: "light" | "medium" | "large";
  descriptionShort: string;
  descriptionLong: string;
  tags: string[];
  images: string[];
  pricing: {
    lowSeason: number;
    highSeason: number;
  };
  visibleForPartners: string[];
}

export const vehicles: Vehicle[] = [
  // Cars & SUVs
  {
    id: "mercedes-glb",
    name: "Mercedes Benz GLB",
    category: "Automatic SUV",
    type: "suv",
    transmission: "automatic",
    seats: 5,
    luggage: "large",
    descriptionShort: "Refined, spacious SUV tailored for elevated island escapes.",
    descriptionLong:
      "The Mercedes Benz GLB combines generous space, comfort and quiet power. Ideal for families or couples seeking a refined way to explore Antiparos, with an elevated driving position and premium finishes that match the ambience of The Rooster.",
    tags: ["luxury", "family", "island-touring"],
    images: ["/images/vehicles/mercedes-glb-1.jpg"],
    pricing: {
      lowSeason: 280,
      highSeason: 380
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "jeep-renegade-upland-4xe",
    name: "Jeep Renegade UPLAND 4xe",
    category: "Automatic SUV 4x4 Hybrid",
    type: "suv",
    transmission: "automatic",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Hybrid 4x4 freedom for off-road paths and hidden bays.",
    descriptionLong:
      "The Jeep Renegade UPLAND 4xe is the perfect blend of comfort and capability. With hybrid technology and 4x4 traction, it is designed for guests who want to reach the island’s more secluded spots with confidence and style.",
    tags: ["offroad", "hybrid", "adventure"],
    images: ["/images/vehicles/jeep-renegade-upland-4xe-1.png"],
    pricing: {
      lowSeason: 220,
      highSeason: 320
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "jeep-renegade-open-roof",
    name: "Jeep Renegade Open Roof",
    category: "Automatic SUV 4x4",
    type: "suv",
    transmission: "automatic",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Open-roof 4x4 SUV for panoramic island drives.",
    descriptionLong:
      "This Jeep Renegade with open roof combines 4x4 capability with an airy cabin experience, ideal for scenic drives and discovering Antiparos from sunrise to sunset.",
    tags: ["offroad", "open-air", "adventure"],
    images: ["/images/vehicles/jeep-renegade-open-roof-1.png"],
    pricing: {
      lowSeason: 180,
      highSeason: 240
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "jeep-renegade-automatic",
    name: "Jeep Renegade Automatic",
    category: "Automatic SUV",
    type: "suv",
    transmission: "automatic",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Compact automatic SUV for confident all-day touring.",
    descriptionLong:
      "The automatic Jeep Renegade is a compact SUV that feels at home on both village streets and gravel roads, offering guests an easy and confident way to explore Antiparos.",
    tags: ["island-touring", "automatic", "compact-suv"],
    images: ["/images/vehicles/jeep-renegade-automatic-1.png"],
    pricing: {
      lowSeason: 150,
      highSeason: 220
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "mg-zs-suv",
    name: "MG ZS SUV",
    category: "Automatic SUV",
    type: "suv",
    transmission: "automatic",
    seats: 5,
    luggage: "large",
    descriptionShort: "Modern automatic SUV with generous comfort and space.",
    descriptionLong:
      "The MG ZS SUV is a contemporary automatic SUV with generous cabin space, refined ride quality and practical luggage capacity, ideal for families and friends travelling together.",
    tags: ["family", "comfort", "automatic"],
    images: ["/images/vehicles/mg-zs-suv-1.png"],
    pricing: {
      lowSeason: 140,
      highSeason: 200
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "fiat-doblo-7-seater",
    name: "Fiat Doblo 7 Seater",
    category: "Van",
    type: "van",
    transmission: "manual",
    seats: 7,
    luggage: "large",
    descriptionShort: "Seven-seat van tailored for larger families and groups.",
    descriptionLong:
      "The Fiat Doblo 7 Seater is a practical multi-passenger van with flexible seating and luggage options, ideal for larger families or small groups exploring the island together in comfort.",
    tags: ["families", "groups", "practical"],
    images: ["/images/vehicles/fiat-doblo-7-seater-1.jpg"],
    pricing: {
      lowSeason: 120,
      highSeason: 200
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "jeep-renegade-manual",
    name: "Jeep Renegade Manual",
    category: "Manual SUV",
    type: "suv",
    transmission: "manual",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Engaging manual SUV for guests who enjoy driving.",
    descriptionLong:
      "The manual Jeep Renegade offers an engaging drive with the practicality of an SUV, suitable for guests who prefer full control while exploring Antiparos’ varied terrain.",
    tags: ["manual", "offroad", "adventure"],
    images: ["/images/vehicles/jeep-renegade-manual-1.png"],
    pricing: {
      lowSeason: 140,
      highSeason: 180
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "suzuki-jimny",
    name: "Suzuki Jimny",
    category: "Manual SUV 4x4",
    type: "suv",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Iconic compact 4x4 made for off-road island routes.",
    descriptionLong:
      "The Suzuki Jimny is a legendary 4x4 built for narrow tracks and rugged scenery. It is perfect for adventurous guests seeking to discover the more remote bays and viewpoints of Antiparos.",
    tags: ["offroad", "adventure", "compact"],
    images: ["/images/vehicles/suzuki-jimny-1.png"],
    pricing: {
      lowSeason: 120,
      highSeason: 200
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "peugeot-108-aygo-soft-top",
    name: "Peugeot 108 / Toyota Aygo Soft Top",
    category: "Automatic Convertible Mini",
    type: "car",
    transmission: "automatic",
    seats: 4,
    luggage: "light",
    descriptionShort: "Compact soft-top city cars perfect for seaside cruising.",
    descriptionLong:
      "These soft-top Peugeot 108 and Toyota Aygo models are ideal for couples or friends who want a playful, open-roof mini car for sun-drenched drives between the village and the beaches.",
    tags: ["convertible", "couples", "beach-hopping"],
    images: ["/images/vehicles/peugeot-108-aygo-soft-top-1.png"],
    pricing: {
      lowSeason: 120,
      highSeason: 170
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "citroen-c3-automatic",
    name: "Citroen C3 Automatic",
    category: "Automatic Medium",
    type: "car",
    transmission: "automatic",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Comfortable automatic hatchback for relaxed exploring.",
    descriptionLong:
      "The automatic Citroen C3 is a comfortable medium-sized hatchback, well-suited to couples or small families who want easy driving and a smooth, quiet ride around the island.",
    tags: ["automatic", "comfort", "hatchback"],
    images: ["/images/vehicles/citroen-c3-automatic-1.jpg"],
    pricing: {
      lowSeason: 110,
      highSeason: 160
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "fiat-500c-hybrid",
    name: "Fiat 500C Hybrid",
    category: "Manual Convertible Hybrid Mini",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Hybrid cabrio with iconic Italian character.",
    descriptionLong:
      "The Fiat 500C Hybrid offers open-top driving with efficient hybrid technology and timeless Italian style, perfect for couples enjoying slow, scenic days between The Rooster and the sea.",
    tags: ["convertible", "hybrid", "iconic"],
    images: ["/images/vehicles/fiat-500c-hybrid-1.png"],
    pricing: {
      lowSeason: 110,
      highSeason: 170
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "fiat-500c",
    name: "Fiat 500C",
    category: "Manual Convertible Mini",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Chic convertible mini for stylish coastal days.",
    descriptionLong:
      "The Fiat 500C is a chic cabriolet that brings a sense of fun and style to every journey, ideal for couples and friends who prefer compact, characterful cars.",
    tags: ["convertible", "style", "couples"],
    images: ["/images/vehicles/fiat-500c-1.png"],
    pricing: {
      lowSeason: 90,
      highSeason: 160
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "peugeot-208-2024",
    name: "Peugeot 208 2024",
    category: "Manual Compact",
    type: "car",
    transmission: "manual",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Latest-generation compact hatchback with a refined cabin.",
    descriptionLong:
      "The 2024 Peugeot 208 is a modern compact car with efficiently packaged space and contemporary styling, suitable for guests wanting a fresh, dynamic hatchback for their stay.",
    tags: ["modern", "compact", "efficient"],
    images: ["/images/vehicles/peugeot-208-2024-1.png"],
    pricing: {
      lowSeason: 100,
      highSeason: 160
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "mitsubishi-spacestar-2024",
    name: "Mitsubishi SpaceStar 2024",
    category: "Automatic Mini",
    type: "car",
    transmission: "automatic",
    seats: 5,
    luggage: "light",
    descriptionShort: "Automatic mini ideal for village streets and short trips.",
    descriptionLong:
      "The Mitsubishi SpaceStar 2024 is an easy-to-park automatic mini car, ideal for effortless movement between The Rooster, town and nearby beaches.",
    tags: ["automatic", "mini", "easy-parking"],
    images: ["/images/vehicles/mitsubishi-spacestar-2024-1.jpg"],
    pricing: {
      lowSeason: 100,
      highSeason: 150
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "kia-picanto-automatic",
    name: "Kia Picanto Automatic",
    category: "Automatic Mini",
    type: "car",
    transmission: "automatic",
    seats: 4,
    luggage: "light",
    descriptionShort: "Compact automatic mini for simple, stress-free driving.",
    descriptionLong:
      "The Kia Picanto Automatic is a compact city car that makes island driving intuitive and relaxed, perfect for short hops and narrow lanes.",
    tags: ["automatic", "mini", "city"],
    images: ["/images/vehicles/kia-picanto-automatic-1.jpg"],
    pricing: {
      lowSeason: 100,
      highSeason: 140
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "peugeot-208",
    name: "Peugeot 208",
    category: "Manual Medium",
    type: "car",
    transmission: "manual",
    seats: 5,
    luggage: "medium",
    descriptionShort: "Versatile hatchback balancing comfort and agility.",
    descriptionLong:
      "The Peugeot 208 offers a balanced combination of comfort and agility, suitable for everyday exploring across the island for couples or small families.",
    tags: ["manual", "compact", "versatile"],
    images: ["/images/vehicles/peugeot-208-1.jpg"],
    pricing: {
      lowSeason: 80,
      highSeason: 130
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "fiat-panda-hybrid",
    name: "Fiat Panda Hybrid",
    category: "Manual Car Hybrid",
    type: "car",
    transmission: "manual",
    seats: 5,
    luggage: "light",
    descriptionShort: "Efficient hybrid city car for relaxed daily use.",
    descriptionLong:
      "The Fiat Panda Hybrid is an efficient, upright city car that suits relaxed daily driving, offering easy access and simple manoeuvring.",
    tags: ["hybrid", "city", "efficient"],
    images: ["/images/vehicles/fiat-panda-hybrid-1.jpg"],
    pricing: {
      lowSeason: 90,
      highSeason: 140
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "skoda-citigo-automatic",
    name: "Skoda Citigo Automatic",
    category: "Automatic Mini",
    type: "car",
    transmission: "automatic",
    seats: 4,
    luggage: "light",
    descriptionShort: "Automatic mini hatchback for simple, compact mobility.",
    descriptionLong:
      "The Skoda Citigo Automatic is a compact automatic hatchback that excels in tight streets and short distances while remaining comfortable and easy to drive.",
    tags: ["automatic", "mini", "city"],
    images: ["/images/vehicles/skoda-citigo-automatic-1.jpg"],
    pricing: {
      lowSeason: 90,
      highSeason: 140
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "fiat-panda",
    name: "Fiat Panda",
    category: "Manual Compact",
    type: "car",
    transmission: "manual",
    seats: 5,
    luggage: "light",
    descriptionShort: "Simple, upright compact ideal for short island hops.",
    descriptionLong:
      "The Fiat Panda is a straightforward compact car with good visibility and an easygoing character, ideal for guests who want simplicity and practicality.",
    tags: ["compact", "practical", "manual"],
    images: ["/images/vehicles/fiat-panda-1.jpg"],
    pricing: {
      lowSeason: 70,
      highSeason: 130
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "suzuki-celerio",
    name: "Suzuki Celerio",
    category: "Manual Compact",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Lightweight compact for simple point-to-point travel.",
    descriptionLong:
      "The Suzuki Celerio is a lightweight compact hatchback offering economical driving and straightforward practicality for island days.",
    tags: ["compact", "economical", "manual"],
    images: ["/images/vehicles/suzuki-celerio-1.jpg"],
    pricing: {
      lowSeason: 70,
      highSeason: 130
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "toyota-aygo",
    name: "Toyota Aygo",
    category: "Manual Mini",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Mini hatchback suited to town roads and short trips.",
    descriptionLong:
      "The Toyota Aygo is a compact mini car perfect for short trips between Antiparos town, beaches and The Rooster, especially for couples or solo travellers.",
    tags: ["mini", "city", "economical"],
    images: ["/images/vehicles/toyota-aygo-1.jpg"],
    pricing: {
      lowSeason: 60,
      highSeason: 120
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "skoda-citigo",
    name: "Skoda Citigo",
    category: "Manual Mini",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Compact mini hatchback for easy village access.",
    descriptionLong:
      "The manual Skoda Citigo is a nimble mini hatchback ideal for moving easily around the village and along coastal roads.",
    tags: ["mini", "manual", "city"],
    images: ["/images/vehicles/skoda-citigo-1.jpg"],
    pricing: {
      lowSeason: 60,
      highSeason: 120
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "citroen-c1",
    name: "Citroen C1",
    category: "Manual Mini",
    type: "car",
    transmission: "manual",
    seats: 4,
    luggage: "light",
    descriptionShort: "Lively mini car perfect for short, spontaneous escapes.",
    descriptionLong:
      "The Citroen C1 is a lively, characterful mini car that feels at home on short island journeys, ideal for light travellers and couples.",
    tags: ["mini", "compact", "manual"],
    images: ["/images/vehicles/citroen-c1-1.jpg"],
    pricing: {
      lowSeason: 60,
      highSeason: 120
    },
    visibleForPartners: ["therooster"]
  },

  // Buggies & ATVs
  {
    id: "buggy-500",
    name: "Buggy 500cc",
    category: "Buggy",
    type: "buggy",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Playful open-air buggy for coastal adventures.",
    descriptionLong:
      "Our 500cc buggy delivers a playful, open-air way to experience Antiparos. Perfect for couples or friends who want an immersive and fun way to move between beaches and viewpoints.",
    tags: ["adventure", "open-air", "fun"],
    images: ["/images/vehicles/buggy-500-1.png"],
    pricing: {
      lowSeason: 80,
      highSeason: 140
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "atv-550",
    name: "ATV 550cc",
    category: "ATV",
    type: "atv",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Powerful ATV for confident off-road explorations.",
    descriptionLong:
      "The 550cc ATV offers strong performance and stability for off-road routes, giving adventurous guests the freedom to explore Antiparos’ wilder side.",
    tags: ["offroad", "adventure", "open-air"],
    images: ["/images/vehicles/atv-550-1.png"],
    pricing: {
      lowSeason: 100,
      highSeason: 150
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "atv-520-hydraulic",
    name: "ATV 520cc Hydraulic Steering",
    category: "ATV",
    type: "atv",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Comfort-focused ATV with hydraulic steering assistance.",
    descriptionLong:
      "This 520cc ATV with hydraulic steering delivers a more comfortable, controlled ride, ideal for guests who want to combine off-road exploring with added ease.",
    tags: ["offroad", "comfort", "open-air"],
    images: ["/images/vehicles/atv-520-hydraulic-1.png"],
    pricing: {
      lowSeason: 90,
      highSeason: 140
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "atv-450",
    name: "ATV 450cc",
    category: "ATV",
    type: "atv",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Well-balanced ATV for relaxed, scenic tracks.",
    descriptionLong:
      "The 450cc ATV balances power and ease of use, suitable for guests who want to enjoy scenic routes and dirt tracks without extreme performance.",
    tags: ["offroad", "adventure", "balanced"],
    images: ["/images/vehicles/atv-450-1.png"],
    pricing: {
      lowSeason: 80,
      highSeason: 110
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "atv-300",
    name: "ATV 300cc",
    category: "ATV",
    type: "atv",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Entry-level ATV for easygoing off-road enjoyment.",
    descriptionLong:
      "The 300cc ATV is an approachable option for guests who would like to experience Antiparos’ tracks at a calmer pace.",
    tags: ["offroad", "entry-level", "open-air"],
    images: ["/images/vehicles/atv-300-1.png"],
    pricing: {
      lowSeason: 70,
      highSeason: 65
    },
    visibleForPartners: ["therooster"]
  },

  // Scooters & Ebikes
  {
    id: "vespa-primavera-125",
    name: "Vespa Primavera 125cc",
    category: "Scooter",
    type: "scooter",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Iconic Vespa styling for slow, scenic coastal rides.",
    descriptionLong:
      "The Vespa Primavera 125cc is an elegant, iconic way to move quietly around the island. Best suited for couples, early-morning coffee runs and unhurried sunset rides.",
    tags: ["couples", "iconic", "light-travel"],
    images: ["/images/vehicles/vespa-primavera-1.png"],
    pricing: {
      lowSeason: 50,
      highSeason: 80
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "scooter-300",
    name: "Scooter 300cc",
    category: "Scooter",
    type: "scooter",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Strong scooter for two-up riding and longer distances.",
    descriptionLong:
      "The 300cc scooter provides confident acceleration and comfort for two riders, making it ideal for longer island routes and days with more distance.",
    tags: ["scooter", "two-riders", "longer-trips"],
    images: ["/images/vehicles/scooter-300-1.png"],
    pricing: {
      lowSeason: 45,
      highSeason: 75
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "scooter-200",
    name: "Scooter 200cc",
    category: "Scooter",
    type: "scooter",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Capable everyday scooter for relaxed island days.",
    descriptionLong:
      "The 200cc scooter is a comfortable everyday choice for exploring Antiparos at a relaxed pace, suitable for one or two riders.",
    tags: ["scooter", "everyday", "relaxed"],
    images: ["/images/vehicles/scooter-200-1.png"],
    pricing: {
      lowSeason: 40,
      highSeason: 70
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "scooter-150",
    name: "Scooter 150cc",
    category: "Scooter",
    type: "scooter",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Light, nimble scooter for short, spontaneous escapes.",
    descriptionLong:
      "The 150cc scooter is light, nimble and easy to handle, ideal for shorter trips, spontaneous beach visits and quick runs into town.",
    tags: ["scooter", "light", "nimble"],
    images: ["/images/vehicles/scooter-150-1.png"],
    pricing: {
      lowSeason: 35,
      highSeason: 65
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "scooter-125",
    name: "Scooter 125cc",
    category: "Scooter",
    type: "scooter",
    transmission: "automatic",
    seats: 2,
    luggage: "light",
    descriptionShort: "Accessible scooter for simple, easy island mobility.",
    descriptionLong:
      "The 125cc scooter is an accessible, easygoing option for guests who value simplicity and the feeling of open-air movement.",
    tags: ["scooter", "accessible", "easy"],
    images: ["/images/vehicles/scooter-125-1.png"],
    pricing: {
      lowSeason: 30,
      highSeason: 60
    },
    visibleForPartners: ["therooster"]
  },
  {
    id: "ebikes",
    name: "Ebikes",
    category: "Ebikes",
    type: "ebike",
    transmission: "automatic",
    seats: 1,
    luggage: "light",
    descriptionShort: "Electric bikes for quiet, effortless coastal rides.",
    descriptionLong:
      "Our ebikes let guests glide along coastal roads and village lanes with minimal effort, ideal for those who wish to move gently and sustainably around the island.",
    tags: ["ebike", "slow-travel", "sustainable"],
    images: ["/images/vehicles/ebike-1.jpg"],
    pricing: {
      lowSeason: 30,
      highSeason: 35
    },
    visibleForPartners: ["therooster"]
  }
];


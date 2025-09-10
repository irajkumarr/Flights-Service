const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Seed Cities
  const cities = await prisma.city.createMany({
    data: [{ name: "Kathmandu" }, { name: "Pokhara" }, { name: "Bhairawa" }],
    skipDuplicates: true,
  });

  // 2. Seed Airports (linked to cities)
  const airports = await prisma.airport.createMany({
    data: [
      {
        name: "Tribhuvan International Airport",
        code: "TIA",
        address: "Kathmandu",
        cityId: 1, // Kathmandu
      },
      {
        name: "Pokhara International Airport",
        code: "PKR",
        address: "Pokhara",
        cityId: 2, // Pokhara
      },
      {
        name: "Gautam Buddha International Airport",
        code: "BWA",
        address: "Bhairawa",
        cityId: 3, // Bhairawa
      },
    ],
    skipDuplicates: true,
  });

  // 3. Seed Airplanes
  const airplanes = await prisma.airplane.createMany({
    data: [
      { modelNumber: "Boeing 737", capacity: 180 },
      { modelNumber: "Airbus A320", capacity: 150 },
      { modelNumber: "ATR 72", capacity: 70 },
    ],
    skipDuplicates: true,
  });

  // 4. Seed Flights
  const flights = await prisma.flight.createMany({
    data: [
      {
        flightNumber: "TI-101",
        airplaneId: 1, // Boeing 737
        departureAirportId: "TIA", // Kathmandu
        arrivalAirportId: "PKR", // Pokhara
        departureTime: new Date("2025-09-10T06:00:00Z"),
        arrivalTime: new Date("2025-09-10T07:00:00Z"),
        price: 4000,
        totalSeats: 180,
      },
      {
        flightNumber: "TI-202",
        airplaneId: 2, // Airbus A320
        departureAirportId: "PKR", // Pokhara
        arrivalAirportId: "BWA", // Bhairawa
        departureTime: new Date("2025-09-11T08:30:00Z"),
        arrivalTime: new Date("2025-09-11T09:30:00Z"),
        price: 3500,
        totalSeats: 150,
      },
    ],
    skipDuplicates: true,
  });

  // 5. Seed Seats for flights
  // (You can generate dynamically if you want full rows/cols)
  await prisma.seat.createMany({
    data: [
      { airplaneId: 1, row: 1, col: "A", type: "BUSINESS" },
      { airplaneId: 1, row: 1, col: "B", type: "BUSINESS" },
      { airplaneId: 1, row: 2, col: "A", type: "ECONOMY" },
      { airplaneId: 1, row: 2, col: "B", type: "ECONOMY" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

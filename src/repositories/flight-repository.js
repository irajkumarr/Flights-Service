const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

class FlightRepository extends CrudRepository {
  constructor() {
    super(prisma.flight);
  }

  async getAllFlights(filter, sort) {
    const response = await prisma.flight.findMany({
      where: filter,
      orderBy: sort,
      select: {
        id: true,
        flightNumber: true,
        departureTime: true,
        arrivalTime: true,
        price: true,
        boardingGate: true,
        totalSeats: true,
        // Relations
        airplane: true,
        departureAirport: {
          select: {
            id: true,
            name: true,
            code: true,
            address: true,
            createdAt: true,
            updatedAt: true,
            city: true,
          },
        },
        arrivalAirport: {
          select: {
            id: true,
            name: true,
            code: true,
            address: true,
            createdAt: true,
            updatedAt: true,
            city: true,
          },
        },
      },
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    return await prisma.$transaction(async (tx) => {
      // Lock the flight row for update
      const [flightRow] = await tx.$queryRaw`
      SELECT * FROM flights
      WHERE flights.id = ${flightId}::int
      FOR UPDATE
    `;

      if (!flightRow) {
        throw new AppError(
          "Flight not found in the database",
          StatusCodes.NOT_FOUND
        );
      }

      // Atomically increment or decrement totalSeats
      const updatedFlight = await tx.flight.update({
        where: { id: flightId },
        data: dec
          ? { totalSeats: { decrement: seats } }
          : { totalSeats: { increment: seats } },
      });

      return updatedFlight;
    });
  }
}

module.exports = FlightRepository;

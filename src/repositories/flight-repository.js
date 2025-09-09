const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");

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
}

module.exports = FlightRepository;

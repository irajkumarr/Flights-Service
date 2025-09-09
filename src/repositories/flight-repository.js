const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");

class FlightRepository extends CrudRepository {
  constructor() {
    super(prisma.flight);
  }

  async getAllFlights(filter) {
    const response = await prisma.flight.findMany({
      where: filter,
    });
    return response;
  }
}

module.exports = FlightRepository;

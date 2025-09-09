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
    });
    return response;
  }
}

module.exports = FlightRepository;

const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");

class FlightRepository extends CrudRepository {
  constructor() {
    super(prisma.flight);
  }
}

module.exports = FlightRepository;

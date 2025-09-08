const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");

class AirportRepository extends CrudRepository {
  constructor() {
    super(prisma.airport);
  }
}

module.exports = AirportRepository;

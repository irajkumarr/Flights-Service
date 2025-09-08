const CrudRepository = require("./crud-repository");
const { prisma } = require("../config");

class CityRepository extends CrudRepository {
  constructor() {
    super(prisma.city);
  }
}

module.exports = CityRepository;

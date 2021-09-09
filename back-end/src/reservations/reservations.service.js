const knex = require("../db/connection");

const tableName = "reservations";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function create(reservation) {
  return knex(tableNameWithAlias)
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list(date) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ reservation_date: date })
    .groupBy("reservation_id")
    .orderBy("reservation_time");
}

module.exports = {
  create,
  list,
};

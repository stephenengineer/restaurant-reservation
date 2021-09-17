const knex = require("../db/connection");

const tableName = "reservations";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function create(reservation) {
  return knex(tableNameWithAlias)
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ reservation_id })
    .then((returnedRecords) => returnedRecords[0]);
}

function update(reservation_id, status) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .then((updatedRecords) => updatedRecords[0]);
}

function list(date) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ reservation_date: date })
    .groupBy("reservation_id")
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  update,
  list,
  search,
};

const knex = require("../db/connection");

const tableName = "tables";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function create(table) {
  return knex(tableNameWithAlias)
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ table_id })
    .then((returnedRecords) => returnedRecords[0]);
}

function update(table_id, reservation_id) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ table_id })
    .update({ reservation_id })
    .then((updatedRecords) => updatedRecords[0]);
}

function list() {
  return knex(tableNameWithAlias)
    .select("*")
    .groupBy("table_id")
    .orderBy("table_name");
}

module.exports = {
  create,
  read,
  update,
  list,
};

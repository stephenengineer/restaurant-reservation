const knex = require("../db/connection");

const tableName = "tables";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function create(table) {
  return knex(tableNameWithAlias)
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list() {
  return knex(tableNameWithAlias)
    .select("*")
    .groupBy("table_id")
    .orderBy("table_name");
}

module.exports = {
  create,
  list,
};

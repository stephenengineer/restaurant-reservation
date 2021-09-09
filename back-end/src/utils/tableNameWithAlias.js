function tableNameWithAlias(tableName) {
  return `${tableName} as ${tableName[0]}`;
}

module.exports = tableNameWithAlias;

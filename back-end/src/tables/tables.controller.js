const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**
 * Validation handler for table creation
 */
function bodyValidation(req, res, next) {
  const { data: { table_name, capacity } = {} } = req.body;
  let message = "";
  if (!table_name) {
    message = "Table must include a table name";
  }
  if (table_name && table_name.length < 2) {
    message = "Table name must be at least 2 characters long";
  }
  if (capacity < 1 || !capacity) {
    message = "Table must have a capacity of at least 1";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
  res.locals.body = {
    table_name,
    capacity,
  };
  return next();
}

/**
 * Create handler for table resources
 */
async function create(req, res) {
  const table = res.locals.body;
  const data = await service.create(table);
  res.status(201).json({
    data,
  });
}

/**
 * List handler for table resources
 */
async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

module.exports = {
  create: [bodyValidation, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};

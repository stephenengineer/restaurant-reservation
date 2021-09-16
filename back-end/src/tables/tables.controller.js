const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

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
 * Check for existence of table
 */
async function tableExists(req, res, next) {
  const table = await service.read(req.params.tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: "Table cannot be found." });
}

/**
 * Validation for reservation ID in body
 */
function updateBodyValidation(req, res, next) {
  const { data: { reservation_id } = {} } = req.body;
  let message = "";
  if (!reservation_id) {
    message = "Body must include a reservation ID";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
  res.locals.body = { reservation_id };
  return next();
}

/**
 * Check for existence of reservation
 */
async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(
    res.locals.body.reservation_id
  );
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: "Reservation cannot be found." });
}

/**
 * Check for sufficient capacity and occupancy of table
 */
function capacityAndOccupancyValidation(req, res, next) {
  const { capacity, reservation_id } = res.locals.table;
  const { people } = res.locals.reservation;

  let message = "";
  if (capacity < people) {
    message =
      "Table capacity must be more than the number of people in the reservation";
  }
  if (reservation_id) {
    message = "Table must not be occupied";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
  return next();
}

/**
 * Check that table is occupied
 */
function tableOccupiedValidation(req, res, next) {
  const { reservation_id } = res.locals.table;

  let message = "";
  if (!reservation_id) {
    message = "Table must be occupied";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
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
 * Update handler for table resources
 */
async function update(req, res) {
  const table_id = res.locals.table.table_id;
  const reservation_id = res.locals.reservation.reservation_id;
  const data = await service.update(table_id, reservation_id);
  res.json({
    data,
  });
}

/**
 * Handler for removing reservation from table resource
 */
async function removeReservationUpdate(req, res) {
  const { table_id, reservation_id } = res.locals.table;
  const reservationsReservation_id = null;
  await service.update(
    table_id,
    reservationsReservation_id,
    reservation_id,
    "finished"
  );
  res.sendStatus(204);
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
  update: [
    asyncErrorBoundary(tableExists),
    updateBodyValidation,
    asyncErrorBoundary(reservationExists),
    capacityAndOccupancyValidation,
    asyncErrorBoundary(update),
  ],
  updateRemoveReservation: [
    asyncErrorBoundary(tableExists),
    tableOccupiedValidation,
    asyncErrorBoundary(removeReservationUpdate),
  ],
  list: asyncErrorBoundary(list),
};

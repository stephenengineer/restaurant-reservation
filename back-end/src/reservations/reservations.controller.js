const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * Validation handler for reservation creation
 */
function bodyValidation(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;
  let message = "";
  if (!first_name) {
    message = "Reservation must include a first name";
  }
  if (!last_name) {
    message = "Reservation must include a last name";
  }
  if (!mobile_number) {
    message = "Reservation must include a mobile number";
  }
  if (!reservation_date) {
    message = "Reservation must include a reservation date";
  }
  if (!reservation_time) {
    message = "Reservation must include a reservation time";
  }
  if (people <= 0 || !people) {
    message = "Reservation must have a number of people that is greater than 0";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
  res.locals.body = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  return next();
}

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const reservation = res.locals.body;
  const data = await service.create(reservation);
  res.status(201).json({
    data,
  });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;
  const data = await service.list(date);
  res.json({
    data,
  });
}

module.exports = {
  create: [bodyValidation, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};

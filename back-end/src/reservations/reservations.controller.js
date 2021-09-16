const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const specifiedTimeString = require("../utils/specifiedTimeString");
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
  res.locals.body = req.body.data;
  return next();
}

/**
 * Specified time constraints validation handler for reservation creation
 */
function dayAndTimeValidation(req, res, next) {
  const { reservation_date, reservation_time } = res.locals.body;
  const dateObject = new Date(reservation_date + "T" + reservation_time);
  const today = new Date();
  const [year, month, day] = [
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ];
  const todayObject = new Date(year, month, day);
  todayObject.setHours(0);

  const reservationTimeTruncated = reservation_time.match(/\d\d:\d\d/)[0];
  const timeNow = today.toTimeString().match(/\d\d:\d\d/)[0];

  let message = "";
  if (dateObject < today) {
    message = "Only future and present reservation dates are allowed";
  }
  if (dateObject.getDay() === 2) {
    message = "Reservation date must not be a Tuesday";
  }
  if (
    reservationTimeTruncated < specifiedTimeString(10, 30) ||
    reservationTimeTruncated > specifiedTimeString(21, 30)
  ) {
    message = "Reservation time must be between 10:30 AM and 9:30 PM";
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
 * Check for existence of reservation
 */
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: "Reservation cannot be found." });
}

/**
 * Validation handler for reservation update
 */
function statusValidation(req, res, next) {
  const acceptableStatus = ["booked", "seated", "finished"];
  const { data: { status } = {} } = req.body;
  let message = "";
  if (!acceptableStatus.includes(status)) {
    message = "Status must be 'booked', 'seated', or 'finished'.";
  }
  if (message.length) {
    next({
      status: 400,
      message: message,
    });
  }
  res.locals.body = req.body.data;
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
 * Read handler for reservation resources
 */
async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

/**
 * Update handler for reservation resources
 */
async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const { status } = res.locals.body;
  const data = await service.update(reservation_id, status);
  res.json({ data });
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
  create: [bodyValidation, dayAndTimeValidation, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    statusValidation,
    asyncErrorBoundary(update),
  ],
  list: asyncErrorBoundary(list),
};

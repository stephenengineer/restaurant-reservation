/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").post(controller.create).get(controller.list);
router.route("/:reservationId").get(controller.read);

module.exports = router;

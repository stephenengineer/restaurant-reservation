/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").post(controller.create).get(controller.list);
router.route("/:tableId/seat").put(controller.update);

module.exports = router;

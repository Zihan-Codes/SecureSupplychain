const express = require("express");
const { getNotifications, markAsRead } = require("../Controllers/NotificationController");

const router = express.Router();

router.get("/notifications", getNotifications); // User endpoint to get notifications
router.post("/notifications/read/:id", markAsRead); // Endpoint to mark notification as read

module.exports = router;

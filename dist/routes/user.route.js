"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const token_middleware_1 = require("../middlewares/token.middleware");
const router = (0, express_1.Router)();
router.get("/profile", token_middleware_1.verifyToken, user_controller_1.getUserProfile);
exports.default = router;

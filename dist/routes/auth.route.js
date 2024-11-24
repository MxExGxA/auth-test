"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router
    .post("/register", auth_controller_1.registerUser)
    .post("/login", auth_controller_1.loginUser)
    .post("/verify", auth_controller_1.verifyUser)
    .put("/update", auth_controller_1.updateUser)
    .get("/logout", auth_controller_1.logoutUser);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = require("./utils/db");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const cookieParser = require("cookie-parser");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)();
(0, db_1.db_connect)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)((0, cors_2.corsConfig)()));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api/auth", auth_route_1.default);
app.use("/api/user", user_route_1.default);
app.listen(4000, () => {
    console.log("server is running on port", 4000);
});

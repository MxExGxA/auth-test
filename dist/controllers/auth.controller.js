"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.verifyUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.create(req.body);
        if (!user) {
            return res.status(400).json({ error: "invalid data" });
        }
        const _a = user.toObject(), { password } = _a, data = __rest(_a, ["password"]);
        res.status(200).json({ message: "user created", user: data });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "invalid email or password" });
        }
        const passowdMatched = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!passowdMatched) {
            return res.status(400).json({ error: "invalid email or password" });
        }
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        const _a = user.toObject(), { password } = _a, data = __rest(_a, ["password"]);
        res
            .status(200)
            .cookie("echo", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, secure: true, httpOnly: true })
            .json({ message: "login success!", user: data, token: accessToken });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies) {
        return res.status(204).json({ error: "you are already logged out" });
    }
    res.clearCookie("echo", { secure: true, httpOnly: true }).json({ message: "logged out" });
});
exports.logoutUser = logoutUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.verifyUser = verifyUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateUser = updateUser;

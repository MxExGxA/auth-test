"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const corsConfig = () => {
    return {
        origin: `${process.env.CLIENT_URL}`,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    };
};
exports.corsConfig = corsConfig;

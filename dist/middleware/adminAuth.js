"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../utils/env");
const adminAuth = (req, _, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, env_1.JWT_ADMIN_SECRET !== null && env_1.JWT_ADMIN_SECRET !== void 0 ? env_1.JWT_ADMIN_SECRET : '');
        const { userId } = decodedToken;
        req.body.userId = userId;
        next();
    }
    catch (_) {
        const error = new Error();
        error.message = 'Could not authenticate; request failed.';
        error.statusCode = 401;
        next(error);
    }
};
exports.adminAuth = adminAuth;
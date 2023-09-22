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
const mongoose_1 = __importStar(require("mongoose"));
const EquipmentSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    domain: { type: String, require: false },
    serial: { type: String, require: false },
    notes: { type: String, require: false },
    files: { type: Array, require: false }
}, {
    versionKey: false,
    timestamps: true
});
const FileSchema = new mongoose_1.Schema({
    base64: { type: String, require: true },
    type: { type: String, require: true }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('Equipment', EquipmentSchema);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartment = exports.createDepartment = void 0;
const Department_1 = require("../entities/Department");
// Crear un departamento
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, department } = req.body;
        const _department = new Department_1.Department();
        _department.id = id;
        _department.department = department;
        yield _department.save();
        return res.json(_department);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: "Unknown error occurred" });
    }
});
exports.createDepartment = createDepartment;
// Obtener todos los departamentos
const getDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _department = yield Department_1.Department.find();
        return res.json(_department);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: "Unknown error occurred" });
    }
});
exports.getDepartment = getDepartment;

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";

import { User } from "../entities/User";
import { City } from "../entities/City";
import { Role } from "../entities/Role";

import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

export const createUser: RequestHandler = async (req, res) => {
    try {
        const { id, name, lastname, email, password, birth, gender, phone, created_at, id_city, id_role } = req.body;

        // Search city and role by their IDs
        const city = await City.findOneBy({ id: id_city });
        const role = await Role.findOneBy({ id: id_role });

        const _user = new User();

        if (!city) {
            res.status(400).json({ message: 'City not found' });
        } else {
            _user.city = city;
        }

        if (!role) {
            res.status(400).json({ message: 'Role not found' });
        } else {
            _user.role = role;
        }

        _user.id = id;
        _user.name = name;
        _user.lastname = lastname;
        _user.email = email;
        _user.password = hashPassword(password);
        _user.birth = birth;
        _user.gender = gender;
        _user.phone = phone;
        _user.created_at = created_at;

        await _user.save();

        const token = jwt.sign(
            {
                id: _user.id,
                email: _user.email,
                name: _user.name,
                lastname: _user.lastname,
                role: _user.role.role,
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        // Crear cookie con el token
        res.cookie(COOKIE_SECRET_KEY, token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600000 * 24, // 1 día
            secure: false,//process.env.NODE_ENV === "production",
        });

        res.status(201).json(_user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const loginUser: RequestHandler = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            select: ["id", "name", "lastname", "email", "password"],
            relations: ["role"]
        });

        if (!user || !verifyPassword(password, user.password)) {
            res.status(401).json({ message: "Invalid credentials" });
        } else {
            // Generate token
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                role: user.role.role
            },
                JWT_SECRET_KEY, {
                expiresIn: "1d"
            })

            res.cookie(COOKIE_SECRET_KEY, token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000 * 24,
                secure: process.env.NODE_ENV === "production",
                path: "/",

            })
                .status(200).json({ message: "Login successful", user });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const logoutUser: RequestHandler = (req, res) => {
    res.clearCookie(COOKIE_SECRET_KEY, {
        httpOnly: true,
        secure: false, //process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
        .status(200).json({ message: "Logged out successfully" });
};

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const _user = await User.find();
        res.json(_user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _user = await User.findOneBy({ id: parseInt(id) })

        if (!_user) res.status(404).json({ message: "User not found" })

        await User.update({ id: parseInt(id) }, req.body)
        const updatedUser = await User.findOneBy({ id: parseInt(id) })
        res.status(200).json(updatedUser)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "User not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _user = await User.findOneBy({ id: parseInt(id) })

        if (!_user) {
            res.status(404).json({ message: "User not found" })
        }

        res.json(_user)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getUserByCookie: RequestHandler = async (req, res) => {
    try {
        // Obtener el ID del usuario directamente desde el token
        const userId = TokenUtils.getUserIdFromRequest(req);

        if (!userId) {
            res.status(401).json({ message: "No token provided or invalid token" });
        } else {
            const user = await User.findOneBy({ id: userId });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(user);
            }
        }
    } catch (err) {
        console.error("Error in getUserByCookie:", err);
        res.status(500).json({
            message: err instanceof Error ? err.message : "Unknown error occurred"
        });
    }
};

export const getCookieExists: RequestHandler = async (req, res) => {
    try {
        const token = req.cookies.SESSIONPON;

        const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };

        const isAuthenticated = !!decoded && typeof decoded.id === 'number';

        if (token === undefined) {
            res.status(401).json({ message1: "No token provided" });
        } else {
            res.json({ isAuthenticated: isAuthenticated })
        }


    } catch (err) {
        if (err instanceof Error) {
            console.error("Error:", err);
            res.status(500).json({ message2: err.message });
        } else {
            res.status(500).json({ message3: "Unknown error occurred" });
        }
    }
};

export const getRoleByCookie: RequestHandler = async (req, res) => {
    try {
        const role = TokenUtils.getRoleFromRequest(req);

        if (!role) {
            res.status(401).json({ message1: "No token provided" });
        } else {
            res.json({ role })
        }

    } catch (err) {
        console.error("Error in getRoleByCookie:", err);
        res.status(500).json({
            message: err instanceof Error ? err.message : "Unknown error occurred"
        });
    }
};
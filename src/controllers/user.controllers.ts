import { RequestHandler } from "express";
import { User } from "../entities/User";
import { City } from "../entities/City";
import { Role } from "../entities/Role";

import { hashPassword, verifyPassword } from "../utils/encryption";

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

        const user = await User.findOne({ where: { email }, select: ["password"] });

        if (user && verifyPassword(password, user.password)) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
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

        res.sendStatus(204)
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

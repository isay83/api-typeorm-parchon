import { RequestHandler } from "express";
import { User } from "../entities/User";
import { City } from "../entities/City";
import { Role } from "../entities/Role";

export const createUser: RequestHandler = async (req, res) => {
    try {
        const { id, name, lastname, email, password, birth, gender, phone, created_at, id_city, id_role } = req.body;

        // Search city and role by their IDs
        const city = await City.findOneBy({ id: id_city });
        const role = await Role.findOneBy({ id: id_role });

        const _user = new User();
        _user.id = id;
        _user.name = name;
        _user.lastname = lastname;
        _user.email = email;
        _user.password = password;
        _user.birth = birth;
        _user.gender = gender;
        _user.phone = phone;
        _user.created_at = created_at;

        // Verify if the city and role exist
        if (!city || !role) {
            res.status(400).json({ message: 'City or Role not found' });
        } else {
            _user.id_city = city;
            _user.id_role = role;
        }


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

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
        }

        if (user?.password !== password) {
            res.status(401).json({ message: "Credenciales inválidas" });
        }

        /*
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        */

        res.status(200).json({ message: "Login successful", user });
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

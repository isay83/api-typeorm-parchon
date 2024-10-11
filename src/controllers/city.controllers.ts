import { RequestHandler } from "express";
import { City } from "../entities/City";

export const createCity: RequestHandler = async (req, res) => {
    try {
        const { id, city, id_department } = req.body;

        const _city = new City();
        _city.id = id;
        _city.city = city;
        _city.id_department = id_department;

        await _city.save();

        res.status(201).json(_city);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getCities: RequestHandler = async (req, res) => {
    try {
        const _city = await City.createQueryBuilder('city')
            .select(["city.id", "city.city"])
            .getMany();

        res.json(_city);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateCity: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _city = await City.findOneBy({ id: parseInt(id) })

        if (!_city) res.status(404).json({ message: "City not found" })

        await City.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteCity: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await City.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "City not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getCity: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _city = await City.findOneBy({ id: parseInt(id) })

        if (!_city) {
            res.status(404).json({ message: "City not found" })
        }

        res.json(_city)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

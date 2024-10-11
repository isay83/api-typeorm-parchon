import { RequestHandler } from "express";
import { Category } from "../entities/Category";

export const createCategory: RequestHandler = async (req, res) => {
    try {
        const { id, category } = req.body;

        const _category = new Category();
        _category.id = id;
        _category.category = category;

        await _category.save();

        res.status(201).json(_category);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getCategories: RequestHandler = async (req, res) => {
    try {
        const _category = await Category.find();
        res.json(_category);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateCategory: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _category = await Category.findOneBy({ id: parseInt(id) })

        if (!_category) res.status(404).json({ message: "Category not found" })

        await Category.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteCategory: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Category.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Category not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getCategory: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _category = await Category.findOneBy({ id: parseInt(id) })

        if (!_category) {
            res.status(404).json({ message: "Category not found" })
        }

        res.json(_category)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

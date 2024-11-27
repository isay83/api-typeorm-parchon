import { RequestHandler } from "express";
import cloudinary from "../config/cloudinary";
import { Image } from "../entities/Image";
import { Event } from "../entities/Event";
import { User } from "../entities/User";
import fs from "fs"

export const createImage: RequestHandler = async (req, res) => {
    try {
        const { id, created_at, id_event, id_user } = req.body;

        const file = req.file

        if (!file) {
            res.status(400).json({ message: "Image file is required" });
        } else {
            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: "event_images",
            });

            // Delete temp file
            fs.unlinkSync(file.path);

            const event = await Event.findOneBy({ id: id_event });
            const user = await User.findOneBy({ id: id_user });

            const _image = new Image();

            if (!event) {
                res.status(400).json({ message: 'Event not found' });
            } else {
                _image.event = event;
            }

            if (!user) {
                res.status(400).json({ message: 'User not found' });
            } else {
                _image.user = user;
            }

            _image.id = id;
            _image.url = uploadResult.secure_url;
            _image.created_at = created_at;

            await _image.save();

            res.json(_image);
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getImages: RequestHandler = async (req, res) => {
    try {
        const _image = await Image.find();
        res.json(_image);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getImagesFullData: RequestHandler = async (req, res) => {
    try {
        const _image = await Image.createQueryBuilder("image")
            .leftJoinAndSelect("image.event", "event")
            .leftJoinAndSelect("image.user", "user")
            .select([
                "image.id",
                "image.url",
                "image.created_at",
                "event.event",
                "user.name",
                "user.lastname"
            ])
            .getMany();

        res.json(_image);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateImage: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _image = await Image.findOneBy({ id: parseInt(id) })

        if (!_image) res.status(404).json({ message: "Image not found" })

        await Image.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteImage: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Image.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Image not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getImage: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _image = await Image.findOneBy({ id: parseInt(id) })

        if (!_image) {
            res.status(404).json({ message: "Image not found" })
        }

        res.json(_image)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
function leftJoinAndSelect(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
}


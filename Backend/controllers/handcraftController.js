import * as handcraftModel from '../modules/handcraftModel.js';

const getHandcraft = async (req, res) => {
    try {
        const handcraft = await handcraftModel.getAllHandcraft();

        res.status(200).json(handcraft);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch handcraft',
            error: error.message
        });
    }
};

const getHandcraftItem = async (req, res) => {
    try {
        const handcraft = await handcraftModel.getHandcraftById(req.params.id);

        if (!handcraft) {
            return res.status(404).json({
                message: 'Handcraft item not found'
            });
        }

        res.status(200).json(handcraft);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch handcraft item',
            error: error.message
        });
    }
};

const createHandcraft = async (req, res) => {
    try {
        const handcraftId = await handcraftModel.createHandcraft(req.body);

        res.status(201).json({
            message: 'Handcraft created successfully',
            id: handcraftId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create handcraft',
            error: error.message
        });
    }
};

const updateHandcraft = async (req, res) => {
    try {
        const handcraft = await handcraftModel.getHandcraftById(req.params.id);

        if (!handcraft) {
            return res.status(404).json({
                message: 'Handcraft item not found'
            });
        }

        await handcraftModel.updateHandcraft(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Handcraft updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update handcraft',
            error: error.message
        });
    }
};

const deleteHandcraft = async (req, res) => {
    try {
        const handcraft = await handcraftModel.getHandcraftById(req.params.id);

        if (!handcraft) {
            return res.status(404).json({
                message: 'Handcraft item not found'
            });
        }

        await handcraftModel.deleteHandcraft(req.params.id);

        res.status(200).json({
            message: 'Handcraft deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete handcraft',
            error: error.message
        });
    }
};

export {
    getHandcraft,
    getHandcraftItem,
    createHandcraft,
    updateHandcraft,
    deleteHandcraft
};

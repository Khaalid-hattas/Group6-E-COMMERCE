import * as handmadeModel from '../modules/handmadeModel.js';

const getHandmade = async (req, res) => {
    try {
        const handmade = await handmadeModel.getAllHandmade();

        res.status(200).json(handmade);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch handmade products',
            error: error.message
        });
    }
};

const getHandmadeItem = async (req, res) => {
    try {
        const handmade = await handmadeModel.getHandmadeById(req.params.id);

        if (!handmade) {
            return res.status(404).json({
                message: 'Handmade product not found'
            });
        }

        res.status(200).json(handmade);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch handmade product',
            error: error.message
        });
    }
};

const createHandmade = async (req, res) => {
    try {
        const handmadeId = await handmadeModel.createHandmade(req.body);

        res.status(201).json({
            message: 'Handmade product created successfully',
            id: handmadeId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create handmade product',
            error: error.message
        });
    }
};

const updateHandmade = async (req, res) => {
    try {
        const handmade = await handmadeModel.getHandmadeById(req.params.id);

        if (!handmade) {
            return res.status(404).json({
                message: 'Handmade product not found'
            });
        }

        await handmadeModel.updateHandmade(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Handmade product updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update handmade product',
            error: error.message
        });
    }
};

const deleteHandmade = async (req, res) => {
    try {
        const handmade = await handmadeModel.getHandmadeById(req.params.id);

        if (!handmade) {
            return res.status(404).json({
                message: 'Handmade product not found'
            });
        }

        await handmadeModel.deleteHandmade(req.params.id);

        res.status(200).json({
            message: 'Handmade product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete handmade product',
            error: error.message
        });
    }
};

export {
    getHandmade,
    getHandmadeItem,
    createHandmade,
    updateHandmade,
    deleteHandmade
};

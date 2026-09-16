import * as artworkModel from '../modules/artworkModel.js';

const getArtwork = async (req, res) => {
    try {
        const artwork = await artworkModel.getAllArtwork();

        res.status(200).json(artwork);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch artwork',
            error: error.message
        });
    }
};

const getArtworkItem = async (req, res) => {
    try {
        const artwork = await artworkModel.getArtworkById(req.params.id);

        if (!artwork) {
            return res.status(404).json({
                message: 'Artwork not found'
            });
        }

        res.status(200).json(artwork);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch artwork',
            error: error.message
        });
    }
};

const createArtwork = async (req, res) => {
    try {
        const artworkId = await artworkModel.createArtwork(req.body);

        res.status(201).json({
            message: 'Artwork created successfully',
            id: artworkId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create artwork',
            error: error.message
        });
    }
};

const updateArtwork = async (req, res) => {
    try {
        const artwork = await artworkModel.getArtworkById(req.params.id);

        if (!artwork) {
            return res.status(404).json({
                message: 'Artwork not found'
            });
        }

        await artworkModel.updateArtwork(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Artwork updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update artwork',
            error: error.message
        });
    }
};

const deleteArtwork = async (req, res) => {
    try {
        const artwork = await artworkModel.getArtworkById(req.params.id);

        if (!artwork) {
            return res.status(404).json({
                message: 'Artwork not found'
            });
        }

        await artworkModel.deleteArtwork(req.params.id);

        res.status(200).json({
            message: 'Artwork deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete artwork',
            error: error.message
        });
    }
};

export {
    getArtwork,
    getArtworkItem,
    createArtwork,
    updateArtwork,
    deleteArtwork
};

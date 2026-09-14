const creatorModel = require('../modules/creatorModel');

const getCreators = async (req, res) => {
    try {
        const creators = await creatorModel.getAllCreators();

        res.status(200).json(creators);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch creators',
            error: error.message
        });
    }
};

const getCreator = async (req, res) => {
    try {
        const creator = await creatorModel.getCreatorById(req.params.id);

        if (!creator) {
            return res.status(404).json({
                message: 'Creator not found'
            });
        }

        res.status(200).json(creator);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch creator',
            error: error.message
        });
    }
};

module.exports = {
    getCreators,
    getCreator
};
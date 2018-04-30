const Tag = require('../../../models/tag').TagModel;

module.exports = async (req, res) => {
    try {
        let tags = await Tag.find({});
        const response = {
            success: true,
            msg: 'tags given',
            body: tags
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}
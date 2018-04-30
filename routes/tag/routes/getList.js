const Tag = require('../../../models/tag').TagModel;

module.exports = async (req, res) => {
    try {
        let name = req.params.name;
        let re = new RegExp('^(' + name + ')', 'ig');
        let tags = await Tag.find({name: re});
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
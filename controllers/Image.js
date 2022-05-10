const crypto = require('crypto');

const imageController = {
  upload: async (req, res) => {
    const imageFromClient = req.file;
    const imageTypePattern = /^image\/(png)|(jpeg)|(gif)$/;
    console.log(imageFromClient);
    if (!imageTypePattern.test(imageFromClient.mimetype)) {
      res.json({
        status: '0010',
        statusText: 'Only allow png, gif, jpeg.',
      });
    }
    if (imageFromClient.size > 30000) {
      res.json({
        status: '0010',
        statusText: 'Image size too large.',
      });
    }

    res.json({
      status: '0000',
      statusText: 'OK',
    });
  },
};

module.exports = imageController;

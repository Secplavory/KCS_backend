const crypto = require('crypto');

const imageController = {
  upload: async (req, res) => {
    if (req.file === undefined) {
      res.json({
        status: '0010',
        statusText: 'No image upload.',
      });
    }
    res.json({
      status: '0000',
      statusText: 'OK',
      fileName: req.file.filename,
    });
  },
};

module.exports = imageController;

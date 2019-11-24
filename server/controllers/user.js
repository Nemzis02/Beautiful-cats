const path = require('path');

module.exports.putSendImages = (req, res, next) => {
  res.status(201).json({
    message: 'The image successfully saved',
    data: {
      imagePath: `images/${req.file.filename}`,
      fileName: req.file.filename
    },
    status: 'success'
  });
};

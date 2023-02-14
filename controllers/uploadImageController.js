const path = require('path')

const uploadImageController = async (req, res) => {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).json({ msg: 'No files were uploaded.' });
  }

  file = req.files.image;

  const randomName = (Math.random() + 1).toString(36).substring(7);
  const extname = path.extname(file.name)
  const fileName = `${randomName}${extname}`

  uploadPath = `${__dirname}/../public/images/${fileName}`

  // Use the mv() method to place the file somewhere on your server
  await file.mv(uploadPath, function (error) {
    if (error) return res.status(500).json({ msg: error });

    return res.json({ msg: 'File uploaded!', url: `${process.env.BASE_URL}/images/${fileName}` });
  })
}

module.exports = {
  uploadImageController
}

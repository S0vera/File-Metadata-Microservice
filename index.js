const express = require('express');
const cors = require('cors');
const multer = require("multer")
require('dotenv').config()

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // Access the uploaded file
  const uploadedFile = req.file;

  // Access file name
  const fileName = uploadedFile.originalname;

  // Access file type (MIME type)
  const fileType = uploadedFile.mimetype;

  // Access file size in bytes
  const fileSize = uploadedFile.size;

  res.json({ name: fileName, type: fileType, size: fileSize });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

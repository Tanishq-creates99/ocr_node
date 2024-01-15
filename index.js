const tesseract = require("tesseract.js");
const multer = require("multer"); // To handle file uploads
const express = require("express");
const fs = require('fs');
const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//defining storage object with our custom destination
const upload = multer({ storage: storage }).single("avatar");


//setting viewing engine to operate ejs 
app.set("view engine", "ejs");

//Parse JSON request bodie
app.get("/", (req, res) => {
  res.render("index");
});


app.post("/upload", async (req, res) => {
  upload(req, res, (err) => {
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if (err) return console.log("This is the error ", err);

      tesseract
        .recognize(data, "eng", { logger: (info) => console.log(info),
          oem: 3, 
          psm: 11,
        })
        .then((result) => {
          const recognizedText = result.data.text;
          // Render the "result" view with the recognized text
          res.render("result", { recognizedText });
        })
        .catch((error) => {
          console.log(error.message);
          // Handle errors and render an error page if needed
          res.status(500).send("Error occurred during OCR.");
        });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is at port 3000");
});

const express = require ('express');
const path = require('path');
const multer = require('multer');


//initialitations
const app = express();

//settings
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middelwares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits:{fileSize: 1000000},
    fileFilter: (req, file,cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: l'arxiu ha de ser una imatge vàlida");
    }
}).single('image'));

//Routes
app.use(require('./routes/index.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen (app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
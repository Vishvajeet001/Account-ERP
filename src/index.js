const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');
const company_reg = require('./config');
const director_reg = require('./config');
const dfload = require('./config');
const ofload = require('./config');
const company_detail_reg = require('./config');
const qpage_schema = require('./config');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'director_files/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload1 = multer({ storage: storage1 });

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'other_files/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload2 = multer({ storage: storage2 });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/fgpass', (req, res) => {
    res.render('fgpass');
});

app.get('/creg', (req, res) => {
    res.render('creg');
});

app.get('/dreg', (req, res) => {
    res.render('dreg');
});

app.get('/dfload', (req, res) => {
    res.render('dfload');
});

app.get('/ofload', async(req, res) => {
    res.render('ofload');
});

app.get('/cdreg', async(req, res) => {
    res.render('cdreg');
});

app.get('/qpage', async(req, res) => {
    res.render('qpage');
});

app.post('/signup', async(req, res) => {
    const data = {
        email: req.body.email,
        password:  req.body.password
    }
    const existingUser = await collection.findOne({email: data.email});
    if(existingUser){
        res.send('User already exists');
    }else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        data.password =  hashedPassword;
    }
    const userdata = await collection.insertMany(data);
    res.render('login');
    console.log(userdata);
});

app.post('/login', async(req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check){
            res.send('User does not exist');
        }
        const match = await bcrypt.compare(req.body.password, check.password);
        if(match){
            res.render('home');
        }else{
            res.send('Incorrect Password');
        }
    }catch{
        res.send('Incorrect Details');
    }
});

app.post('/fgpass', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.render('login');
    } catch (error) {
        res.status(500).send('Error resetting password');
    }
});

app.post('/creg', upload.single('addressProof'),async(req, res) => {
    const data = {
        name: req.body.name,
        type: req.body.type,
        purpose: req.body.purpose,
        paidCapital: req.body.paidCapital,
        authorizedCapital: req.body.authorizedCapital,
        reservation: req.body.reservation === 'Reserved',
        address: req.body.address,
        addressProof: req.file.path
    }

    const userdata = await company_reg.insertMany(data);
    res.render('home');
    console.log(userdata);
});

app.post('/dreg', async(req, res) => {
    const data = {
        name: req.body.name,
        DOB: req.body.DOB,
        MOBno: req.body.MOBno,
        sharePattern: req.body.sharePattern,
        education: req.body.education,
        DINno: req.body.DINno,
        PANno: req.body.PANno,
        email: req.body.email,
        Gender: req.body.Gender,
        occupation: req.body.occupation
    }

    const userdata = await director_reg.insertMany(data);
    res.render('home');
    console.log(userdata);
});

app.post('/dfload', upload1.fields([{name:'PAN'},{name:'Passport'},{name:'DrLic'},{name:'VotingCard'},{name:'bankHistory'},{name:'LightBill'},{name:'photo'},{name:'sign'}]), async(req, res) => {
    const data = {
        PAN: req.files['PAN'][0].path,
        Passport: req.files['Passport'][0].path,
        DrLic: req.files['DrLic'][0].path,
        VotingCard: req.files['VotingCard'][0].path,
        bankHistory: req.files['bankHistory'][0].path,
        LightBill: req.files['LightBill'][0].path,
        photo: req.files['photo'][0].path,
        sign: req.files['sign'][0].path,
    }
    const userdata = await dfload.insertMany(data);
    res.render('home');
    console.log(userdata);
});

app.post('/ofload',  upload2.fields([{name:'other'},{name:'DLNOC'},{name:'ULNOC'}]),async(req, res) => {
    const data = {
        other: req.files['other'][0].path,
        DLNOC: req.files['DLNOC'][0].path,
        ULNOC: req.files['ULNOC'][0].path
    }
    const userdata = await ofload.insertMany(data);
    res.render('home');
    console.log(userdata);
});

app.post('/cdreg', async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        mobno: req.body.mobno,
        address: req.body.address,
        purpose: req.body.purpose,
        objectives: req.body.objectives
    }
    const userdata = await company_detail_reg.insertMany(data);
    res.render('home');
    console.log(userdata);
});

app.post('/qpage', async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        mobno: req.body.mobno,
        address: req.body.address,
        purpose: req.body.purpose,
        qno: req.body.qno,
        exp: req.body.exp
    }
    const userdata = await qpage_schema.insertMany(data);
    res.render('home');
    console.log(userdata);
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
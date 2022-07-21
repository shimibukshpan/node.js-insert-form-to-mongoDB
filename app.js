//prot
const port = 5000;
//mongoose = mongo db
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/homeWorkNodeJS");
let mySchema = new mongoose.Schema({
 firstname: String,
 lastname: String,
 email:String,
 phon:Number
});
let User = mongoose.model("User", mySchema);

let express = require('express');
let app = express();

app.set('view engine', 'ejs');

const path = require("path");
const publicDirectoryPath = path.join(__dirname, "./mySite");
app.use(express.static(publicDirectoryPath));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', (req, res) => {
    let myData = new User(req.query);
    myData.save()
    console.log(req.query);
    res.render('index');
});

app.post('', (req, res) => {
    let myData = new User(req.body);
    myData.save()
    // .then(item =>{
    //     res.send("item saved to database");
    // })
    // .catch(err =>{
    //     res.status(400).send("unable to save to database");
    // });
    console.log(req.body);
    res.render('savedform');
});

app.listen(port, () => console.log('Example app listening on port '+ port));

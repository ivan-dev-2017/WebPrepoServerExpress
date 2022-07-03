const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler')

//
const bodyParser = require('body-parser');



const app = express();
const port = 3333;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
const servicio = require('./app/servicio/prepoServicio.js');
//var funciones = require("../utilitario/funciones.js");


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(servicio.log_sistema);
/*app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); */



app.get("/guardarPregunta", servicio.guardarServicio);

app.post("/login",servicio.autenticacion);
app.post("/loginHash",servicio.autenticacionHash);


app.post('/users', function(req, res) {
  const user_id = req.body.id;
  const token = req.body.token;


  res.send({
    'user_id': user_id,
    'token': token,
  });
});


app.listen(port, () => {
	servicio.cargarUsuarios();	
	
	console.log(`Rest Server running at http://localhost:${port}`)
})




/*app.get("/", (req, res) => {
  res.json({ message: "Rest Server ;)" });
});*/

/*
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/prepo1', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });

console.log(silence.name); // 'Silence'


let consulta = (req, res) => {
	
silence.save(function(err, doc) {
  if (err) return console.error(err);
  console.log("Document inserted succussfully!");
});
	res.send("saved");
}
*/
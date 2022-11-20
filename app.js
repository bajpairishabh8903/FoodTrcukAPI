const express=require('express')
require('dotenv').config();

const app=express()
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:100000 }));

var cors = require('cors')
app.use(cors());
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('Public'))

const routes=require('./Routes/routes')

app.use('/',routes)

app.use((req,res)=>{
    res.status(404).sendFile(__dirname+'/Views/404.html')
})

app.listen(process.env.PORT)
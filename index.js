const express = require('express');
const router =require('./src/routes');
const cors=require('cors');
const app = express();
app.use(express.urlencoded({limit:'20MB',extended:true,parameterLimit:20000}));

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/image',express.static('image'))

app.listen(8080, () => console.log('app listening at 8080'));

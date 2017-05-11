const express = require('express');
const fs= require('fs');

const port = process.env.PORT||3000;
var app = express();

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`Now: ${now}: ${req.method} ${req.url}`; //this logs to the server console not the client
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance')
// })

app.set('view engine','pug');

app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express</h1>');
  res.render('home',{
    title:"Home"
  });
})

app.get('/about',(req,res)=>{
  res.render('about.pug',{
    title: "About Page"
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:"Error handling request",
    errorReason:"Because I said so"
  })
})



app.listen(port,()=>{
  console.log(`Server is up at ${port}`);
});

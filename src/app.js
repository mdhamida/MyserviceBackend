const express = require('express');
const { render } = require('express/lib/response');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const path = require("path")
require("./db/conn")
const User = require("./models/userSMS")
// const hbs = require('hbs')
var hbs = require('hbs');
const async = require('hbs/lib/async');
const port = process.env.PORT || 8000;






// for static website..path.............

 const staticPath = path.join(__dirname,"../public")
//  const templatePath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
 const templatepath = path.join(__dirname,"../templates/views")
//  const partialpath = path.join(__dirname,"../templates/partials")


   // project walaa hai path public content
// middleware......................
app.use('/css' , express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js' , express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/jq' , express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.use(express.static(staticPath))

    


// app.set('view engine ' , 'hbs')
// app.set("views" , templatepath);
// hbs.registerPartials(partialpath)



// to set the views engine
app.set("view engine"  , "hbs" )

// change views directory
app.set('views' , templatepath)

// partials for components

hbs.registerPartials(partialsPath)

app.use(express.urlencoded({extended:false}))



// routing ..................   static ke liye res and dynamic ke liye render and page name
// app.get(path , callback)

app.get("" , (req  , res)=>{
    res.render("index.hbs");
     });

app.get("/about" , (req , res) =>{
    res.render("contact")
})


// app.get("/contact" , (req , res) =>{
//     res.render("contact")
// })

app.post("/contact" ,async(req, res) =>{

    try {
        const userData = new User(req.body);
      await  userData.save();
      res.status(201).render("index")
    //   res.send(res.body)  
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/blog" , (req , res) =>{
    res.render("/contact")
})



// server created................

app.listen(port , (req,res) =>[
    console.log(`server is running  on port ${port}`)
])
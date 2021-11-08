const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const requests=require("requests");

const templepath=path.join(__dirname,"/template/view");
const partialPath=path.join(__dirname,"/template/partials");


// app.get("/",(req,res)=>{
//     res.send({
//         munish:1,
//         name:"kumar koundal",
//         class:"4th year",
//         college:"bcet gurdaspur"

    
// })
// });
hbs.registerPartials(partialPath);
 
app.set("view engine","hbs");
app.set("views",templepath);
app.get("/about",(req,res)=>{
    res.render('index',{partials:"partial"});
});
app.get("/temp",(req,res)=>{
    res.render("index");

});


app.get("/",(req,res)=>{
    res.render('index',{menu:"index"});
});

app.get("/music",(req,res)=>{
    res.render("music",{menu1:"index"});
});
app.get("/contact",(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=52b2b45a216b0936bf9b04e339cdfbf9`)
.on('data', (chunk) =>{
    const objdata=JSON.parse(chunk);
    const arrData=[objdata];
 console.log(`city name is${arrData[0].name} and temperature is ${arrData[0].main.temp}`);
res.send(arrData[0].name);
 //res.write(arrData[0].main.temp);
//  const realTimeData=arrData.map((val)=>{
//      replaceVal(homeFile,val);
     
//  })
})
.on('end', (err)=> {
  if (err) return console.log('connection closed due to errors', err);
res.end();
  console.log('end');
});
    }

)
app.get("/name",(req,res)=>{
    
    res.render('name',{partial:"index"});
});

app.get("*",(req,res)=>{
    res.render("404",{errorControl:"hi this page is not found"})
});

app.listen("8000",()=>{
    console.log("lsitenig to port no");
});
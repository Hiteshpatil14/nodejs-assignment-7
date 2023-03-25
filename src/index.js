const fs=require("fs")
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { json } = require("express");
const student=require("./InitialData")
const port = 8080
app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//to get all students data


app.get("/api/student",(req,resp)=>{
     resp.status(200).json({
        status:"success",
        student
     })
})

//to get perticuler student data
app.get("/api/student/:id",(req,resp)=>{
   const data=student.filter(element=>{
      return element.id==req.params.id
   })

   if(!data.length){
    resp.status(404).json({
        error:"invalid id"
    })
   }else{
   resp.status(200).json({
    status:"success",
    studentdata:data[0]
   })}
})


// to add the new student

app.post("/api/student",(req,resp)=>{
    if(!req.body.name || !req.body.currentClass || !req.body.division){
       return resp.status(200).json({
            error:"incomplete details"
        })
    }
    const data={id:student.length+1,...req.body}

    student.push(data)
    resp.status(200).send({id:data.id})
    
})

//to updata the student data

app.put("/api/student/:id",(req,resp)=>{
    if(req.params.id>student.length ){
       return resp.status(400).json({error:"invalid id"})
    }
    else if(!req.body.name || !req.body.currentClass || !req.body.division){
       return resp.status(400).json({error:"invalid detail"})
    }
    
    student[req.params.id-1]=req.body
   //  console.log(student)
    resp.status(200).json({name: student[req.params.id-1].name})
    
})

//to delete some entries from student data
app.delete("/api/student/:id",(req,resp)=>{
    if(req.params.id>student.length ){
        return resp.status(400).json({error:"invalid id"})
     }
     student.splice(req.params.id-1,1)
   //   console.log(student)
     resp.status(200).json({message:"student deleted successfully"})
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
// using express
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json())
app.use(cors())
//sample inmemory storage
//let todos=[];
//connecting mongdb
mongoose.connect('mongodb://localhost:27017/mernapp').then(()=>{
    console.log("db connected")
})
.catch((err)=>
{
    console.log(err)
})

//creat schema
const todoschema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    descryption:String
})
//cr8 model
const todomodel=mongoose.model(`Todo`,todoschema);
app.post('/todos',async(req,res)=>{
    const{title,descryption}=req.body;
    //const newtodo={
      //  id:todos.length+1,
       // title,
        //descryption
    //};
    //todos.push(newtodo);
    //console.log(todos);
    try{
    const newtodo= new todomodel({title,descryption});
    await newtodo.save();
res.status(201).json(newtodo);}
    catch(error){
console.log(error);
res.status(500).json({message:error.message});
    }
    
})//getting items
app.get('/todos',async(req,res)=>{
    try{
         const todos= await todomodel.find();
         res.json(todos);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:ErrorEvent.message});
    }
    res.json(todos);
})

//update
app.put('/todos/:id', async (req,res)=>{
    try{
     const{title,descryption}=req.body;
     const id=req.params.id;
      const up= await todomodel.findByIdAndUpdate(
        id,
        {title,descryption},
        {new:true}
     )
if(!up){
    return res.status(404).json({message:"todo not found"})
}
res.json(up)}
catch(error){
console.log(error)
res.status(500).json({message:error.message});
}


})

//delete
app.delete('/todos/:id', async(req,res)=>{
   
   try{ const id=req.params.id;
    await todomodel.findByIdAndDelete(id);
    res.status(204).end();}
    catch(error){
        console.log(error)
res.status(500).json({message:error.message});

    }
})
//st server
const port=8000;
app.listen(port,()=>{
    console.log("server listening to port"+port);
})
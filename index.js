const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const StudentModel = require('./models/Student');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cpriyankara:admin@cluster0.otque.mongodb.net/student-management?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.post('/insert',async (req,res)=>{
    const student = new StudentModel({name:req.body.name, age:req.body.age, degree:req.body.degree});
    await student.save();
    res.send('Inserted data');
});

app.get('/get-all', async (req,res)=>{
    await StudentModel.find({},(err, result)=>{
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', async (req, res)=>{
    const newName = req.body.newName;
    const id = req.body.id;
    try {
        // await StudentModel.findByIdAndUpdate({_id:id},{name:newName})
        await StudentModel.findById(id, (error, studentToUpdate)=>{
            studentToUpdate.name = newName;
            studentToUpdate.save();
        });
    }catch(err) {
        console.log(err);
    }
    res.send('Updated');
});

app.delete('/delete/:id',async(req,res)=>{
    await StudentModel.findByIdAndDelete(req.params.id).exec();
    res.send("Student Removed.");
});

app.listen(3001, ()=>{
    console.log("Server is listening");
});
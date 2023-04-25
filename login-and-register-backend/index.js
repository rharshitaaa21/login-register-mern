import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));


(async () => {
    try {
      await mongoose.connect("mongodb+srv://harshitaraghav2001:admin@login-register-app.8oyb9ss.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DB connected");
    } catch (err) {
      console.error("Error connecting to database", err);
    }
  })();
  
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)
  

  app.post("/login", async (req, res) => {
    const {  email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        if(password == user.password){
            res.send({message:"Login Successfull", user: user})
        }
        else{
            res.send({message: "Incorrect Password!"})
        }
      } else{
        res.send("User Not Registered!")
      }
    } catch (error) {
      res.send({ error });
    }
  });



app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send({ message: "Successfully Registered, Please login now." });
      }
    } catch (error) {
      res.send({ error });
    }
  });
  app.listen(9002, () => {
    console.log("BE started at port 9002");
  });
  
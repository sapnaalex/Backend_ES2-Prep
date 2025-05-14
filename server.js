const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const cookieparser=require("cookie-parser");
app.use(cookieparser());
const authRoutes=require("./routes/auth");
const feedbackRoutes=require("./routes/feedback");
const PORT=3000;

app.use("/",authRoutes);
app.use("/",feedbackRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});
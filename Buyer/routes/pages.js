const express=require("express");

const router=express.Router();

router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/Home",(req,res)=>{
    res.render("home")
})

router.get("/SignIn",(req,res)=>{
    res.render("signin")
})
router.get("/Cart",(req,res)=>{
    res.render("cart")
})

router.get("/About",(req,res)=>{
    res.render("about")
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/signinform",(req,res)=>{
    res.render("signinform")
})

module.exports=router;
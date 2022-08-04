 const express = require("express");
 const request = require("express");
 const mailchimp = require('@mailchimp/mailchimp_marketing');

 const app = express();
 app.use(express.urlencoded({
   extended: true
 }));

 app.use(express.static("public"));

 mailchimp.setConfig({
   apiKey: "eaee797116c51c09cc2424206c570ef9-us14",
   server: "us14"
 });







 app.get("/", function(req, res) {
   res.sendFile(__dirname + "/signup.html")
 })



 app.post("/", function(req, res) {

   const listId = "0aff044603";
   const subscribingUser = {
     firstName: req.body.fname,
     lastName: req.body.sname,
     email: req.body.mailid
   };

   async function run() {
     try {
       const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
           FNAME: subscribingUser.firstName,
           LNAME: subscribingUser.lastName
         }
       });

       console.log(
         `Successfully added contact as an audience member. The contact's id is ${response.id}.`
       );

       res.sendFile(__dirname + "/success.html");
     } catch (e) {
       res.sendFile(__dirname + "/failure.html");
     }
   }

   run();
 })


 app.post("/failure", function(req, res) {
   res.redirect("/");
 });

 app.listen(process.env.PORT || 3000, function(req, res) {
   console.log("Server started on port 3000")
 })


 //API KEY
 // eaee797116c51c09cc2424206c570ef9-us14

 // Audience Id
 // 0aff044603

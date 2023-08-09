const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

client.setConfig({
    apiKey: "26546991aa19386f68cb0242746d3410-us2",
    server: "us21",
  });

app.post("/", function(req, res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const run = async () => {
        const response = await client.lists.batchListMembers("e18cd42129",{
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: fname,
                        LNAME: lname
                    }
                }
            ],
        });
        res.sendFile(__dirname+ "/success.html");
        console.log("Successfully added contact as an audiance member. The contact's id is "+response.id);
      };
      
      run().catch(e => res.sendFile(__dirname+"/failure.html"));


})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})

//apikey
// 26546991aa19386f68cb0242746d3410-us21

//listid
// e18cd42129


const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");

const _ = require("lodash");
const { v4: uuid } = require("uuid");
const res = require("express/lib/response");
const { response } = require("express");

const app = express();
app.use(express.json());

app.get("/user", (req, res) => {
    res.send("This is Working");

});


app.post("/adduser", async (req, res) => {

    //posting data
    const id = uuid();
    const content = req.body;

    if (!content) {
        return res.sendStatus(400);
    }

    await fs.mkdir("data/userdata", { recursive: true });
    await fs.writeFile(`data/userdata/${id}.json`, JSON.stringify(content));


    console.log(id);
    console.log(content);
    res.status(201).json({
        id: id
    })
});


app.post("/addexperience/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const Education = req.body;
    console.log(Education)

    // let content = await fs.readFile(`data/userdata/${id}.json`, 'utf-8');
    let content = require(`./data/userdata/${id}.json`);
    // content.Education.push(Education);
    content.Education.push(Education);

    await fs.writeFile(`data/userdata/${id}.json`, JSON.stringify(content));

    res.status(201).json({
        message: "Experience Added",
        data: Education
    })


})



app.listen(3000, () => console.log("API Server is running..."));
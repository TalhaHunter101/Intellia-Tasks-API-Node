const fs = require("fs/promises");

const _ = require("lodash");
const { v4: uuid } = require("uuid");


//Adding User Data
exports.adduser = async (req, res) => {

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
};

// Adding Job Experience
exports.addExperience = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const Experience = req.body;
    console.log(Experience)

    // let content = await fs.readFile(`data/userdata/${id}.json`, 'utf-8');
    let content = require(`../data/userdata/${id}.json`);
    // content.Education.push(Education);
    content.Experiences.push(Experience);

    await fs.writeFile(`data/userdata/${id}.json`, JSON.stringify(content));

    res.status(201).json({
        message: `Experience Added to this ${id} person.`,
        data: Experience
    })


};

// Adding Education 
exports.addEducation = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const Education = req.body;
    console.log(Education)

    // let content = await fs.readFile(`data/userdata/${id}.json`, 'utf-8');
    let content = require(`../data/userdata/${id}.json`);
    // content.Education.push(Education);
    content.Education.push(Education);

    await fs.writeFile(`data/userdata/${id}.json`, JSON.stringify(content));

    res.status(201).json({
        message: `Education Added to this ${id} person.`,
        data: Education
    });
};

//Getting User Data
exports.Userdata = async (req, res) => {
    const id = req.params.id;
    let content = require(`../data/userdata/${id}.json`);

    res.status(201).json({
        message: ":::Person Data:::",
        id: id,
        data: content
    })

};
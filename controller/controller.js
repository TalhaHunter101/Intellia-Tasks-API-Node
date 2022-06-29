const fs = require("fs/promises");

const _ = require("lodash");
const { v4: uuid } = require("uuid");
const emailValidator = require("../Hof/email_validator");

//Adding User Data
exports.adduser = async (req, res) => {

    //posting data
    const id = uuid();
    const content = req.body;

    if (!content) {
        return res.status(400).json({
            message: "No content sent by request"
        });
    } else if (content.UserName == "" || content.UserName == undefined) {
        res.status(400).json({ Message: "Missing User Name:: Try again" });
        return;
    } else if (content.UserEmail == "" || content.UserEmail == undefined) {
        res.status(400).json({ Message: "Missing Email:: Try again" });
        return;
    } else if (emailValidator.validateEmailAddress(content.UserEmail) === -1) {
        res.status(400).json({ Message: "Incorrect email :: Enter again" });
        return;
    }
    // I have assumed other fields as optional

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
    // console.log(id);
    let Experience = req.body;
    // console.log(Experience)
    if (!Experience) {
        return res.status(400).json({
            message: "No Experience sent by request"
        });
    } else if (Experience.JobTitle == "" || Experience.JobTitle == undefined) {
        res.status(400).json({ Message: "Missing Job Title:: Try again" });
        return;
    } else if (Experience.Company == "" || Experience.Company == undefined) {
        res.status(400).json({ Message: "Missing Company:: Try again" });
        return;
    } else if (Experience.Country == "" || Experience.Country == undefined) {
        res.status(400).json({ Message: "Missing Country:: Try again" });
        return;
    } else if (Experience.City == "" || Experience.City == undefined) {
        res.status(400).json({ Message: "Missing City:: Try again" });
        return;
    } else if (Experience.Status == "" || Experience.Status == undefined) {
        res.status(400).json({ Message: "Missing Status:: Try again" });
        return;
    } else if (Experience.Fromdate == "" || Experience.Fromdate == undefined) {
        res.status(400).json({ Message: "Missing Fromdate:: Try again" });
        return;
    } if (Experience.Status == 'Current') {
        Experience.Todate = "";
    }

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
    // console.log(id);
    const Education = req.body;
    // console.log(Education)
    if (!Education) {
        return res.status(400).json({
            message: "No Education sent by request"
        });
    } else if (Education.UniversitySchool == "" || Education.UniversitySchool == undefined) {
        res.status(400).json({ Message: "Missing University School name:: Try again" });
        return;
    } else if (Education.Qualification == "" || Education.Qualification == undefined) {
        res.status(400).json({ Message: "Missing Qualification:: Try again" });
        return;
    } else if (Education.AreaofStudy == "" || Education.AreaofStudy == undefined) {
        res.status(400).json({ Message: "Missing Area of Study:: Try again" });
        return;
    } else if (Education.GradeGPA == "" || Education.GradeGPA == undefined) {
        res.status(400).json({ Message: "Missing Grade / GPA:: Try again" });
        return;
    } else if (Education.FromDate == "" || Education.FromDate == undefined) {
        res.status(400).json({ Message: "Missing From Date:: Try again" });
        return;
    } else if (Education.ExpectedDate == "" || Education.ExpectedDate == undefined) {
        res.status(400).json({ Message: "Missing Expected Date:: Try again" });
        return;
    } else {
        // let content = await fs.readFile(`data/userdata/${id}.json`, 'utf-8');
        let content = require(`../data/userdata/${id}.json`);
        // content.Education.push(Education);
        content.Education.push(Education);

        await fs.writeFile(`data/userdata/${id}.json`, JSON.stringify(content));

        res.status(201).json({
            message: `Education Added to this ${id} person.`,
            data: Education
        });
    }
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
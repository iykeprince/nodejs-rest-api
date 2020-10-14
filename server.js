const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const categories = [
    {id: 1, name: 'category 1', description: 'description for category one'},
    {id: 2, name: 'category 2', description: 'description for category two'},
    {id: 3, name: 'category 3', description: 'description for category three'},
]

app.get('/api/categories', (req, res) => {
    res.status(200).send(categories);
});

app.get('/api/categories/create', (req, res) => {
    const schema = {
        name: Joi.string().required,
        description: Joi.string().required
    }
    const queryObj = req.query;
    const result = Joi.validate(queryObj, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const category = {
        id: categories.length + 1,
        name: queryObj.name,
        description: queryObj.description
    }
    categories.push(category);
    res.status(200).send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server @ ${port}`));

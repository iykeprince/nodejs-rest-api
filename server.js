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
    
    const {name, description} = req.query;
    if(!name || !description){
        res.status(400).json({ errors: 'name is required, description is required'});

        return;
    }

    const category = {
        id: categories.length+1,
        name,
        description
    };
    categories.push(category);

    res.status(200).send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server @ ${port}`));

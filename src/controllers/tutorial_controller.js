const { restart } = require('nodemon');
const Tutorials = require('../models/tutorial_model');

const tutorialsController = {

    // Create new Tutorial
    createTutorials: async (req, res) => {
        try{
            // Validate request
            if (!req.body.title) {
                res.status(400).send({ message: "Content can not be empty!" });
                return
            }
            // Create a Tutorial
            const newTutorial = new Tutorials({
                title: req.body.title,
                description: req.body.description,
                published: req.body.published ? req.body.published : false
            });
            // Save Tutorial in the database
            const savedTutorial = await newTutorial.save();
            if(savedTutorial) {
                res.status(200).send(savedTutorial);
            }

        }
        catch (err) {
            res.status(500).send({message: err.message || "Some error occurred while creating the Tutorial."});
        }
    }, 
    
    // Retrieve all Tutorials & find by title from the database
    findAllTutorials: async (req, res) => {
        try {
            const title = req.query.title

            const conditionFindTutorials = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

            const foundedTutorials = await Tutorials.find(conditionFindTutorials);
            if (foundedTutorials){
                res.status(200).send(foundedTutorials);
            }
        }
        catch(err){
            res.status(500).send({message: err.message || "Some error occured while retrieving tutorials."});
        }
    },

    //  Find a single Tutorial with an id
    findByIdTutorials: async (req, res) => {
        try{

            const id = req.params.id;
            const findTutorialById = await Tutorials.findById(id);

            if (!findTutorialById){
                res.status(404).send({ message: `Not found Tutorial with id ${id}` });
            }
            else {
                res.status(200).send(findTutorialById);
            }
        }
        catch(err){
            res.status(500).send({message: err.message || "Some error occured while retrieving tutorial by id."});
        }
    },

    // Update a Tutorial identified by the id in the request
    updateByIdTutorials: async (req,res) => {
        try{
            // Check data update cannot empty
            if (!req.body) {
                return res.status(400).send({
                  message: "Data to update can not be empty!"
                });
            }

            const id = req.params.id;
            const findByIdAndUpdateTutorials = await Tutorials.findByIdAndUpdate(id, req.body, { useFindAndModify: false });


            if (!findByIdAndUpdateTutorials) {
                res.status(404).send({message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`});
            }else res.send({message: 'Tutorial was updated successfully.'});

        }
        catch(err){
            res.status(500).send({message: err.message || "Some error occured while update tutorial by id."});
        }
    },

    // Delete a Tutorial with the specified id
    deleteByIdTutorials: async (req, res) => {
        try {

            const id = req.params.id;

            const removeById = await Tutorials.findByIdAndDelete(id);

            if (!removeById){
                res.status(404).send({message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`});
            }
            else{
                res.status(200).send({message: `Tutorial was deleted successfully!`});
            }
        }
        catch (err){
            res.status(500).send({message: `Can not delete tutorial by id: ${id}`});
        }

    },

    // Delete all Tutorials from the database
    deleteAllTutorials: async (req, res) => {
        try {
            const removeAllTutorials = await Tutorials.deleteMany({});
            if (removeAllTutorials) {
                res.status(200).send({message: `${removeAllTutorials.deletedCount} All Tutorials were deleted successfully!`});
            }
        }
        catch(err){
            res.status(500).send({message: err.message || `Some error occurred while removing all tutorials.`});
        }
    },

    // Find all Tutorials with published = true
    findAllPublished: async (req, res) =>{
        
        try{
            const findAllPublished = await Tutorials.find({ published : true});
            if (findAllPublished.length==0)
                return res.status(200).send({message: `អត់មានទេប្រូ`});
            return res.status(200).send(findAllPublished);
        }
        catch(err){
            res.status(500).send({message: err.message || `Internal Server Error!`});
        }
        
    }


}


module.exports = tutorialsController;
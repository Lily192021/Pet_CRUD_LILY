const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');

router.get('/', (req, res) => {
    res.render("Pet/addOrEdit", {
        viewTitle: "Insert Pet"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var Pet = new Pet();
    Pet_id = req.body.id;
    PetName = req.body.PetName;
    PetAge= req.body.PetAge;
    Pet.save((err, doc) => {
        if (!err)
            res.redirect('Pet/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Pet/addOrEdit", {
                    viewTitle: "Insert Pet",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Pet.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('Pet/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Pet/addOrEdit", {
                    viewTitle: 'Update Pet',
                    Pet: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Pet.find((err, docs) => {
        if (!err) {
            res.render("Pet/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Pet list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'PetName':
                body['PetNameError'] = err.errors[field].message;
                break;
            case 'PetAge':
                body['PetAgeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Pet.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("Pet/addOrEdit", {
                viewTitle: "Update Pet",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Pet.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Pet/list');
        }
        else { console.log('Error in Pet delete :' + err); }
       
    });
});

module.exports = router;
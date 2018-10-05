const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();


router.get('/', (req, res) => {
  actionDb.get()
    .then(actions => {
      console.log('\n=== ACTIONS FOUND!! ==\n', actions)
      res.json(actions);
    }).catch (err => {
      console.log('\n=== I CANNOT GET THE ACTIONS!! ==\n', err)
      res
        .status(500)
        .send({ error: "The actions could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionDb.get(id)
    .then(action => {
      console.log('\n=== ACTION FOUND!! ==\n', action)
      res.json(action);
    })
    .catch(err => {
      console.log('\n=== I CANNOT GET THE ACTION!! ===\n', err)
      res.json({ error: "The action could not be retrieved."})
    })
})


router.post('/', (req, res) => {
  console.log("req", req.body)
  if(!req.body.project_id) {
      res.status(400).json({ error: "Please provide a project_id for this action." })
  } else if (!req.body.description) {
    return res.status(400).json({ error: "Please enter a description for this action." })
  } else if (req.body.description.length > 128) {
    return res.status(400).json({ error: "Please use fewer than 128 characters in your description." })
  } else if (!req.body.notes) {
    return res.status(400).json({ error: "Please enter some notes for this action." })
  } else {
  actionDb.insert(req.body)
    .then(response => {
          console.log('\n=== ACTION ADDED ===\n', response);
          res.status(201).json(response);
        })
    .catch(err => {
      console.log('\n=== CANNOT ADD ACTION ==\n', err);
      res.status(500).json({ error: 'There was an error while saving this action to the database.'});
    });
  }
});

/*
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!req.body.userId) {
    res.status(400).json({ error: "Please enter a userId." })
  } else if (!req.body.text) {
    res.status(400).json({ error: "Please enter some text." })
  } else {
    actionDb
    .update(id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: "There is no action with that id."})
      }
      if (response === 1) {
        console.log("\n=== ACTION UPDATED ==\n", response, req.body)
        res.status(200).json(response)
      }
    })
    .catch(err => {
      console.log("\n=== CANNOT UPDATE ACTION ===\n", err)
      res.status(500).json({ error: "There was an error while updating this action." })
    })  
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  actionDb.remove(id)
    .then(response => {
      if (response === 0){
        res.status(404).json({ error: "There is no action with that id."})
      }
      if (response === 1){
        console.log("\n=== ACTION DELETED ===\n", response)
        res.status(200).json({response})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "There was an error while deleting this action."})
    })
})
*/

module.exports = router;
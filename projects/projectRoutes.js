const express = require('express');
const projectDb = require ('../data/helpers/projectModel.js');

const router = express.Router();

const capitalize = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }
  next();
}

router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      console.log(`\n== I FOUND THESE PROJECTS!! ==\n`, projects)
      res.json(projects);
    }).catch (err => {
      console.log(`\n== I CANNOT FIND THE PROJECTS!! ==\n`, err)
      res.status(500)
      .send({ error: "The projects could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
    .then(project => {
      console.log('\n== I FOUND THE PROJECT!! ==\n', project)
      res.json(project);
    })
    .catch(err => {
      console.log('\n== I CANNOT FIND THAT PROJECT!! ==\n', err)
      res.json({ error: "The project could not be retrieved." })
    })
})

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  projectDb.getProjectActions(id)
  .then(actions => {
    console.log('\n=== I FOUND THE ACTIONS FOR THAT PROJECT!! ==\n', actions)
    res.json(actions);
  })
  .catch(err => {
    console.log('\n=== I cannot find the actions for that project!! ===\n', err)
  })
})

router.post('/', capitalize, (req, res) => {
console.log("req", req.body)
if(!req.body.name) {
    res.status(400).json({ error: "Please provide a name for this project."
  })
} else if (req.body.name.length > 128) {
  return res.status(400).json({ error: "Please choose a name that is less than 128 characters."
  })
} else if (!req.body.description) {
  res.status(400).json({ error: "Please provide a description for this project." })
} else {
projectDb.insert(req.body)
  .then(response => {
        console.log('\n=== I SUCCESSFULLY ADDED THE PROJECT!! ===\n', response);
        res.status(201).json(response);
      })
  .catch(err => {
    console.log('\n=== I cannot add that project!! ==\n', err);
    res.status(500).json({ error: 'There was an error while saving that user to the database.'});
  });
}
});

router.put('/:id', capitalize, (req, res) => {
const { id } = req.params;
if (!req.body.name) {
  res.status(400).json({ error: "Please provide a name for this project." })
} else if (req.body.name.length > 128) {
  res.status(400).json({ error: "Please choose a name that is less than 128 characters." })
} else if (!req.body.description) {
  res.status(400).json({ error: "Please provide a description for this project." })
} else {
  projectDb
  .update(id, req.body)
  .then(response => {
    if (response === null) {
      res.status(404).json({ error: "There is no project with that id."})
    }
   else {
      console.log("\n=== I UPDATED THE PROJECT!! ==\n", response, req.body)
      res.status(200).json(response)
    }
  })
  .catch(err => {
    console.log("\n=== I CANNOT UPDATE THAT PROJECT!! ===\n", err)
    res.status(500).json({ error: "There was an error while updating this project." })
  })  
}
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  projectDb.remove(id)
    .then(response => {
      if (response === 0){
        res.status(404).json({ error: "There is no project with that id."})
      }
      if (response === 1){
        console.log("\n=== I DELETED THE PROJECT!! ===\n", response)
        res.status(200).json({response})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "There was an error while deleting this user."})
    })
  })
  

module.exports = router;
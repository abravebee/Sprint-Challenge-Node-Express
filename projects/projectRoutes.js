/*
- `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.
*/

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
      console.log(`\n== I found the projects!! ==\n`, projects)
      res.json(projects);
    }).catch (err => {
      console.log(`\n== I cannot find the projects!! ==\n`, err)
      res.status(500)
      .send({ error: "The projects could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
    .then(project => {
      console.log('\n== I found that project!! ==\n', project)
      res.json(project);
    })
    .catch(err => {
      console.log('\n== I cannot find that project!! ==\n', err)
      res.json({ error: "The project could not be retrieved." })
    })
})

router.get('/:id/actions', (req, res) => ) {
  const { id } = req.params;
  projectDb.getProjectActions(id)
  .then(actions => {
    console.log('\n=== I found the actions for that project!! ==\n', actions)
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
} else {
userDb.insert(req.body)
  .then(response => {
        console.log('\n=== USER ADDED ===\n', response);
        res.status(201).json(response);
      })
  .catch(err => {
    console.log('\n=== CANNOT ADD USER ==\n', err);
    res.status(500).json({ error: 'There was an error while saving that user to the database.'});
  });
}
});

router.put('/:id', capitalize, (req, res) => {
const { id } = req.params;
if (!req.body.name) {
  res.status(400).json({ error: "Please enter a name." })
} else if (req.body.name.length > 128) {
  res.status(400).json({ error: "Please choose a name that is less than 128 characters." })
} else {
  userDb
  .update(id, req.body)
  .then(response => {
    if (response === 0) {
      res.status(404).json({ error: "There is no user with that id."})
    }
    if (response === 1) {
      console.log("\n=== USER UPDATED ==\n", response, req.body)
      res.status(200).json(response)
    }
  })
  .catch(err => {
    console.log("\n=== CANNOT UPDATE USER ===\n", err)
    res.status(500).json({ error: "There was an error while updating this user." })
  })  
}
})

router.delete('/:id', (req, res) => {
const id = req.params.id
userDb.remove(id)
  .then(response => {
    if (response === 0){
      res.status(404).json({ error: "There is no user with that id."})
    }
    if (response === 1){
      console.log("\n=== USER DELETED ===\n", response)
      res.status(200).json({response})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: "There was an error while deleting this user."})
  })
})


module.exports = router;
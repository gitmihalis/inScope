import db from './../models' // defaults to index.js



const scopeController = {}


// CREATE
scopeController.create = (req, res) => {
  const { 
    slug,
    title,
    description,
    beginning,
    ending,
    userId, 
  } = req.body


  const scope = new db.Scope({
    slug,
    title,
    description,
    beginningAt: new Date(beginning),
    endingAt: ending ? new Date(ending) : null,
    userId: userId
  })

  // save the scope to db
  scope.save().then((newScope) => {
    // push the creator to the moderators array
    db.Scope.findByIdAndUpdate(
      newScope._id,
      { $push: { '_moderators': userId }}
    ).then((existingScope) => {
      res.json({
        success: true,
        data: existingScope,
      })
    }).catch((err) => {
      res.json({ message: err })
    })
  }).catch((err) => { 
    res.json({ message: err })
  })
}

// INDEX

scopeController.getAll = (req, res) => {
  // 
  db.Scope.find({})
    .populate({
      path: '_moderators',
      select: 'username -_id'
    })
    .then((scopes) => {
      res.json({
        success: true,
        data: scopes
      })
    })
    .catch(err => res.json({ message: err }))
}

// SHOW

scopeController.getOne = (req, res) => {
  const slug = req.params.slug
  db.Scope.findOne({ slug })
    .then((existingScope) => {
      res.status(200).json({
        success: true,
        data: existingScope
      })
    })
    .catch((err) => res.status(500).json({message: err}))
}


export default scopeController

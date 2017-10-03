const basicController = {}

basicController.get = (req, res) => {
  res.json({
    message: 'WELCOME TO THE API'
  })
}

export default basicController
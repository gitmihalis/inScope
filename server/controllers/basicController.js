const basicController = {}

basicController.get = (req, res) => {
  res.status(200).json({
    message: 'WELCOME TO THE API'
  })
}

export default basicController
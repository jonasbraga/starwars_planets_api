const { app } = require('./v1/app')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`The force is listening at http://localhost:${port}`)
})

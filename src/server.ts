import express from 'express'
import { routes } from './routes'
import { deleteFiles } from './utils/deleteTmpFiles'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(8011, () => {
    console.log('running')
})
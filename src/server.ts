import express from 'express'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)
const dateFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Araguaina',
})
const date = dateFormat.format(new Date())
console.log(date)
app.listen(8011, () => {
    console.log('running')
})
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', 'tmp')

export default {
    directory: '/tmp',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '/tmp')
        },
    }),
    mimetype: 'text/plain',
    encoding: 'utf-8'
}
import fs from 'fs'
import path from 'path'


export const deleteFiles = () => {
    const dir = '/tmp';
    fs.readdir(dir, (err, files) => {
        //console.log(files)
        if (err) throw err;
        files.map((file) => fs.unlink(path.join(dir, file), (err) => { if (err) throw err }))
    })
}
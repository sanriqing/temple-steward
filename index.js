const download = require('download')
download('github.com/kevva/download.git', process.cwd(), {
    filename: 'ceshi'
}).then(() => {
    console.log('i has download')
}).catch(e => {
    console.log(e)
})
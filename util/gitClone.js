const spawn = require('child_process').spawn
const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')


exports = module.exports = (url, targetFileName = '', forceClone = true, cloneOptions = {}) => {
    return new Promise((resolve, reject) => {
        const tips = ora('Start downloading the template.').start()
        const targetPath = path.resolve(process.cwd(), targetFileName)
        let gitOp = ['clone', url, targetFileName]
        try {
            if (fs.existsSync(targetPath)) {
                const fileState = fs.statSync(targetPath)
                const isDir = fileState.isDirectory()
                if (forceClone) {
                    isDir ? fs.emptyDirSync(targetPath) : fs.unlinkSync(targetPath)
                } else {
                    tips.color = 'red'
                    tips.text = `Download failed.Error:destination path '${targetFileName}' already exists and is not an empty directory.you can try remove it or turn switch 'forceClone' option to true`
                    tips.fail()
                    return
                }
            }
            for (let cloneOp in cloneOptions) {
                gitOp.push('--' + cloneOp)
                gitOp.push(cloneOptions[cloneOp])
            }
            const gitFlow = spawn('git', gitOp)
            gitFlow.stdout.on('data', (data) => {
                tips.color = 'yellow'
                tips.text = data.toString()
            })
            gitFlow.stderr.on('data', (data) => {
                tips.color = 'blue'
                tips.text = `Downloading.....`
            })
            gitFlow.on('close', (code) => {
                tips.color = 'green'
                tips.text = `The download is complete.please cd ${targetFileName}`
                tips.succeed()
                resolve()
            })
        } catch (error) {
            tips.color = 'red'
            tips.text = `Download failed.Error:${error}`
            tips.fail()
            reject(error)
        }
    })
}

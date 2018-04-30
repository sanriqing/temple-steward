#!/usr/bin/env node
const commander = require('commander')
const repository = require('../repository')
const gitClone = require('../util/gitClone')
commander
    .command('download', 'download a repository ')
    .usage('<name> [fileName]')
    .option('-g,--git', 'Use git clone')
    .option('-f,--force', 'Cover existing folders')
    .action(async (name, ...args) => {
        const reData = repository[name]
        let fileName = name
        if (args.length > 1) {
            fileName = args[0]
            args.slice(0, 1)
        }
        const { git, force } = args[args.length - 1]
        if (!reData) {
            console.log('There is no such a repository'.red)
            return
        }
        if (git || reData.type === 'git') {
            try {
                await gitClone(reData.source, fileName, force)
            } catch (error) {
                console.log(error)
            }
        }
    })

commander.parse(process.argv)
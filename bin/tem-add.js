#!/usr/bin/env node
const commander = require('commander')
const repository = require('../repository')
const fs = require('fs-extra')
const path = require('path')
const colors = require('colors')
commander
    .command('add', 'add a new repository ')
    .usage('<name> <source>')
    .option('-g,--git', 'Is git repository,default true')
    .option('-f,--force','Cover the original repository.')
    .action((name, source, { git=true, force}) => {
        if(typeof name !=='string' || typeof source !=='string'){
            console.log('name and source is required and must be a string'.red)
            return 
        }
        if (repository[name] && !force){
            console.log(`A repository address has been configured in ${name}. \r\nyou can try tem add ${name} ${source} -f to rewrite`.cyan)
            return 
        }
        repository[name] = {
            type: git ? 'git' : 'ftp',
            source
        }
        fs.writeFileSync(path.resolve(__dirname, '../repository.json'), JSON.stringify(repository))
    })

commander.parse(process.argv)
#!/usr/bin/env node
const colors = require('colors')
const fs = require('fs')
const commander = require('commander')
const repository = require('../repository')
const path = require('path')

commander
    .command('remove', 'remove a repository ')
    .usage('<name>')
    .action((name)=>{
        if (repository[name]){
            delete repository[name]
            fs.writeFileSync(path.resolve(__dirname, '../repository.json'), JSON.stringify(repository))
        }
    })
commander.parse(process.argv)
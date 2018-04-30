#!/usr/bin/env node
const colors = require('colors')
const repository = require('../repository')

if (!Object.keys(repository).length){
    console.log('The repository list is empty '.grey)
}else{
    console.log('The repository list is as follows：'.grey)
    for (const resName in repository) {
        console.log(`> ${resName.green}:${repository[resName].source.grey}`)
    }
}
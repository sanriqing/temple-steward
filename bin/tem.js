#!/usr/bin/env node
const commander = require('commander')
const version = require('../package')

commander
    .name('tem')
    .version(version)
    .usage(`<command> [options]`)
    .description('This is a simple template manager.Help you to download your template from git server or a available url.enjoy yourself!')
    .command('add', 'add a new repository ')
    .command('remove', 'remove a repository ')
    .command('download', 'download a repository ')
    .command('ls', 'Display repository list')

commander.parse(process.argv)



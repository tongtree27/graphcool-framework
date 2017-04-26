#!/usr/bin/env node

import * as minimist from 'minimist'
import {Command} from './types'
import pushCommand from './commands/push'
import FileSystemResolver from './resolvers/FileSystemResolver'
const debug = require('debug')('graphcool')

async function main() {
  const argv = minimist(process.argv.slice(2))

  const command = argv._[0] as Command | undefined

  process.stdout.write('\n')

  switch (command) {
    case undefined: {
      process.stdout.write('Command not recognized')
      process.exit(0)
    }
    case 'push': {
      const isDryRun = true // (argv['dry'] || argv['d']) ? true : false
      const projectFilePath = argv['path'] || argv['p']
      debug(`Is dry run: ${isDryRun}`)
      const resolver = new FileSystemResolver()
      await pushCommand({isDryRun, projectFilePath}, resolver)
      break
    }
    default: {

      break
    }
  }

}

function onError(e: Error) {
  console.error(e.stack)
  process.exit(1)
}

process.on('unhandledRejection', e => onError(e))
main()


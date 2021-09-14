#!/usr/bin/env node
// const meow = require('meow')
import meow from 'meow'
import run from '../src/cli.js'

const cli = meow(`
  Runs a website carbon test with websitecarbon.com. Prints the results.

  Usage
    $ web-carbon <url>
  
  Options
    --pretty -p Pretty prints results to console, in human-readable format (default)
    --raw -r Outputs raw JSON output to console
`, {
  importMeta: import.meta,
  flags: {
    pretty: {
      type: 'boolean',
      alias: 'p'
    },
    raw: {
      type: 'boolean',
      alias: 'r'
    }
	}
})

run(cli)


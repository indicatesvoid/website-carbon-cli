import { runCarbonTest, prettyPrintResults } from "./website-carbon.js"
import ora from 'ora'

const run = (cli) => {
  const url = cli.input.length && cli.input[0]
  const noFlags = !cli.flags.pretty && !cli.flags.raw
  
  if(url) {
    const spinner = ora(`Running carbon test for ${url}...`).start()
    runCarbonTest(url)
      .then(json => {
        spinner.succeed()

        if(cli.flags.pretty || noFlags) {
          prettyPrintResults(json)
        }
        if(cli.flags.raw) console.log(json);

      })
      .catch(e => {
        spinner.fail()
        console.log(`🚩 ERROR: `, e)
      })
  }
}

export default run

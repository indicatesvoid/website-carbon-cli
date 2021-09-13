import { runCarbonTest, prettyPrintResults } from "./website-carbon.js";
import ora from 'ora';

export function cli(args) {
  args = args.slice(2);
  let url = args[0] || undefined;
  if(url) {
    const spinner = ora(`Running carbon test for ${url}...`).start();
    runCarbonTest(url)
      .then(json => {
        spinner.succeed()
        prettyPrintResults(json)
      })
      .catch(e => {
        spinner.fail()
        console.log(`🚩 ERROR: `, e)
      })
  }
}

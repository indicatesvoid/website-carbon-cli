import { runCarbonTest, prettyPrintResults } from "./website-carbon.js";

export function cli(args) {
  args = args.slice(2);
  let url = args[0] || undefined;
  if(url) {
    console.log(`🚀 Running carbon test for ${url}...`)
    runCarbonTest(url)
      .then(json => {
        prettyPrintResults(json)
      })
      .catch(e => {
        console.log(`🚩 ERROR: `, e)
      })
  }
}

// Hidden API docs: https://api.websitecarbon.com/

import fetch from 'node-fetch';
import chalk from 'chalk';

/**
 * Runs a carbon test and returns the results as JSON
 * @param {String} url 
 * @returns {Object} - JSON response (see {@linkhttps://api.websitecarbon.com/#routeSite|API docs})
 */
export const runCarbonTest = async (url) => {
  return new Promise(async (resolve, reject) => {
    const endpoint = `https://api.websitecarbon.com/site?url=${url}`
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      // console.log(`results: `, data)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Pretty prints results of carbon test to the console
 * @param {Object} results JSON results from API
 */
export const prettyPrintResults = (results) => {
  // print cleaner than //
  const cleanerThanPct = results.cleanerThan * 100
  const isGreen = cleanerThanPct > 50
  let chalkStyle = chalk.bold[isGreen ? 'green' : 'red']
  console.log(`${chalk.bold(
    `Cleaner than ${chalkStyle(`${cleanerThanPct}%`)} of sites tested`
  )}`)

  // print emissions //
  const powerSource = results.isGreen ? 'renewable' : 'grid'
  const emissions = results.statistics.co2[powerSource]
  console.log(chalk.dim(
    `🏭 Emissions: ${emissions.grams.toPrecision(3)}g / page view`
  ))

  // print other data (green hosting or not, etc) //
  // TBD
}
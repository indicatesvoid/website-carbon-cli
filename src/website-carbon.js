// Hidden API docs: https://api.websitecarbon.com/

import fetch from 'node-fetch'
import chalk from 'chalk'
import boxen from 'boxen'

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
  // method - print cleaner than //
  const cleanerThanPretty = () => {
    const cleanerThanPct = results.cleanerThan * 100
    const isGreen = cleanerThanPct > 50
    let chalkStyle = chalk.bold[isGreen ? 'green' : 'red']
    return `${chalk.bold(
      `Cleaner than ${chalkStyle(`${cleanerThanPct}%`)} of sites tested`
    )}`
  }

  // method - print emissions //
  const emissionsPretty = () => {
    const powerSource = results.isGreen ? 'renewable' : 'grid'
    const emissions = results.statistics.co2[powerSource]
    return `🏭 Emissions: ${chalk.bold(emissions.grams.toPrecision(3))}g / page view`
  }

  // print other data (green hosting or not, etc) //
  // TBD

  // actually print everything, but put it in a box //
  console.log(boxen(`
    ${cleanerThanPretty()}
    ${emissionsPretty()}
  `.trim(), {
    title: 'Results',
    titleAlignment: 'center',
    padding: 1
  }))

  // print last tested date //
  let date = new Date(results.timestamp * 1000) // timestamp must be converted first to ms
  console.log(
    chalk.dim.italic(`Last tested on ${date.toString()}`)
  )
}
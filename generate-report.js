const report = require('multiple-cucumber-html-reporter')
const fs = require('fs')
const path = require('path')

// Register ts-node so we can import config.ts
require('ts-node').register({ transpileOnly: true })
const { config } = require('./support/config')

const jsonReport = path.join('reports', 'cucumber-report.json')

if (!fs.existsSync(jsonReport)) {
  console.error('No cucumber-report.json found. Run tests first with: npm test')
  process.exit(1)
}

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: {
      name: 'N/A',
      version: 'REST API (no browser)'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Playwright REST API Test Report',
    data: [
      { label: 'Project', value: config.report.projectName },
      { label: 'Release', value: config.report.release },
      { label: 'API Under Test', value: config.report.apiUnderTest },
      { label: 'Test Framework', value: 'Playwright + Cucumber BDD' },
      { label: 'Execution Date', value: new Date().toLocaleString() }
    ]
  }
})

console.log('HTML report generated at: reports/html-report/index.html')

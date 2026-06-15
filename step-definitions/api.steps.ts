import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ApiWorld } from '../support/world'
import { DataTable } from '@cucumber/cucumber'

// ─── Background / Setup ──────────────────────────────────────────────────────

Given('the API base URL is {string}', function (this: ApiWorld, baseUrl: string) {
  this.baseUrl = baseUrl
})

// ─── Request Body ─────────────────────────────────────────────────────────────

Given('I have the following request body:', function (this: ApiWorld, dataTable: DataTable) {
  this.requestBody = {}
  for (const row of dataTable.hashes()) {
    // Coerce numeric strings to numbers
    const value = row.value !== undefined && !isNaN(Number(row.value))
      ? Number(row.value)
      : row.value
    this.requestBody[row.field] = value
  }
})

Given('the request body is:', function (this: ApiWorld, jsonBody: string) {
  this.requestBody = JSON.parse(jsonBody)
})

// ─── HTTP Methods ─────────────────────────────────────────────────────────────

When('I send a GET request to {string}', async function (this: ApiWorld, endpoint: string) {
  this.response = await this.apiContext.get(endpoint)
})

When('I send a POST request to {string}', async function (this: ApiWorld, endpoint: string) {
  this.response = await this.apiContext.post(endpoint, {
    data: this.requestBody
  })
})

When('I send a PUT request to {string}', async function (this: ApiWorld, endpoint: string) {
  this.response = await this.apiContext.put(endpoint, {
    data: this.requestBody
  })
})

When('I send a DELETE request to {string}', async function (this: ApiWorld, endpoint: string) {
  this.response = await this.apiContext.delete(endpoint)
})

// ─── Status Code ──────────────────────────────────────────────────────────────

Then('the response status code should be {int}', function (this: ApiWorld, statusCode: number) {
  expect(this.response.status()).toBe(statusCode)
})

// ─── Array Assertions ─────────────────────────────────────────────────────────

Then('the response should be a JSON array', async function (this: ApiWorld) {
  const body = await this.response.json()
  expect(Array.isArray(body)).toBe(true)
})

Then('the response array should have {int} items', async function (this: ApiWorld, count: number) {
  const body = await this.response.json()
  expect(body).toHaveLength(count)
})

// ─── Field Assertions ─────────────────────────────────────────────────────────

Then('the response JSON should contain field {string}', async function (this: ApiWorld, field: string) {
  const body = await this.response.json()
  expect(body).toHaveProperty(field)
})

Then('the response JSON should have field {string} with value {string}', async function (
  this: ApiWorld,
  field: string,
  value: string
) {
  const body = await this.response.json()
  expect(String(body[field])).toBe(value)
})

Then('the response JSON should not contain field {string}', async function (this: ApiWorld, field: string) {
  const body = await this.response.json()
  expect(body).not.toHaveProperty(field)
})

Then('the response body should not be empty', async function (this: ApiWorld) {
  const text = await this.response.text()
  expect(text.trim().length).toBeGreaterThan(0)
})

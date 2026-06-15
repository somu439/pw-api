import { Before, After } from '@cucumber/cucumber'
import { request } from '@playwright/test'
import { ApiWorld } from './world'
import { config } from './config'

Before(async function (this: ApiWorld) {
  this.requestBody = {}
  this.apiContext = await request.newContext({
    baseURL: this.baseUrl,
    extraHTTPHeaders: config.headers
  })
})

After(async function (this: ApiWorld) {
  await this.apiContext.dispose()
})

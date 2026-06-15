import { setWorldConstructor, setDefaultTimeout, World, IWorldOptions } from '@cucumber/cucumber'
import { APIRequestContext, APIResponse } from '@playwright/test'
import { config } from './config'

setDefaultTimeout(30_000)

export class ApiWorld extends World {
  apiContext!: APIRequestContext
  response!: APIResponse
  requestBody: Record<string, unknown> = {}
  baseUrl: string = config.baseUrl

  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(ApiWorld)

import { test, APIRequestContext, TestInfo } from '@playwright/test';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function apiCall(
  request: APIRequestContext,
  testInfo: TestInfo,
  method: Method,
  path: string,
  options: { headers?: Record<string, string>; body?: unknown } = {}
) {
  const baseURL = testInfo.project.use.baseURL ?? '';

  await testInfo.attach('Request Details', {
    body: JSON.stringify({ baseURL, path, method, headers: options.headers ?? {}, body: options.body ?? null }, null, 2),
    contentType: 'application/json',
  });

  const fetchOptions = { headers: options.headers, data: options.body };
  const methodMap = { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete', PATCH: 'patch' } as const;
  const response = await request[methodMap[method]](path, fetchOptions);

  await testInfo.attach('Response Details', {
    body: JSON.stringify({
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await response.json(),
    }, null, 2),
    contentType: 'application/json',
  });

  return response;
}

test("API testing demo", async ({ request }, testInfo) => {
  await apiCall(request, testInfo, 'GET', '/booking');
})
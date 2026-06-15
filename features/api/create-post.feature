Feature: POST API Tests - JSONPlaceholder Posts

  Background:
    Given the API base URL is "https://jsonplaceholder.typicode.com"

  Scenario: Create a new post with table body
    Given I have the following request body:
      | field  | value           |
      | title  | My Test Post    |
      | body   | This is content |
      | userId | 1               |
    When I send a POST request to "/posts"
    Then the response status code should be 201
    And the response JSON should contain field "id"
    And the response JSON should have field "title" with value "My Test Post"
    And the response JSON should have field "userId" with value "1"

  Scenario: Create a new post with JSON body
    Given the request body is:
      """
      {
        "title": "BDD Cucumber Post",
        "body": "Created via Playwright REST API testing with BDD",
        "userId": 2
      }
      """
    When I send a POST request to "/posts"
    Then the response status code should be 201
    And the response JSON should contain field "id"
    And the response JSON should have field "title" with value "BDD Cucumber Post"
    And the response JSON should have field "userId" with value "2"

  Scenario: Create a new user
    Given the request body is: 
      """
      {
        "name": "John Tester",
        "username": "johntester",
        "email": "john@test.com"
      }
      """

    When I send a POST request to "/users"
    Then the response status code should be 201
    And the response JSON should contain field "id"
    And the response JSON should have field "name" with value "John Tester"
    And the response JSON should have field "email" with value "john@test.com"

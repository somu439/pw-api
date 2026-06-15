Feature: GET API Tests - JSONPlaceholder Posts

  Background:
    Given the API base URL is "https://jsonplaceholder.typicode.com"

  Scenario: Get all posts returns 200 with a list
    When I send a GET request to "/posts"
    Then the response status code should be 200
    And the response should be a JSON array
    And the response array should have 100 items

  Scenario: Get a single post by ID
    When I send a GET request to "/posts/1"
    Then the response status code should be 200
    And the response JSON should have field "id" with value "1"
    And the response JSON should have field "userId" with value "1"
    And the response JSON should contain field "title"
    And the response JSON should contain field "body"

  Scenario: Get all comments for a post
    When I send a GET request to "/posts/1/comments"
    Then the response status code should be 200
    And the response should be a JSON array

  Scenario: Get a non-existent post returns 404
    When I send a GET request to "/posts/9999"
    Then the response status code should be 404

  Scenario: Get users list
    When I send a GET request to "/users"
    Then the response status code should be 200
    And the response should be a JSON array
    And the response array should have 10 items

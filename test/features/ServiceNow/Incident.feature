Feature: Incident

    This feature is for testing the incident module in ServiceNow

    Scenario Outline:<TestID>: Create new incident from platform

        Given As a <userRole> user, I login to ServiceNow
        Then I should be on <targetPage> page
        When I search <module> module in the navigation filter
        When I choose <module> module in the navigation filter
        When I click new UI Action


        Examples:
            | TestID  | userRole | targetPage | module    |
            | INC_001 | ESS      | platform   | incidents |
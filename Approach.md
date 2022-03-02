Upon analysing the API endpoints below are the findings:
1. The API request format for the latest rates api requires a base currency and a target currency(one or many). 
2. The API request format for the conversion api contains a base currency and a target currency along with the amount which needs to be converted. 

Also the available symbols(currency codes to choose from) come from the symbol api. So, in order to make a design as per the api request format, we need to make an api request to the symbols api once when the app loads and populate the list of available symbols in the drop down as shown in the wireframes. Because the list of symbols coming from this api aren't going to change anytime soon, store this list into localStorage and avoid making subsequent requests to the api.

Latest Rates Wireframe - (https://github.com/agkosd/currency-exchange/blob/problem-breakdown-and-plan-of-action/LatestRates.png?raw=true)

Convert Currency Wireframe - (https://github.com/agkosd/currency-exchange/blob/problem-breakdown-and-plan-of-action/ConvertCurrency.png?raw=true)

The design for the components could be seen from the wireframes, wherein based on the change in the url, the components will be loaded. For example if the url contains latest-rates, the number input will be disabled as the api request does not contain any parameter to input the amount, as all rates are per unit base currency. Also the second dropdown for the target currency would be multiple select as the api allows to pass in multiple target currencies.

Similarly, if the url is convert-currency, the button text should change to convert currency as well as the user should be able to input the amount in the input box as the api allows to pass in the amount parameter for the base currency. Also, the second dropdown box should be single select.

So the basic flow would be something like this.

1. If (Url -> latest-rates)
    1. Button-text -> Latest Rates
    2. Input(disabled) -> Value (1)
    3. 1st Drop down box(single select with values coming from the symbols api)
    4. 2nd Drop down box(multiple select with values coming from the symbols api)
2. If (Url -> convert-currency)
    1. Button-text -> Convert
    2. Input(enabled) -> Value (custom >= 1)
    3. 1st Drop down box(single select with values coming from the symbols api)
    4. 2nd Drop down box(single select with values coming from the symbols api)

For styling Material ui is going to be used.

Component Design:

1. Button Component: Button component should be of type submit and should receive a text prop which would contain either latest rates or convert as the string value
2. DropDown/Select Component: Select component should receive an array containing the list of the symbols to output as well as receive an isMultiSelect prop which would be true if it is latest rates and false otherwise. So when the isMultiSelect Prop is true, the drop down would be multiSelect, else it would be single select.
3. Input Component: The input component would receive the isMultiSelect Prop and if it is true, the input should be disabled and capped to 1, else it should be enabled and should have minimum value as 1.
4. Result Component: The result component would receive an array as a prop for convert currency it would be of length 1 where as for latest rates it would have length equal to the number of target symbols selected. In the first draft the format would be of the form :
  ```
    [
      {
        from: base_currency,
        to: target_currency,
        amount: conversion_amount,
        result: value,
      },
    ]
  ```
6. Integrating: All these components should later then be brought inside a container component lets call it as Currency component which should then be responsible for the global state management and handling of api requests.


Task Breakdown:

1. Install Material UI
2. Create a Button Component
3. Create an Input Component
4. Create a DropDown Component
5. Create a Results Component
6. Create a Container Component (<form></form>)
7. Add API requests
8. Intergrate APIs into the container component


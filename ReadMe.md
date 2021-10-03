# Herokuapp Computers

Cover the smoke tests for herokuapp site - https://computer-database.herokuapp.com/computers 

## Detailed explanation on Automation Framework

```
Architecture Name:-  Hybrid POM using Cypress Tool
```


### Project Structure:-

```
fixtures
```
> This contains fixed set of data to be used for different scenarios

```
integration
```
> functionslibrary - This contains the common operations/functions
> 
> pageObjects - This contains locators of objects involved in pages of website.
> 
>  smokeTests - This contains the smoke tests
```
results
```
> reports - This contains HTML report generated for the test
> 
> screenshots - This contains the screenshot generated for failed test step
> 
>  videos - This contains the videos generated for test run

## Get started

### Clone the repository

```shell
git clone https://github.com/nchadha28107/Herokuapp-Computers.git
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
```

## Running the tests
To run the test , the launch the terminal in IDE - Visual Studio Code and execute below command
```
npm run cypress:run
```
To generate the HTML Report run the command
```
npm run create:html:report
```
This will create a single test JSON file by merging all the individual test JSON files and then finally create a single HTML report file

## Report

> Report can be found at cypress\results\reports\testReports\cypress-combined-report.html

> Video can be found at cypress\results\videos\smoke.spec.ts.mp4
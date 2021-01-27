# Hacking History Short Assignment 2: JS API's and Frameworks

## Introduction

You'll remember some JavaScript basics from HIS393. You'll also remember that our approach to programming is "hacking", in the sense that we do not systematiclaly learn computer science principles, but instead tyr to pick up what we need to in order to accomplish some specific task.

Well, here we are in a fourth year seminar, and we need to learn some new tricks. The programming tasks here are not too difficult, and shouldn't take very long to accomplish. In this asssignment, you'll use the [Fetch API](https://www.freecodecamp.org/news/javascript-fetch-api-tutorial-with-js-fetch-post-and-header-examples/) to retrieve data from an API, and the [chart.js graphing library](https://www.chartjs.org/)  ([https://www.chartjs.org/docs/latest/](docs here)) to graph the result. The code is written using various modern JavasScript expressions that you didn't learn in HIS393, e.g. [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [arrow functions](https://www.javascripttutorial.net/es6/javascript-arrow-function/), among others). 

We use data from the  [COVID-19 Open Data Group, Canada](https://opencovid.ca/). You should familiarize yourslef with their [API](https://opencovid.ca/api/), their [FAQ](https://opencovid.ca/work/data-faq/), their [technical report](https://opencovid.ca/work/technical-report/), and their [dataset document](https://opencovid.ca/work/dataset/) (data itself is on [Github](https://github.com/ccodwg/Covid19Canada)). 

A lot of this may be hard to understand! But the problems you're being asked to solve are not actually that hard, so you should be able to complete the assignment easily. 

Problems 1-3 involve hanging `data.js`, as well as making small changes to `index.html` and portentially `style.css`. Problem 4 asks you to make changes to `reflection.md`, using Markdown. 

As with later assignments in HIS393, this assignment will be easier to work with if you run 

``` shell
npm install
npm run watch
```
The live reload will sometimes be incomplete or bggy, so you may have to hard-refresh the page to see all of your changes.

## Problem 1: graphing intro

Your first problem is to create simple graph of exponential growth. The function `makeExponent` is mostly written for you already. Take a look at the parameters, and try to understand how this works. You may need to read some of the chart.js docs. Maybe it's been a really long time since you did any math; the math here is about grade 9 level, but still, you may need to remember how that works.

## Problem 2: Fetching API data

In this problem, you'll fetch data from an endpoint, and use it to add text to an HTML section element.  Again, most of the code has been written for you. However, there's a catch. 
- First, you should modify the endpoint (on line 4). You will likely want to inspect the API result so that you unerstand it, which you can do in Firefox, or in Chrome using a plugin.
- Now, think about what information you want to display, and what you want to filter out. The starter code uses a couple of different methods to filter stuff out; try to understand how it works, and modify it as necessary.
- Decide whether you want to use a table or some other mechanism to show the data. For instance, you might want a list instead.  In that case ,you'll want to write a new helper function and replace the call to  `makeTable()` with a call to your own function.

## Problem 3: Graphing API data

This part will use the same exact JSON object that is the bases of Problem 2. This time, though you'll use the data to make a graph. This will involv transforming the original data into a format that chart.js expects.  Look at the existing code and modify it till it graphs the right information.

## Problem 4: Reflections

`reflection.md` contains a numbero f short ansewr questions about the assignment. Please answer them. There is not word limit; take as  much space as you feel you need to provide an adequate answer.  




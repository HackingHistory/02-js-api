// apiBase is just the base URL for the API
// choose your own endpoint using the API docs
const apiBase = 'https://api.opencovid.ca/',
      // note that the last parameter `&ymd=true` has to be preserved if you want to
      // be able to use the date-based graphing currently employed in Problem 3.
      endpoint=`timeseries?loc=ON&after=2021-01-01&ymd=true`; // replace with your own data
      
// you shouldn't need these for the assignment but in case you want per capita figures later on
// I'll leave this here.
const popFigures= {
  Canada: 38008005,
  NL: 521000,
  PEI: 159703,
  "Nova Scotia": 979115,
  "New Brunswick": 781315,
  Quebec: 8575779,
  Ontario: 14733119,
  Manitoba: 1379584,
  Saskatchewan: 1177884,
  Alberta:4428112,
  BC:5145851,
  Yukon: 42176,
  NWT: 45074,
  Nunavut: 39285
}



// Problem 1: Build a graph of exponential growth using the chart.js
// graphing library.
// Place the graph in the canvas with ID "exponentialChart", and label it
// appropriately in the accompanying `figcaption` element (do that in index.html)

// Adjust labels and other values as desired.

function makeExponent () {

  // Start by declaring some data constants.
  // Since chartjs accepts two formats for data in line charts,
  // I've provided 2 formats for data here
  // xSeries is just an array of sequential numbers.

  // exponentBase is the number we're raising to a power,
  // so if it's 2, the y values will be 2,4,8, etc
  
  // ySeries uses the built in array `map` function to create a new
  // array, in which each element of xSeries is the exponent to which the base
  // is raised in ySeries.

  // combinedData uses an arrow function to map the values onto each other,
  // creating an array whose individual elements are objects of the form
  // {x: xSeries[i], y:ySeries[i]}
  // try to understand this line if you can, or ignore it.  
  const xSeries = [1,2,3,4,5,6,7,8], // add to this if you feel like it!
        exponentBase = 2, // thing we're raising to a power; try changing it
        ySeries = xSeries.map( x => Math.pow(exponentBase,x)) // raise the base to a power
        combinedData = xSeries.map((x,i) => ({x:x, y:ySeries[i]}))

  // uncomment this if you want to see what data has been generated
  //console.log('combinedData: ', combinedData);
  
  // grab the element for the chart
  // cf https://www.chartjs.org/docs/latest/getting-started/usage.html#creating-a-chart
  const exponentElement = document.getElementById('exponentChart');
  const exponentChart = new Chart(exponentElement,{
    type: 'line', // make a bar chart if you prefer, but you'll have to make some adjustments.
    data: {
      // labels: xSeries, //uncomment if you are using the individual xSeries & ySeries dataset
      datasets: [{
        label: 'Growing Thing', // change this label for the dataset; appears in chart legend
        fill: false,
        data: combinedData, // replace with `combinedData` or `ySeries`, depending
        // do you want to adjust any of these?
        // you need the `backgroundColor` or the legend won't display right
        // even though there's no fill color in a line chart!
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
        borderWidth: 1
      }],
      //showLine: true, // only necessary if you want to use a "scatter" chart type.

    },
    options: {
      title: {
        display: true,
        text: 'Exponential Growth'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0 // never show decimals
          },
          scaleLabel: {
            display: true,
            labelString: 'amount'
          }
        }],
        xAxes:[{
          type: 'linear', // comment this out, or replace with 'category', if you want to use labels instead
          ticks: {
            beginAtZero: false,
            precision: 0 // never use decimal points in axis
          },
          scaleLabel: {
            display: true,
            labelString: 'generations' //change to something else
          }
        }]
      }
    }
  });


}

// helper function fetchAndRun
function fetchAndRun () {
  fetch(apiBase + endpoint).then(response => response.json())
    .then(json => {

      showData(json);
      drawCovidChart(json);
    })
}

// Problem 2: 
// fetch the data from the API and smehow display the data
function showData (json) {
  const dataSection = document.getElementById('covidData')
  
  console.log(json);
  // you have options here.  What I've done is one way to precent the data,
  // and you're welcome to use it, modify it somewhat, or replace with your
  // own process.

  // my first step is to choose one part of the data to work with.
  // you should inspect the json response either in Firefox, or in chrome
  // after installing an extension like JSON Formatter (https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)
  let active = json.active

  // first I'm going to filter the data in the objects
  // I'll use `map` and the delete operator, which is maybe easier
  // to understand, but it's more elegant with the `spread` operator
  // cf: https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90
  // in my cae I'm just getting rid of the 'province' info since I'm only using Ontario
  active = active.map(obj => {
    delete obj.province;
    return obj
  })

  // create the table
  let newTable = makeTable(active)
  
  dataSection.prepend(newTable)
  let title = document.createElement('h2');
  dataSection.insertBefore(title, newTable);
  title.textContent = 'Ontario Cases in 2021'
}

function makeTable(jsonArray) {
  let headers = Object.keys(jsonArray[0]),
      table = document.createElement('table'),
      head = document.createElement('thead'),
      headRow = document.createElement('tr'),
      tbody = document.createElement('tbody')
  headers.map(h => {
    let cell = document.createElement('th');
    cell.textContent = h
    headRow.append(cell)
  })
  head.append(headRow)
  table.append(head)
  jsonArray.map(thisObj => {
    let row = document.createElement('tr');
    headers.map(h => {
      let cell = document.createElement('td');
      cell.textContent = thisObj[h];
      row.append(cell);
    })
    tbody.append(row)
  })
  table.append(tbody)
return table
}


// Problem 3
// Now build a chart using the same data.

function drawCovidChart (json) {
  const chartElement = document.getElementById('covidChart')
  // new you have to modify the data to get what you want.
  // youre going to have to choose one piece of data and manage it
  let active = json.active;
  let activeSeries = active.map( obj => ({x:obj.date_active, y:obj.active_cases_change}))
  console.log(activeSeries);
  let covidChart = new Chart(chartElement,{
    type: 'line', // make a bar chart if you prefer, but you'll have to make some adjustments.
    data: {
      // labels: xSeries, //uncomment if you are using the individual xSeries & ySeries dataset
      datasets: [{
        label: 'Δ active cases', // change this label for the dataset; appears in chart legend
        fill: false,
        data: activeSeries, // replace with `combinedData` or `ySeries`, depending
        // do you want to adjust any of these?
        // you need the `backgroundColor` or the legend won't display right
        // even though there's no fill color in a line chart!
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
        borderWidth: 1
      }],
      //showLine: true, // only necessary if you want to use a "scatter" chart type.

    },
    options: {
      title: {
        display: true,
        text: 'Active Cases in Ontario, 2021`'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0 // never show decimals
          },
          scaleLabel: {
            display: true,
            labelString: 'change in active cases'
          }
        }],
        xAxes:[{
          // note that this only works because the data is presenting date info i n the format
          // YYYY-MM-DD. So, it requires the `&ymd-true` part of the endpoint URL
          type: 'time', // comment this out, or replace with 'category', if you want to use labels instead
          ticks: {
            beginAtZero: false,
            precision: 0 // never use decimal points in axis
          },
          scaleLabel: {
            display: true,
            labelString: 'date' //change to something else
          }
        }]
      }
    }
  });
   
}


function loadPage () {
  makeExponent()
  fetchAndRun()
}

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Personal API Key for OpenWeatherMap API

const apiKey = "6a5514140124d6e0ea9c2911bae82ebe&units=imperial";

/* Function to GET Web API Data*/

const getWeather = async (baseurl) => {
  const response = await fetch(baseurl);
  try {
    const weather = await response.json();
    console.log(weather);
    const temp = weather.main.temp;
    return temp;
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
};

/* Function to POST data */

const postData = async (url = "", inputData = {}) => {
  const req = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(inputData),
  });
};

/* Function to GET Project Data */

const retrieveData = async () => {
  const request = await fetch("/allData");
  try {
    const allData = await request.json();
    //console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Event listener to add function to existing HTML DOM element

const generate = document.getElementById("generate");
generate.addEventListener("click", callBackFunction);

/* Function called by event listener */

function callBackFunction() {
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  const baseurl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;

  if (zip !== "") {
    getWeather(baseurl)
      .then((temp) => {
        postData("/addWeather", {
          newDate: newDate,
          temp: temp,
          content: content,
        });
      })
      .then((userData) => {
        retrieveData();
      });
  } else {
    alert("Please, Enter Zip Code :)");
  }
}

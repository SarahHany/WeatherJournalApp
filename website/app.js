/* Global Variables */

const apiKey = "0d7f4e76e2793114444ca8c52360a3a3&units=imperial";
const apiURL = "http://localhost:8000/";
const zipCodeRes = document.getElementById("zip");
const feelingRes = document.getElementById("feelings");
const tempRes = document.getElementById("temp");
const dateRes = document.getElementById("date");
const contentRes = document.getElementById("content");

// Create a new date instance dynamically with JS
let dateD = new Date();
let newDate =
  dateD.getDate() + "." + dateD.getMonth() + "." + dateD.getFullYear();

const generate = document.getElementById("generate");

generate.addEventListener("click", async () => {
  let data = {
    zipCode: zipCodeRes.value,
    content: feelingRes.value,
    date: newDate,
  };

  zipCodeBack(data.zipCode).then((zipInfo) => {
    if (zipInfo.cod != 200) {
      return alert(zipInfo.message);
    }
    data.temp = zipInfo.list[0].main.temp;
    postDataTo(data);
  });

  // }).catch (error) {
  //   //console.log(responseData);
  //   console.log("error", error);
  // }
});

async function zipCodeBack(zipCode) {
  return await (
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`
    )
  ).json();
}

async function postDataTo(data) {
  let res = await fetch(`${apiURL}add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    if (!res.ok) {
      alert("error response");
      return;
    }
    res.json().then((data) => {
      if (res.ok) updateTheUI();
      else alert("error response");
      // }).catch (error) {
      //   console.log("error", error);
      // };
    });
  } catch (error) {
    console.log("error", error);
  }
}
async function updateTheUI() {
  let response = await fetch(`${apiURL}all`);
  try {
    response.json().then((data) => {
      dateRes.innerHTML = `Date: ${data.date}`;
      tempRes.innerHTML = `Temp: ${data.temp}`;
      contentRes.innerHTML = `Feeling: ${data.content}`;
      // }).catch (error) {
      //   console.log("error", error);
      // };
    });
  } catch (error) {
    console.log("error", error);
  }
}

// generate.addEventListener("click", async () => {
//   try {
//     const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},appid=${apiKey}`;

//     const responseData = await fetch(url, apiKey, zipCode).then((res) =>
//       res.json()
//     );
//
//   } catch (error) {
//     //console.log(responseData);
//     console.log("error", error);
//   }
// });

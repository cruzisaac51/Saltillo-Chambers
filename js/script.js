// show the baner
const banner = document.getElementById("banner");
let today = new Date();
day = today.getDay();

const showBanner = () => {
    banner.style.display = "block";
};

if (day == 5) {
    showBanner();
}

//Date
const d = new Date();
const year = d.getFullYear();
const fulldate = `${year}`;
document.querySelector("#dateyear").textContent = fulldate;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fdate = d.toLocaleDateString("en-UK", options);
document.querySelector("#lastUpdated").textContent = fdate;

//Responsive menu
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

// responsive join button
function popupToggle(){
    const popup = document.getElementById('popup');
    popup.classList.toggle('activepopup');
}

//Business info
const thejsonurl = "json/business.json";

const townApi = async (key, value, nameImage) => {
    try {
      const response = await fetch(`${thejsonurl}`);
      const responsepart2 = await response.json();
      let listofitm = responsepart2[key];
      listofitm.forEach((element) => {
        if (element.name === value) {
            //create elements
            const createCards = document.createElement("div");
            let cardinfo = document.createElement("div");
            let titleh2 = document.createElement("h2");
            let pinformation = document.createElement("p");
            let contact = document.createElement("p");
            let schedule = document.createElement("p");
            let averageRainFall = document.createElement("p");
            let image = document.createElement("img");

            //set attributes
            createCards.setAttribute("class", "card");
            pinformation.setAttribute("class", "motto-card");
            contact.setAttribute("class", "par-card");
            schedule.setAttribute("class", "par-card");
            averageRainFall.setAttribute("class", "par-card");

            //insert elements
            titleh2.innerHTML = element.name;
            pinformation.innerHTML = element.motto;
            contact.innerHTML = `Telephone: ${element.contact}`;
            schedule.innerHTML = `Schedule: ${element.schedule}`;
            image.setAttribute("src", `${nameImage}`);
            image.setAttribute("alt", `${element.name}'s photo`);
            image.setAttribute("class", "card-photo");
            cardinfo.appendChild(titleh2);
            cardinfo.appendChild(pinformation);
            cardinfo.appendChild(contact);
            cardinfo.appendChild(schedule);
            cardinfo.appendChild(averageRainFall);
            createCards.appendChild(cardinfo);
            createCards.appendChild(image);
            document.querySelector("section.the-section").appendChild(createCards);
        }
      });
      return listofitm;
    } catch (error) {
      console.log(error);
    }
  };
  
  townApi("business", "Hero", "hero2.jpg");
  townApi("business", "Torres", "torres2.jpg");
  townApi("business", "Hunters Gotcha", "hunters.png");


//Saltillo info
const thejsonurlPreston = "json/eventssaltillo.json";

const townApiP = async (key, value) => {
    try {
        const responseP = await fetch(`${thejsonurlPreston}`);
        const responsepart2P = await responseP.json();
        let listofitmP = responsepart2P[key];
        listofitmP.forEach((element) => {
            if (element.name === value) {
                //create elements
                const createCardsP = document.createElement("div");
                let cardinfoP = document.createElement("div");
                let titleh2P = document.createElement("h2");
                let pinformationP = document.createElement("p");
                let events = document.createElement("p");

                //set attributes
                createCardsP.setAttribute("class", "card");
                pinformationP.setAttribute("class", "motto-card");
                events.setAttribute("class", "par-card");

                //insert elements
                titleh2P.innerHTML = `Upcoming Events`;
                pinformationP.innerHTML = element.motto;
                events.innerHTML = `${element.events[0]} <br> ${element.events[1]} <br> ${element.events[2]}`;
                cardinfoP.appendChild(titleh2P);
                cardinfoP.appendChild(pinformationP);
                cardinfoP.appendChild(events);
                createCardsP.appendChild(cardinfoP);
                document.querySelector("section.the-sectionP").appendChild(createCardsP);
            }
        });
        return listofitmP;
    } catch (error) {
      console.log(error);
    }
};
townApiP("events", "Saltillo");

// Weather API

const apiURL = `https://api.openweathermap.org/data/2.5/weather?id=3988086&units=imperial&APPID=f2872719ed7cdab5d0af213076f4c716`;
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        

        
        const currentTempStrign = document.querySelector('#current-temp-string');
        const currentTemp = document.querySelector('#current-temp');
        const pathname = document.querySelector('#imagesrc');
        const weathericon= document.querySelector('#icon');
        const windSpeed = document.querySelector('#windSpeed');
        const windChill = document.querySelector("#windchill");
        const humidity = document.querySelector("#humidity");
        
        currentTempStrign.textContent = jsObject.weather[0].main;
        currentTemp.textContent = jsObject.main.temp.toFixed(0);
        windSpeed.textContent = jsObject.wind.speed.toFixed(0);
        humidity.textContent =jsObject.main.humidity.toFixed(0);
        let imgsrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';
        let imgalt = jsObject.weather[0].description;
        let capimgalt = '';
        let i = 0;
        for (i < imgalt.length; i++;) {
            if (chartAt(i) === 0) {
                capimgalt += imgalt.charAt(i).toUpperCase();
            } else {}
        }
        imgalt = imgalt.charAt(0).toUpperCase() + imgalt.slice(1);
        
        

        let windChill1 = 35.74 + (0.6215 * currentTemp) + (0.4275 * currentTemp - 35.75) * windSpeed ^ 0.16;
        if (currentTemp <= 50 && windSpeed > 3){
            windChill.textContent = windChill1;
        } else {
            windChill.textContent = "N/A";
        }
        
        humidity.textContent =jsObject.main.humidity.toFixed(0);
        currentTempStrign.textContent = jsObject.weather[0].main;
        currentTemp.textContent = jsObject.main.temp.toFixed(0);
        windSpeed.textContent = jsObject.wind.speed.toFixed(0);
        weathericon.setAttribute('src', imgsrc); 
        weathericon.setAttribute('alt', imgalt);
        pathname.textContent = imgsrc;

    });
// lazy load 

let imagesToLoad = document.querySelectorAll("img[data-src]");

const loadImages = (image) => {
	image.setAttribute("src", image.getAttribute("data-src"));
	image.onload = () => {
		image.removeAttribute("data-src");
	};
};
if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver((items, observer) => {
		items.forEach((item) => {
			if (item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach((img) => {
		observer.observe(img);
	});
} else {
	imagesToLoad.forEach((img) => {
		loadImages(img);
	});
}
// locale storage

const daysVisited = document.getElementById("container");
const timestamp = today.getTime();

document.addEventListener("DOMContentLoaded", () => {
  populateStorage();
});

const populateStorage = () => {
  try {
    let theDay = localStorage.getItem("daysVisited");
    if (theDay != timestamp) {
      // (1.000 miliseconds x 60 seconds x 60 minutes x 24 hours)
      let days = Math.round((timestamp - theDay) / 86400000);
      daysVisited.textContent = `Amount of time in days between user visits: ${days} days`;
      setStyles();
    }
  } catch (er) {
    setStyles();
  }
};

const setStyles = () => {
  localStorage.setItem("daysVisited", timestamp);
};

//Directory 

const thejsonurldir = "../json/business.json";

const townApidir = async (key, value, nameImage) => {
    try {
      const response = await fetch(`${thejsonurldir}`);
      const responsepart2 = await response.json();
      let listofitm = responsepart2[key];
      listofitm.forEach((element) => {
        if (element.name === value) {
            //create elements
            const createCards = document.createElement("div");
            let cardinfo = document.createElement("div");
            let titleh2 = document.createElement("h2");
            let pinformation = document.createElement("p");
            let contact = document.createElement("p");
            let schedule = document.createElement("p");
            let events = document.createElement("p");
            let image = document.createElement("img");

            //set attributes
            createCards.setAttribute("class", "card");
            pinformation.setAttribute("class", "motto-card");
            contact.setAttribute("class", "par-card");
            schedule.setAttribute("class", "par-card");
            events.setAttribute("class", "par-card");

            //insert elements
            titleh2.innerHTML = element.name;
            pinformation.innerHTML = element.motto;
            contact.innerHTML = `Telephone: ${element.contact}`;
            schedule.innerHTML = `Schedule: ${element.schedule}`;
            events.innerHTML = ` Events: <br> ${element.events[0]} <br> ${element.events[1]} <br> ${element.events[2]}`;
            image.setAttribute("src", `images/${nameImage}`);
            image.setAttribute("alt", `${element.name}'s photo`);
            image.setAttribute("class", "card-photo");
            cardinfo.appendChild(titleh2);
            cardinfo.appendChild(pinformation);
            cardinfo.appendChild(contact);
            cardinfo.appendChild(schedule);
            cardinfo.appendChild(events);
            createCards.appendChild(cardinfo);
            createCards.appendChild(image);
            document.querySelector("section.the-sectiondir").appendChild(createCards);
        }
      });
      return listofitm;
    } catch (error) {
      console.log(error);
    }
  };
  
  townApidir("business", "Hero", "../images/hero2.jpg");
  townApidir("business", "Torres", "../images/torres2.jpg");
  townApidir("business", "Hunters Gotcha", "../images/hunters.png");
  townApidir("business", "Isaquito bebe", "../images/isaquito.jpg");
  townApidir("business", "Happy Boneless mx", "../images/happy.jpg");
  townApidir("business", "legends of fitness", "../images/gym.jpg");
  townApidir("business", "Dorcas Boutique", "../images/dorcas.jpg");
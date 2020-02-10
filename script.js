const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let retter = [];
let filterKnap = document.querySelectorAll(".filter");
let kategori = "alle";


document.addEventListener("DOMContentLoaded", start);

function start() {
    hentData();

    filterKnap.forEach(knap => {
        knap.addEventListener("click", filtrering);
    });

}

async function hentData() {
    const response = await fetch(endpoint);
    retter = await response.json();
    console.log(retter);
    visRetter();
}

function filtrering() {
    filterKnap.forEach(knap => {
        knap.classList.remove("valgt");
    });

    this.classList.add("valgt");

    kategori = this.dataset.kategori;
    console.log(kategori);

    visRetter();

}


function visRetter() {
    let container = document.querySelector("#container");
    let retTemplate = document.querySelector("template");
    let article = document.querySelector("article");

    container.innerHTML = "";

    retter.feed.entry.forEach(ret => {
        if (kategori == "alle" || ret.gsx$kategori.$t == kategori) {
            let klon = retTemplate.cloneNode(true).content;
            klon.querySelector("h2").textContent = ret.gsx$navn.$t;
            klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;


            klon.querySelector("p").textContent += ret.gsx$kort.$t;
            klon.querySelector("p:last-child").textContent += ret.gsx$pris.$t + ",-";
            container.appendChild(klon);
        }

    });

}

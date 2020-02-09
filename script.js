const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let retter = [];
document.addEventListener("DOMContentLoaded", start);

function start() {
    hentData();
}

async function hentData() {
    const response = await fetch(endpoint);
    retter = await response.json();
    console.log(retter);
    visRetter();
}


function visRetter() {
    let container = document.querySelector("#container");
    let retTemplate = document.querySelector("template");
    let article = document.querySelector("article");

    retter.feed.entry.forEach(ret => {
        let klon = retTemplate.cloneNode(true).content;
        klon.querySelector("h2").textContent = ret.gsx$navn.$t;
        //klon.querySelector("img").src = ret.gsx$billede.$t;
        klon.querySelector("img").src = "https://nicohj.dk/kea/07_dynamic_content/07_02_01_bistro_babushka/idk2.png"


        klon.querySelector("p").textContent += ret.gsx$kort.$t;
        klon.querySelector("p:last-child").textContent += ret.gsx$pris.$t + ",-";
        container.appendChild(klon);
    });

}

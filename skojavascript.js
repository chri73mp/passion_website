const url = "https://passionwebsite-d8a3.restdb.io/rest/skoene";
const options = {
  headers: {
    "x-apikey": "631f4b4ffdc15b0265f1732c",
  },
};

let data;
let filter = "alle";

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", filtrerSko));

function filtrerSko() {
  filter = this.dataset.sko;
  document.querySelector("h1").textContent = this.textContent;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis();
}

async function hentData() {
  const svar = await fetch(url, options);
  const json = await svar.json();
  data = json;
  console.log(data);
  // behøves det her? kunne man ikke bare sige
  // console.log(json);?
  vis();
}

function vis() {
  const section = document.querySelector("section");
  const template = document.querySelector("template").content;
  section.textContent = "";
  data.forEach((sko) => {
    console.log(filter);
    if (filter == "alle" || filter == sko.person) {
      // skal filtreres mellem 'person', som 'kategori' i babushkaopgaven
      const loop = template.cloneNode(true);
      loop.querySelector("article").addEventListener("click", () => visDetaljer(sko));
      loop.querySelector(".billede").src = "img/" + sko.billede;
      loop.querySelector(".skomærke").textContent = sko.skomærke;
      loop.querySelector(".model").textContent = sko.model;
      loop.querySelector(".skotype").textContent = sko.skotype;
      section.appendChild(loop);
    }
  });
}

// document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));
// indkommenter, når det er popuptid.
// -----------------------------
// array loades ikke, hvis 'popup.style.display' ikke er der i string. Gør den, så 'none'/css'en loades? idk
// eller også gør den, så når der klikkes, at 'none' disregardes?
// -----------------------------
// function visDetaljer(retDetaljer) {
//   console.log("retDetaljer");
//   const popup = document.querySelector("#popup");
//   popup.style.display = "flex";
//   // popup vil ikke ske, hvis ovenstående ikke er skrevet. De to 'display.style' skal altså være der, før modalvisning virker.
//   popup.querySelector("img").src = retDetaljer.billednavn + "-md.jpg";
//   popup.querySelector("h2").textContent = retDetaljer.navn;
//   popup.querySelector("p").textContent = retDetaljer.langbeskrivelse;
//   popup.querySelector("p+p").textContent = "Pris pr. ret: " + retDetaljer.pris + " kr.";
// }

document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));
// array loades ikke, hvis 'popup.style.display' ikke er der i string. Gør den, så 'none'/css'en loades? idk
// eller også gør den, så når der klikkes, at 'none' disregardes?
//

function visDetaljer(skoDetaljer) {
  console.log("skoDetaljer");
  const popup = document.querySelector("#popup");
  popup.style.display = "flex";
  // popup vil ikke ske, hvis ovenstående ikke er skrevet. De to 'display.style' skal altså være der, før modalvisning virker.
  popup.querySelector("img").src = "img/" + skoDetaljer.billede;
  popup.querySelector("h2").textContent = skoDetaljer.skomærke;
  popup.querySelector("p").textContent = skoDetaljer.model;
  popup.querySelector("p+p").textContent = skoDetaljer.skotype;
  // for at få info i popup'en, skal det lokale funktionsnavn bruges istedet for 'sko', som i funktionen 'vis'/loopview.
}

hentData();

// BURGERMENU
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
// Adapted from https://www.w3schools.com/howto/howto_js_mobile_navbar.asp

function menuToggle() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

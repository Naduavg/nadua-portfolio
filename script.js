// Algemene tab wisselaar
function openPage(pageName, elmnt, color) {
  // Verberg alle tabbladen
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Reset achtergrondkleur van alle tabknoppen
  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Toon geselecteerd tabblad
  const selectedTab = document.getElementById(pageName);
  if (selectedTab) selectedTab.style.display = "block";

  // Geef de actieve knop een kleur
  if (elmnt) elmnt.style.backgroundColor = color;

  // Reset fotografie tab
  if (pageName === "fotografie") {
    resetFotografieTab();
  }

  // Reset CMD tab
  if (pageName === "CMDprojecten") {
    resetCMDTab();
  }

  // Verberg alle sub-content
  hideAllSubContent();
}

// -------------------------
// Fotografie functionaliteit
// -------------------------

function resetFotografieTab() {
  const fotografieDiv = document.getElementById("fotografie");

  // Laat fotorijen, titel en uitleg zien
  const fotorijen = fotografieDiv.querySelectorAll(".fotorij");
  fotorijen.forEach(rij => rij.style.display = "flex");

  const h3 = fotografieDiv.querySelector("h3");
  if (h3) h3.style.display = "block";

  const uitlegP = fotografieDiv.querySelector(".uitleg");
  if (uitlegP) uitlegP.style.display = "block";
}

function showPhotoCategory(contentId) {
  const allContentIds = [
    "katten-content",
    "mensen-content",
    "herfst-content",
    "zomer-content",
    "eten-content",
    "lightroom-content",
    "MDES-content",
    "generatief-content",
    "FUTU-content",
    "READ-content",
    "Bieb-content",
    "PMED-content"
  ];

  // Verberg alles
  allContentIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // Toon alleen de gewenste content
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) selectedContent.style.display = "block";

  // Verberg hoofdinhoud fotografie indien van toepassing
  if (["katten-content", "mensen-content", "herfst-content", "zomer-content", "eten-content", "lightroom-content"].includes(contentId)) {
    const fotografieDiv = document.getElementById("fotografie");
    if (fotografieDiv) {
      const fotorijen = fotografieDiv.querySelectorAll(".fotorij");
      fotorijen.forEach(rij => rij.style.display = "none");

      const h3 = fotografieDiv.querySelector("h3");
      if (h3) h3.style.display = "none";

      const uitlegP = fotografieDiv.querySelector(".uitleg");
      if (uitlegP) uitlegP.style.display = "none";
    }
  }

  // Verberg hoofdinhoud CMD indien van toepassing
  if (["MDES-content", "generatief-content", "FUTU-content", "READ-content", "Bieb-content", "PMED-content"].includes(contentId)) {
    const cmdDiv = document.getElementById("CMDprojecten");
    if (cmdDiv) {
      const fotorijen = cmdDiv.querySelectorAll(".fotorij");
      fotorijen.forEach(rij => rij.style.display = "none");

      const h3 = cmdDiv.querySelector("h3");
      if (h3) h3.style.display = "none";

      const uitlegP = cmdDiv.querySelector(".uitleg");
      if (uitlegP) uitlegP.style.display = "none";
    }
  }
}

// CMD functionaliteit

function resetCMDTab() {
  const cmdDiv = document.getElementById("CMDprojecten");

  // Laat fotorijen, titel en uitleg zien
  const fotorijen = cmdDiv.querySelectorAll(".fotorij");
  fotorijen.forEach(rij => rij.style.display = "flex");

  const h3 = cmdDiv.querySelector("h3");
  if (h3) h3.style.display = "block";

  const uitlegP = cmdDiv.querySelector(".uitleg");
  if (uitlegP) uitlegP.style.display = "block";
}

// Verberg alles bij tab wissel

function hideAllSubContent() {
  const allContentIds = [
    "katten-content",
    "mensen-content",
    "herfst-content",
    "zomer-content",
    "eten-content",
    "lightroom-content",
    "MDES-content",
    "generatief-content",
    "FUTU-content",
    "READ-content",
    "Bieb-content",
    "PMED-content"
  ];

  allContentIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

// Pagina standaard starten met fotografie

window.onload = function () {
  document.getElementById("defaultOpen").click();
};

// Knop-functies fotografie

function showKattenContent() {
  showPhotoCategory("katten-content");
}

function showMensenContent() {
  showPhotoCategory("mensen-content");
}

function showHerfstContent() {
  showPhotoCategory("herfst-content");
}

function showZomerContent() {
  showPhotoCategory("zomer-content");
}

function showEtenContent() {
  showPhotoCategory("eten-content");
}

function showLightroomContent() {
  showPhotoCategory("lightroom-content");
}

// Knop-functies CMD

function showMDESContent() {
  showPhotoCategory("MDES-content");
}

function showgeneratiefContent() {
  showPhotoCategory("generatief-content");
}

function showFUTUContent() {
  showPhotoCategory("FUTU-content");
}

function showREADContent() {
  showPhotoCategory("READ-content");
}

function showBiebContent() {
  showPhotoCategory("Bieb-content");
}

function showPMEDContent() {
  showPhotoCategory("PMED-content");
}



const balk = document.getElementById("balk");

window.addEventListener("scroll", function() {
  const scrollBar = document.getElementById("scroll-bar");
  const balkTop = balk.getBoundingClientRect().top;

  // Als het menu de bovenkant van de viewport raakt
  if (balkTop <= 0) {
    scrollBar.classList.add("visible");
  } else {
    scrollBar.classList.remove("visible");
  }
});

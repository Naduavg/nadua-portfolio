// Algemene tab wisselaar
function openPage(pageName, elmnt, color) {
  // Verberg alle tabbladen
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.querySelectorAll(".tablink, .sublink, .site-name").forEach(btn => {
    btn.classList.remove("actief");
    btn.style.backgroundColor = "";
  });

  // Toon geselecteerd tabblad
  const selectedTab = document.getElementById(pageName);
  if (selectedTab) selectedTab.style.display = pageName === "home" ? "flex" : "block";

  if (elmnt) elmnt.classList.add("actief");

  document.querySelectorAll(".nav-group").forEach(group => group.classList.remove("open"));
  if (elmnt) {
    const group = elmnt.closest(".nav-group");
    if (group) group.classList.add("open");
  }

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

function openSection(pageName, elmnt) {
  const group = elmnt?.closest(".nav-group");
  const wasOpen = group?.classList.contains("open");

  openPage(pageName, elmnt);

  document.querySelectorAll(".nav-group").forEach(item => item.classList.remove("open"));
  if (group && !wasOpen) {
    group.classList.add("open");
  }
}

// -------------------------
// Fotografie functionaliteit
// -------------------------

function resetFotografieTab() {
  const fotografieDiv = document.getElementById("fotografie");

  const thumbnailGrid = fotografieDiv?.querySelector(".thumbnail-grid");
  if (thumbnailGrid) thumbnailGrid.style.display = "";

  const h3 = fotografieDiv.querySelector("h3");
  if (h3) h3.style.display = "block";

  const uitlegP = fotografieDiv.querySelector(".uitleg, .pagina-uitleg");
  if (uitlegP) uitlegP.style.display = "block";
}

function showPhotoCategory(contentId) {
  const allContentIds = [
    "katten-content",
    "mensen-content",
    "herfst-content",
    "zomer-content",
    "ijsland-content",
    "kastelen-content",
    "noorwegen-content",
    "lightroom-content",
    "MDES-content",
    "generatief-content",
    "FUTU-content",
    "READ-content",
    "Bieb-content",
    "PMED-content"
  ];

  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Verberg alles
  allContentIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // Toon alleen de gewenste content
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) selectedContent.style.display = "block";

  const fotoGroup = document.querySelector('.nav-group[data-section="fotografie"]');
  if (fotoGroup) {
    document.querySelectorAll(".nav-group").forEach(group => group.classList.remove("open"));
    fotoGroup.classList.add("open");
  }

  document.querySelectorAll(".tablink, .sublink, .site-name").forEach(btn => btn.classList.remove("actief"));
  document.querySelectorAll(".sublink").forEach(btn => {
    if (btn.getAttribute("onclick") && btn.getAttribute("onclick").toLowerCase().includes(contentId.replace("-content", ""))) {
      btn.classList.add("actief");
    }
  });

  // Verberg hoofdinhoud fotografie indien van toepassing
  if (["katten-content", "mensen-content", "herfst-content", "zomer-content", "ijsland-content", "kastelen-content", "noorwegen-content", "lightroom-content"].includes(contentId)) {
    const fotografieDiv = document.getElementById("fotografie");
    if (fotografieDiv) {
      const thumbnailGrid = fotografieDiv.querySelector(".thumbnail-grid");
      if (thumbnailGrid) thumbnailGrid.style.display = "none";

      const h3 = fotografieDiv.querySelector("h3");
      if (h3) h3.style.display = "none";

      const uitlegP = fotografieDiv.querySelector(".uitleg, .pagina-uitleg");
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
    "ijsland-content",
    "kastelen-content",
    "noorwegen-content",
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

function matchSiteNameWidth() {
  const first = document.querySelector(".site-name-top");
  const last = document.querySelector(".site-name-bottom");
  if (!first || !last) return;

  function textWidth(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const width = range.getBoundingClientRect().width;
    range.detach();
    return width;
  }

  first.style.fontSize = "";
  const target = textWidth(last);
  if (!target) return;

  const base = parseFloat(getComputedStyle(last).fontSize) || 16;
  let lo = base;
  let hi = base * 4;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    first.style.fontSize = mid + "px";
    if (textWidth(first) < target) lo = mid;
    else hi = mid;
  }
  first.style.fontSize = hi + "px";
}

window.addEventListener("resize", matchSiteNameWidth);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(matchSiteNameWidth);
}

// Pagina standaard starten met fotografie en laadscherm verbergen

window.addEventListener("load", function () {
  const defaultTab = document.getElementById("defaultOpen");
  if (defaultTab) defaultTab.click();
  matchSiteNameWidth();

  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }

  // Fullscreen image viewer (lightbox)
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  if (lightbox && lightboxImage) {
    let gallery = [];
    let galleryIndex = 0;

    function isLightboxImage(img) {
      return (
        img.closest("#preloader") ||
        img.closest("#scroll-bar") ||
        img.closest(".tabmenu") ||
        img.closest(".titelsmiley") ||
        img.closest(".logorond") ||
        img.closest("#headerlaag1") ||
        img.closest(".headerlaag2") ||
        img.closest(".hobby-iconen") ||
        img.closest(".sidebar-voet") ||
        img.closest("#lightbox") ||
        img.classList.contains("ster") ||
        img.id === "hamburger" ||
        img.getAttribute("onclick")
      );
    }

    function getVisiblePageImages() {
      const page = document.querySelector(".tabcontent[style*='block']") ||
        [...document.querySelectorAll(".tabcontent")].find(el => getComputedStyle(el).display !== "none");
      if (!page) return [];
      return [...page.querySelectorAll("img")].filter(img => !isLightboxImage(img) && img.src);
    }

    function updateNavButtons() {
      const multi = gallery.length > 1;
      if (lightboxPrev) lightboxPrev.hidden = !multi;
      if (lightboxNext) lightboxNext.hidden = !multi;
    }

    function showGalleryImage(index) {
      if (!gallery.length) return;
      galleryIndex = (index + gallery.length) % gallery.length;
      const img = gallery[galleryIndex];
      lightboxImage.src = img.currentSrc || img.src;
      lightboxImage.alt = img.alt || "";
      updateNavButtons();
    }

    function openLightbox(img) {
      gallery = getVisiblePageImages();
      const index = gallery.indexOf(img);
      galleryIndex = index >= 0 ? index : 0;
      if (index < 0 && img.src) {
        gallery = [img, ...gallery.filter(item => item !== img)];
        galleryIndex = 0;
      }
      showGalleryImage(galleryIndex);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      gallery = [];
      galleryIndex = 0;
      updateNavButtons();
    }

    function showNext() {
      if (gallery.length > 1) showGalleryImage(galleryIndex + 1);
    }

    function showPrev() {
      if (gallery.length > 1) showGalleryImage(galleryIndex - 1);
    }

    document.querySelectorAll("img").forEach(img => {
      if (isLightboxImage(img)) return;

      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openLightbox(img));
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      showPrev();
    });
    if (lightboxNext) lightboxNext.addEventListener("click", (event) => {
      event.stopPropagation();
      showNext();
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      }
    });

    updateNavButtons();
  }
});

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

function showIjslandContent() {
  showPhotoCategory("ijsland-content");
}

function showKastelenContent() {
  showPhotoCategory("kastelen-content");
}

function showNoorwegenContent() {
  showPhotoCategory("noorwegen-content");
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
  if (!scrollBar || !balk || window.innerWidth > 800) {
    if (scrollBar) scrollBar.classList.remove("visible");
    return;
  }
  const balkTop = balk.getBoundingClientRect().top;

  // Als het menu de bovenkant van de viewport raakt
  if (balkTop <= 0) {
    scrollBar.classList.add("visible");
  } else {
    scrollBar.classList.remove("visible");
  }
});

// Klik op de scroll-balk: terug naar boven & naar home-tab
const scrollBarClick = document.getElementById("scroll-bar");
if (scrollBarClick) {
  scrollBarClick.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const defaultTab = document.getElementById("defaultOpen");
    if (defaultTab) defaultTab.click();
  });
}


// Hamburger menu – alleen mobile
const hamburger = document.getElementById("hamburger");
const tabmenu = document.querySelector(".tabmenu");
const menuClose = document.getElementById("menuClose");

function closeMobileMenu() {
  if (tabmenu) tabmenu.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function openMobileMenu() {
  if (!tabmenu) return;
  tabmenu.classList.add("open");
  document.body.classList.add("menu-open");
}

if (hamburger && tabmenu) {
  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    openMobileMenu();
  });
}

if (menuClose && tabmenu) {
  menuClose.addEventListener("click", () => {
    closeMobileMenu();
  });
}

document.addEventListener("click", (event) => {
  if (window.innerWidth > 800 || !tabmenu?.classList.contains("open")) return;
  if (tabmenu.contains(event.target) || hamburger?.contains(event.target)) return;
  closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

function bindMobileMenuClose(selector) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 800) closeMobileMenu();
    });
  });
}

document.querySelectorAll(".tablink").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth > 800) return;
    if (link.closest(".nav-group")) return;
    closeMobileMenu();
  });
});
bindMobileMenuClose(".sublink");
bindMobileMenuClose(".site-name");


(function () {
  var D = window.PORTFOLIO, O = D.owner;
  function validTheme(t) { return t === "dark" || t === "light" ? t : null; }
  function readTheme() {
    var t = null;
    try { t = validTheme(new URLSearchParams(location.search).get("theme")); } catch (e) {}
    if (!t) { try { t = validTheme(localStorage.getItem("theme")); } catch (e) {} }
    if (!t) { try { t = validTheme(sessionStorage.getItem("theme")); } catch (e) {} }
    return t || "light";                       // 
  }
  function keepThemeInLinks(t) {
    
    if (location.protocol !== "file:") return;
    document.querySelectorAll("a[href]").forEach(function (a) {
      var m = /^([\w-]+\.html)(\?[^#]*)?(#.*)?$/.exec(a.getAttribute("href"));
      if (m) a.setAttribute("href", m[1] + "?theme=" + t + (m[3] || ""));
    });
  }
  function saveTheme(t) {
    try { localStorage.setItem("theme", t); } catch (e) {}
    try { sessionStorage.setItem("theme", t); } catch (e) {}
    keepThemeInLinks(t);
  }
  document.documentElement.dataset.theme = readTheme();

  var ICONS = {
    github: '<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>',
    linkedin: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.200 2.1 2.1 0 0 1 0 4.200zM7.1 20.500H3.600V9h3.500v11.500zM22.200 0H1.800C.8 0 0 .8 0 1.700v20.600c0 .9.8 1.700 1.800 1.700h20.400c1 0 1.800-.8 1.800-1.700V1.700C24 .8 23.200 0 22.200 0z"/>',
    email: '<path d="M3 5h18v14H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/>'
  };
  function icon(k) {
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' +
      (ICONS[k] || '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>') + "</svg>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function brandMark() {
    return O.logo ? '<img class="logo" src="' + esc(O.logo) + '" alt="' + esc(O.name) + '" height="36">' : esc(O.brand);
  }
  function socials(order) {


    
   return (order || Object.keys(O.socials)).filter(function (k) { return O.socials[k]; }).map(function (k) {
    var ext = k !== "email" ? ' target="_blank" rel="noopener"' : "";
    // text shown on hover: the link itself (for email, without the "mailto:" part)
    var tip = O.socials[k].replace("mailto:", "");
    return '<a href="' + esc(O.socials[k]) + '" aria-label="' + k + '" title="' + esc(tip) + '"' + ext + ">" + icon(k) + "</a>";
  }).join("");



    
  }

  var PAGES = [["index.html", "Home", "home"], ["skills.html", "Skills", "skills"],
    ["projects.html", "Projects", "projects"], ["achievements.html", "Achievements", "achievements"],
    ["publications.html", "Publications", "publications"]];

  function chrome() {
    var page = document.body.dataset.page;
    var links = PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (page === p[2] ? ' aria-current="page"' : "") + ">" + p[1] + "</a>";
    }).join("");
    var h = document.getElementById("site-header");
    h.className = "site-header";
    h.innerHTML = '<div class="wrap bar"><a class="brand" href="index.html">' + brandMark() + "</a>" +
      '<nav id="nav" aria-label="Main">' + links +
      '<a class="btn nav-cta" href="contact.html"' + (page === "contact" ? ' aria-current="page"' : "") + ">Contact<span class=\"more\"> me</span></a></nav>" +
      '<button class="icon-btn" id="theme" aria-label="Switch light or dark mode"></button></div>';

    var burger = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.200" fill="none" stroke-linecap="round"/></svg>';
    h.querySelector(".bar").insertAdjacentHTML("beforeend",
      '<button class="icon-btn menu-btn" id="menu" aria-label="Open menu" aria-expanded="false" aria-controls="menu-panel">' + burger + "</button>");
    h.insertAdjacentHTML("beforeend", '<div class="menu-panel" id="menu-panel" hidden><div class="menu-inner">' + links +
      '<a class="btn" href="contact.html"' + (page === "contact" ? ' aria-current="page"' : "") + '>Contact me</a>' +
      '<button class="menu-theme" id="theme-m" type="button"></button></div></div>');

    var f = document.getElementById("site-footer");
    f.className = "site-footer";
    f.innerHTML = '<div class="wrap foot"><div class="socials">' + socials(["linkedin", "github", "email"]) + "</div></div>" +
      '<p class="copy">&copy; ' + new Date().getFullYear() + " " + esc(O.name) + ". All rights reserved.</p>";

    var top = document.createElement("button");
    top.className = "to-top"; top.setAttribute("aria-label", "Back to top"); top.innerHTML = "&uarr;";
    top.onclick = function () { scrollTo({ top: 0, behavior: "smooth" }); };
    document.body.appendChild(top);
    addEventListener("scroll", function () { top.classList.toggle("show", scrollY > 500); }, { passive: true });

    var SUN = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.500 1.500M17.500 17.500L19 19M5 19l1.500-1.500M17.500 6.500L19 5"/></svg>';
    var MOON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/></svg>';
    var themeBtn = document.getElementById("theme"), themeM = document.getElementById("theme-m");
    function paintTheme() {
      var dark = document.documentElement.dataset.theme === "dark";
      themeBtn.innerHTML = dark ? SUN : MOON;
      themeM.innerHTML = (dark ? SUN : MOON) + "<span>" + (dark ? "Light mode" : "Dark mode") + "</span>";
    }
    function toggleTheme() {
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      saveTheme(next);
      paintTheme();
    }
    paintTheme();
    themeBtn.onclick = toggleTheme;
    themeM.onclick = toggleTheme;

    var menu = document.getElementById("menu"), panel = document.getElementById("menu-panel");
    function setMenu(open) {
      panel.hidden = !open;
      menu.setAttribute("aria-expanded", open);
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    menu.onclick = function () { setMenu(panel.hidden); };
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !menu.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { setMenu(false); menu.focus(); }
    });
    panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  }

  function skillGrid(groups, flat) {
    var all = [];
    groups.forEach(function (g) { all = all.concat(g.items); });
    function tile(s) {
    

      return '<li title="' + esc(s.name) + '"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/' + esc(s.icon) +
            '.svg" alt="' + esc(s.name) + '" width="40" height="40" loading="lazy"' + (/github/.test(s.icon) ? ' class="inv"' : '') + '><span>' + esc(s.name) + "</span></li>";

    }
    if (flat) return '<ul class="skill-grid">' + all.map(tile).join("") + "</ul>";
    return groups.map(function (g) {
      return '<section class="skill-group"><h3>' + esc(g.group) + '</h3><ul class="skill-grid">' +
        g.items.map(tile).join("") + "</ul></section>";
    }).join("");
  }

  function projectCards(list) {
    return list.map(function (p) {
      var thumb = p.image
        ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy">'
        : '<span class="ph">' + esc(p.title.charAt(0)) + "</span>";
      return '<article class="card project"><div class="thumb">' + thumb + '</div><div class="body"><h3>' + esc(p.title) +
        '</h3><p class="cat">' + esc(p.category) + "</p><p>" + esc(p.description) + '</p><ul class="tags">' +
        (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul><div class="actions">' +
        '<a class="btn btn-ghost" href="' + esc(p.github) + '" target="_blank" rel="noopener">View code</a>' +
        '<a class="btn" href="' + esc(p.live) + '" target="_blank" rel="noopener">View project</a></div></div></article>';
    }).join("");
  }

  function awardList(list) {
    return list.map(function (a) {
      return '<li class="entry"><span class="year">' + esc(a.year) + "</span><div><h3>" + esc(a.title) + "</h3><p class=\"cat\">" +
        esc(a.issuer) + "</p><p>" + esc(a.description) + "</p></div></li>";
    }).join("");
  }
  var TROPHY = '<svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.500a2.500 2.500 0 0 1 0-5H6M18 9h1.500a2.500 2.500 0 0 0 0-5H18M4 22h16M10 14.700V17c0 .5-.5 1-1 1.200C7.900 18.800 7 20.200 7 22M14 14.700V17c0 .5.500 1 1 1.200 1.100.6 2 2 2 3.800M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>';
  function isPdf(u) { return /\.pdf($|\?)/i.test(u); }
  function awardCards(list) {
    return list.map(function (a) {
      var c = a.certificate, thumb, action = "";
      if (c && !isPdf(c)) {
        thumb = '<button class="cert" data-cert="' + esc(c) + '" data-title="' + esc(a.title) + '" aria-label="View certificate for ' + esc(a.title) + '"><img src="' + esc(c) + '" alt="Certificate: ' + esc(a.title) + '" loading="lazy"></button>';
        action = '<button class="btn btn-ghost" data-cert="' + esc(c) + '" data-title="' + esc(a.title) + '">View certificate</button>';
      } else if (c) {
        thumb = '<a class="cert pdf" href="' + esc(c) + '" target="_blank" rel="noopener" aria-label="Open certificate PDF for ' + esc(a.title) + '">PDF certificate</a>';
        action = '<a class="btn btn-ghost" href="' + esc(c) + '" target="_blank" rel="noopener">View certificate</a>';
      } else {
        thumb = '<div class="cert none">' + TROPHY + "</div>";
      }
      return '<article class="card award">' + thumb + '<div class="body"><div class="meta">' +
        (a.prize ? '<span class="prize">' + esc(a.prize) + "</span>" : "") + '<span class="yr">' + esc(a.year) + "</span></div><h3>" +
        esc(a.title) + '</h3><p class="cat">' + esc(a.issuer) + "</p><p>" + esc(a.description) + "</p>" +
        (action ? '<div class="actions">' + action + "</div>" : "") + "</div></article>";
    }).join("");
  }

  function lightbox() {
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML = '<button class="icon-btn close" aria-label="Close certificate">&times;</button><img alt=""><p class="cap"></p>';
    document.body.appendChild(dlg);
    var img = dlg.querySelector("img"), cap = dlg.querySelector(".cap");
    dlg.querySelector(".close").onclick = function () { dlg.close(); };
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cert]");
      if (!t || !dlg.showModal) return;
      img.src = t.dataset.cert; img.alt = "Certificate: " + t.dataset.title; cap.textContent = t.dataset.title;
      dlg.showModal();
    });
  }

  function pubList(list) {
    return list.map(function (p) {
      var link = p.link ? ' <a class="inline" href="' + esc(p.link) + '" target="_blank" rel="noopener">Read paper</a>' : "";
      return '<li class="entry"><span class="year">' + esc(p.year) + "</span><div><h3>" + esc(p.title) + '</h3><p class="cat">' +
        esc(p.venue) + "</p><p>" + esc(p.authors) + link + "</p></div></li>";
    }).join("");
  }

  function render() {
    var fav = document.querySelector('link[rel~="icon"]');
    if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
    fav.href = O.logo || "images/logo.png";
    document.querySelectorAll("[data-bind]").forEach(function (el) { el.textContent = O[el.dataset.bind] || ""; });
    document.querySelectorAll("[data-render]").forEach(function (el) {
      var k = el.dataset.render, n = parseInt(el.dataset.limit, 10) || 99;
      if (k === "skills-flat") el.innerHTML = skillGrid(D.skills, true);
      if (k === "skills") el.innerHTML = skillGrid(D.skills, false);
      if (k === "projects") el.innerHTML = projectCards(D.projects.slice(0, n));
      if (k === "achievements") el.innerHTML = awardList(D.achievements.slice(0, n));
      if (k === "achievements-cards") el.innerHTML = awardCards(D.achievements);
      if (k === "publications") el.innerHTML = pubList(D.publications.slice(0, n));
      if (k === "about") el.innerHTML = O.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
      if (k === "facts") el.innerHTML = O.facts.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("");
      if (k === "socials") el.innerHTML = socials();
    });
    var photo = document.querySelector("[data-photo]");
    if (photo) {
      photo.alt = O.name;
      photo.onerror = function () { photo.remove(); };
      photo.src = O.photo;
      var ini = document.querySelector("[data-initials]");
      if (ini) ini.textContent = O.brand;
    }
    var cv = document.querySelector("[data-cv]");
    if (cv) cv.href = O.cv;
    document.title = document.title.replace("Your Name", O.name);
  }

  function contactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status"), btn = form.querySelector("button[type=submit]");
    var C = D.contact;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.website.value) return;                       // spam trap
      var v = { name: form.name.value.trim(), email: form.email.value.trim(), phone: form.phone.value.trim(), message: form.message.value.trim() };
      status.className = "status";
      if (!v.name || !v.message || !/^\S+@\S+\.\S+$/.test(v.email)) {
        status.classList.add("err");
        status.textContent = "Please enter your name, a valid email address and a message.";
        return;
      }
      var jobs = [];
      if (C.emailjs.publicKey && window.emailjs) {
        jobs.push(emailjs.send(C.emailjs.serviceId, C.emailjs.templateId, {
          from_name: v.name, from_email: v.email, phone: v.phone, message: v.message, reply_to: v.email
        }, { publicKey: C.emailjs.publicKey }));
      }
      if (C.googleForm.action) {
        var body = new URLSearchParams(), en = C.googleForm.entries;
        body.append(en.name, v.name); body.append(en.email, v.email);
        body.append(en.phone, v.phone); body.append(en.message, v.message);
        jobs.push(fetch(C.googleForm.action, { method: "POST", mode: "no-cors", body: body }));
      }
      status.className = "status";
      if (!jobs.length) {
        status.classList.add("err");
        status.textContent = "The form is not connected yet. Add your EmailJS and Google Form details in js/data.js.";
        return;
      }
      btn.disabled = true; status.textContent = "Sending your message...";
      Promise.allSettled(jobs).then(function (r) {
        btn.disabled = false;
        if (r.some(function (x) { return x.status === "fulfilled"; })) {
          status.classList.add("ok");
          status.textContent = "Thank you, " + v.name + ". Your message was sent.";
          form.reset();
        } else {
          status.classList.add("err");
          status.textContent = "The message could not be sent. Please email me directly instead.";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () { chrome(); render(); contactForm(); lightbox(); keepThemeInLinks(document.documentElement.dataset.theme); });
})();

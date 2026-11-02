(function () {
  "use strict";

  var KEY = "jne-v1";
  var AVATAR = "https://pbs.twimg.com/profile_images/2050451324752240640/zZOle_30.jpg";

  var FOUNDER = {
    id: "johnblackpipes",
    handle: "JohnBlackPipes",
    name: "John Black Pipes",
    ageLabel: "40",
    city: "Johannesburg",
    province: "Gauteng",
    role: "Founder · Creator",
    headline: "Black 40 · Open Minded & Experienced",
    bio:
      "Founder of Jozi Nites — South Africa’s wellness hub for adult content, creators, education, and real connection without shame. Lifestyle focused on pleasure, partner exploration, and open-minded nights across Jozi.",
    interests: [
      "Pleasure education",
      "Partner exploration",
      "Group play",
      "Swingers",
      "MSM",
      "Consent culture",
      "Jozi nights",
      "Community building"
    ],
    links: {
      ddirt: "https://ddirt.com/JohnBlackPipes",
      x: "https://x.com/JohnBlackPipes1",
      site: "https://jozi-nites-hub.github.io/Website/"
    },
    stats: { nights: 12, circles: 6, followers: 1760 }
  };

  var NIGHTS = [
    {
      id: "n1",
      title: "Sinful Sunday — North of Jozi",
      when: "Sundays · evening",
      city: "Johannesburg North",
      detail: "18+ social night. Consent brief at the door. Hosted in the Jozi Nites spirit — no pressure, no shame.",
      tags: ["Social", "18+"]
    },
    {
      id: "n2",
      title: "Education circle: consent & play",
      when: "Mid-week · online + in person",
      city: "Jozi / Online",
      detail: "Short briefings for adults exploring boundaries, communication, and safer play. Not a party — a learning room.",
      tags: ["Education", "Consent"]
    },
    {
      id: "n3",
      title: "Creator open table",
      when: "Monthly",
      city: "Johannesburg",
      detail: "For adult content creators and allies. Trade notes, safety practices, and collab ideas under Jozi Nites values.",
      tags: ["Creators", "Community"]
    }
  ];

  var CIRCLES = [
    { id: "c1", name: "Consent first", blurb: "Talks and resources on enthusiastic consent.", members: 84 },
    { id: "c2", name: "Jozi nights", blurb: "People actually in Gauteng planning real meet-ups.", members: 210 },
    { id: "c3", name: "Creators room", blurb: "Adult creators, safety, and professional standards.", members: 56 },
    { id: "c4", name: "Open-minded couples", blurb: "Couples exploring together — stigma free.", members: 93 },
    { id: "c5", name: "MSM Jozi", blurb: "Men who connect with men — respectful and adult.", members: 128 },
    { id: "c6", name: "Pleasure education", blurb: "Body literacy, toys, and honest questions.", members: 71 }
  ];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  var state = Object.assign(
    {
      entered: false,
      following: false,
      liked: false,
      joined: [],
      going: [],
      messages: [],
      me: null
    },
    load()
  );

  var view = document.getElementById("view");
  var gate = document.getElementById("gate");
  var app = document.getElementById("app");
  var drawer = document.getElementById("drawer");
  var toastEl = document.getElementById("toast");
  var current = "home";

  function toast(msg) {
    toastEl.hidden = false;
    toastEl.textContent = msg;
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () {
      toastEl.hidden = true;
    }, 2400);
  }

  function persist() {
    save({
      entered: state.entered,
      following: state.following,
      liked: state.liked,
      joined: state.joined,
      going: state.going,
      messages: state.messages,
      me: state.me
    });
  }

  function enter() {
    state.entered = true;
    persist();
    gate.hidden = true;
    app.hidden = false;
    route(current);
  }

  document.getElementById("enter-btn").addEventListener("click", enter);
  if (state.entered) {
    gate.hidden = true;
    app.hidden = false;
  }

  document.getElementById("menu-btn").addEventListener("click", function () {
    drawer.classList.toggle("open");
  });

  document.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-nav]");
    if (!nav) {
      if (drawer.classList.contains("open") && !e.target.closest(".drawer") && !e.target.closest("#menu-btn")) {
        drawer.classList.remove("open");
      }
      return;
    }
    e.preventDefault();
    drawer.classList.remove("open");
    route(nav.getAttribute("data-nav"));
  });

  function setActive(name) {
    current = name;
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-nav") === name);
    });
  }

  function route(name) {
    setActive(name);
    if (name === "home") renderHome();
    else if (name === "profile") renderProfile();
    else if (name === "nights") renderNights();
    else if (name === "circles") renderCircles();
    else if (name === "wire") renderWire();
    else if (name === "you") renderYou();
    window.scrollTo(0, 0);
  }

  function renderHome() {
    view.innerHTML =
      '<section class="hero">' +
      '<div class="hero-card">' +
      '<p class="eyebrow">Jozi Nites Encounters</p>' +
      '<h1 class="tagline">Where Mzansi nights find each other</h1>' +
      '<p class="lede">Consent-first connection for adults across Johannesburg and beyond. Real profiles. Real values. No shame.</p>' +
      '<div class="chip-row">' +
      '<span class="chip gold">18+</span>' +
      '<span class="chip">Safe</span>' +
      '<span class="chip">Educated</span>' +
      '<span class="chip">Unashamed</span>' +
      "</div>" +
      '<div class="actions">' +
      '<button type="button" class="btn primary sm" data-nav="profile">Meet JohnBlackPipes</button>' +
      '<button type="button" class="btn ghost sm" data-nav="nights">Upcoming nights</button>' +
      "</div></div></section>" +
      '<p class="tip">House rule: a follow or message is not consent to anything else. Always confirm in person.</p>' +
      '<h2>Featured member</h2>' +
      founderCard() +
      '<h2>On the pulse</h2>' +
      '<article class="card pulse-item">' +
      '<img class="mini-av" src="' +
      AVATAR +
      '" alt="" />' +
      "<div><strong>" +
      FOUNDER.handle +
      '</strong> <span class="time">· founder</span>' +
      "<p>Building Jozi Nites Encounters as a safe wire for adults who want connection without stigma. Start with consent. Stay for the community.</p>" +
      '<div class="actions">' +
      '<button type="button" class="btn ghost sm" data-nav="profile">Open profile</button>' +
      '<a class="btn ghost sm" href="' +
      FOUNDER.links.ddirt +
      '" target="_blank" rel="noopener">DDirt ↗</a>' +
      "</div></div></article>";
  }

  function founderCard() {
    return (
      '<article class="card">' +
      '<div class="profile-head">' +
      '<img class="avatar" src="' +
      AVATAR +
      '" alt="John Black Pipes" width="88" height="88" />' +
      "<div>" +
      "<h3>" +
      FOUNDER.handle +
      "</h3>" +
      '<p class="meta"><span class="status-dot" title="Active"></span>' +
      FOUNDER.city +
      ", " +
      FOUNDER.province +
      " · " +
      FOUNDER.role +
      "</p>" +
      "<p><strong>" +
      FOUNDER.headline +
      "</strong></p>" +
      "</div></div>" +
      '<p style="margin-top:0.85rem">' +
      FOUNDER.bio +
      "</p>" +
      '<div class="chip-row">' +
      FOUNDER.interests
        .slice(0, 6)
        .map(function (i) {
          return '<span class="chip">' + i + "</span>";
        })
        .join("") +
      "</div>" +
      '<div class="stat-row" style="margin-top:0.85rem">' +
      "<div class=\"stat\"><b>" +
      FOUNDER.stats.followers +
      "</b><span>Followers</span></div>" +
      "<div class=\"stat\"><b>" +
      FOUNDER.stats.nights +
      "</b><span>Nights</span></div>" +
      "<div class=\"stat\"><b>" +
      FOUNDER.stats.circles +
      "</b><span>Circles</span></div>" +
      "</div>" +
      '<div class="actions">' +
      '<button type="button" class="btn primary sm" id="follow-btn">' +
      (state.following ? "Following" : "Follow") +
      "</button>" +
      '<button type="button" class="btn ghost sm" id="like-btn">' +
      (state.liked ? "Liked" : "Like") +
      "</button>" +
      '<button type="button" class="btn ghost sm" data-nav="wire">Message</button>' +
      "</div></article>"
    );
  }

  function bindFounderActions() {
    var f = document.getElementById("follow-btn");
    var l = document.getElementById("like-btn");
    if (f)
      f.onclick = function () {
        state.following = !state.following;
        persist();
        f.textContent = state.following ? "Following" : "Follow";
        toast(state.following ? "You follow JohnBlackPipes" : "Unfollowed");
      };
    if (l)
      l.onclick = function () {
        state.liked = !state.liked;
        persist();
        l.textContent = state.liked ? "Liked" : "Like";
        toast(state.liked ? "Liked" : "Like removed");
      };
  }

  function renderProfile() {
    view.innerHTML =
      '<p class="eyebrow">Member profile</p>' +
      "<h2>" +
      FOUNDER.name +
      "</h2>" +
      founderCard() +
      '<div class="card">' +
      "<h3>About</h3>" +
      "<p>" +
      FOUNDER.bio +
      "</p>" +
      '<p class="meta" style="margin-top:0.75rem">Age band on DDirt: 35–39 · Public headline: Black 40 · Open Minded & Experienced</p>' +
      "</div>" +
      '<div class="card">' +
      "<h3>Interests</h3>" +
      '<div class="chip-row">' +
      FOUNDER.interests
        .map(function (i) {
          return '<span class="chip">' + i + "</span>";
        })
        .join("") +
      "</div></div>" +
      '<div class="card">' +
      "<h3>Links</h3>" +
      '<div class="actions">' +
      '<a class="btn ghost sm" href="' +
      FOUNDER.links.ddirt +
      '" target="_blank" rel="noopener">DDirt profile ↗</a>' +
      '<a class="btn ghost sm" href="' +
      FOUNDER.links.x +
      '" target="_blank" rel="noopener">X / Twitter ↗</a>' +
      '<a class="btn ghost sm" href="' +
      FOUNDER.links.site +
      '" target="_blank" rel="noopener">Jozi Nites ↗</a>' +
      "</div>" +
      '<p class="fine">Media gallery lives on DDirt. This site surfaces identity, values, and how to connect — not mirrored explicit media.</p>' +
      "</div>" +
      '<div class="card">' +
      "<h3>Gallery note</h3>" +
      '<div class="gallery">' +
      '<button type="button" class="ph" data-open-ddirt>View on DDirt</button>' +
      '<button type="button" class="ph" data-open-ddirt>Photos ↗</button>' +
      '<button type="button" class="ph" data-open-ddirt>More ↗</button>' +
      "</div></div>";

    bindFounderActions();
    view.querySelectorAll("[data-open-ddirt]").forEach(function (btn) {
      btn.onclick = function () {
        window.open(FOUNDER.links.ddirt, "_blank", "noopener");
      };
    });
  }

  function renderNights() {
    view.innerHTML =
      "<h2>Nights</h2>" +
      '<p class="lede">18+ plans under the Jozi Nites banner. Marking interested saves on this device until full ticketing is live.</p>' +
      '<p class="tip">Showing up is not a yes. Confirm boundaries with hosts and other guests.</p>' +
      NIGHTS.map(function (n) {
        var on = state.going.indexOf(n.id) >= 0;
        return (
          '<article class="card" data-night="' +
          n.id +
          '">' +
          '<p class="meta">' +
          n.when +
          " · " +
          n.city +
          "</p>" +
          "<h3>" +
          n.title +
          "</h3>" +
          "<p>" +
          n.detail +
          "</p>" +
          '<div class="chip-row">' +
          n.tags
            .map(function (t) {
              return '<span class="chip">' + t + "</span>";
            })
            .join("") +
          "</div>" +
          '<div class="actions">' +
          '<button type="button" class="btn ' +
          (on ? "primary" : "ghost") +
          ' sm going-btn">' +
          (on ? "Interested" : "I'm interested") +
          "</button>" +
          "</div></article>"
        );
      }).join("");

    view.querySelectorAll("[data-night]").forEach(function (card) {
      var id = card.getAttribute("data-night");
      card.querySelector(".going-btn").onclick = function () {
        var i = state.going.indexOf(id);
        if (i >= 0) state.going.splice(i, 1);
        else state.going.push(id);
        persist();
        renderNights();
        toast(i >= 0 ? "Removed" : "Marked interested");
      };
    });
  }

  function renderCircles() {
    view.innerHTML =
      "<h2>Circles</h2>" +
      '<p class="lede">Interest rooms aligned with Jozi Nites values. Join locally on this device.</p>' +
      CIRCLES.map(function (c) {
        var on = state.joined.indexOf(c.id) >= 0;
        return (
          '<article class="card" data-circle="' +
          c.id +
          '">' +
          "<h3>" +
          c.name +
          "</h3>" +
          "<p>" +
          c.blurb +
          "</p>" +
          '<p class="meta">' +
          (c.members + (on ? 1 : 0)) +
          " marked</p>" +
          '<button type="button" class="btn ' +
          (on ? "primary" : "ghost") +
          ' sm join-btn">' +
          (on ? "Joined" : "Join circle") +
          "</button>" +
          "</article>"
        );
      }).join("");

    view.querySelectorAll("[data-circle]").forEach(function (card) {
      var id = card.getAttribute("data-circle");
      card.querySelector(".join-btn").onclick = function () {
        var i = state.joined.indexOf(id);
        if (i >= 0) state.joined.splice(i, 1);
        else state.joined.push(id);
        persist();
        renderCircles();
        toast(i >= 0 ? "Left circle" : "Joined circle");
      };
    });
  }

  function renderWire() {
    var thread =
      state.messages.length === 0
        ? '<p class="meta">No messages yet. Say hello — messages stay on this device until backend messaging ships.</p>'
        : state.messages
            .map(function (m) {
              return (
                '<div class="card" style="padding:0.75rem 1rem">' +
                '<p class="meta">' +
                (m.me ? "You" : FOUNDER.handle) +
                " · " +
                new Date(m.ts).toLocaleString() +
                "</p>" +
                "<p>" +
                escapeHtml(m.text) +
                "</p></div>"
              );
            })
            .join("");

    view.innerHTML =
      "<h2>Wire</h2>" +
      '<p class="lede">Direct line to <strong>' +
      FOUNDER.handle +
      "</strong>. For live chat and media, use the DDirt profile too.</p>" +
      '<p class="tip">Do not share illegal content. 18+ only. Be respectful.</p>' +
      '<div id="thread">' +
      thread +
      "</div>" +
      '<form id="msg-form" class="card">' +
      '<label class="field" for="msg">Message</label>' +
      '<textarea id="msg" maxlength="500" required placeholder="Write a clear, respectful intro…"></textarea>' +
      '<div class="actions">' +
      '<button type="submit" class="btn primary sm">Send</button>' +
      '<a class="btn ghost sm" href="' +
      FOUNDER.links.ddirt +
      '" target="_blank" rel="noopener">Open DDirt ↗</a>' +
      "</div></form>";

    document.getElementById("msg-form").onsubmit = function (e) {
      e.preventDefault();
      var box = document.getElementById("msg");
      var text = box.value.trim();
      if (!text) return;
      state.messages.push({ me: true, text: text, ts: Date.now() });
      persist();
      box.value = "";
      toast("Saved on this device");
      renderWire();
    };
  }

  function renderYou() {
    var me = state.me || { name: "", city: "", about: "", interests: [] };
    view.innerHTML =
      "<h2>You</h2>" +
      '<p class="lede">Your details stay on this device. This is not a public listing until accounts go live.</p>' +
      '<form id="you-form" class="card">' +
      '<label class="field" for="yn">Display name</label>' +
      '<input id="yn" maxlength="40" value="' +
      escapeAttr(me.name || "") +
      '" placeholder="How should people address you?" />' +
      '<label class="field" for="yc">City</label>' +
      '<input id="yc" maxlength="40" value="' +
      escapeAttr(me.city || "") +
      '" placeholder="Johannesburg" />' +
      '<label class="field" for="ya">About</label>' +
      '<textarea id="ya" maxlength="280" placeholder="What are you looking for?">' +
      escapeHtml(me.about || "") +
      "</textarea>" +
      '<div class="actions" style="margin-top:1rem">' +
      '<button type="submit" class="btn primary sm">Save profile</button>' +
      '<button type="button" class="btn ghost sm" id="wipe">Clear my data</button>' +
      "</div></form>" +
      (me.name
        ? '<div class="card"><h3>Saved</h3><p><strong>' +
          escapeHtml(me.name) +
          "</strong>" +
          (me.city ? " · " + escapeHtml(me.city) : "") +
          "</p><p>" +
          escapeHtml(me.about || "") +
          "</p></div>"
        : "");

    document.getElementById("you-form").onsubmit = function (e) {
      e.preventDefault();
      state.me = {
        name: document.getElementById("yn").value.trim(),
        city: document.getElementById("yc").value.trim(),
        about: document.getElementById("ya").value.trim()
      };
      if (!state.me.name) {
        toast("Add a display name");
        return;
      }
      persist();
      toast("Profile saved on this device");
      renderYou();
    };
    document.getElementById("wipe").onclick = function () {
      if (!confirm("Clear your local Jozi Nites Encounters data on this device?")) return;
      state = {
        entered: true,
        following: false,
        liked: false,
        joined: [],
        going: [],
        messages: [],
        me: null
      };
      persist();
      toast("Local data cleared");
      renderYou();
    };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """);
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  if (state.entered) route("home");
})();

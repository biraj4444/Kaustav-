/* ==========================================================
   kaustav.portfolio — SITE CONFIG
   Everything you will ever need to edit lives in this file.
   ========================================================== */

window.SITE = {
  name: "Kaustav Khanikar",
  brand: "kaustav.portfolio",
  email: "kaustav4535@gmail.com",
  phone: "+91 9395046594",
  phoneRaw: "+919395046594",

  /* 1) PROFILE PHOTO (About page + footer) */
  profileImage: "https://iili.io/njMHxe9.png",

  /* 2) HOME PAGE PHONE VIDEO (about 10 seconds, plays automatically, muted, loops)
        Paste your video URL between the quotes. Leave "" to show the built-in intro screen. */
  heroVideo: "",
  heroVideoPoster: "",

  /* 3) PROJECTS
        To add a project later: copy one block, paste it at the TOP of the list, edit the text.
        status: "live" | "upcoming" | "case"   (case = built, no public link)
        featured: true  -> also appears on the Home page (first 3 featured are shown)
        image: optional screenshot URL. Leave "" and a live preview is generated automatically. */
  projects: [
    {
      title: "Expressive Send",
      kind: "Interaction design · Prototype",
      status: "live",
      featured: true,
      url: "https://demo.wanthub7.workers.dev",
      image: "",
      summary:
        "An independent concept for Instagram direct messages. A sent message does not just appear: a small paper plane carries it from the composer to the recipient's avatar, where a brief effect plays before the message settles into the thread.",
      depth:
        "The hard part was restraint. The whole sequence had to be short enough that it never delays a conversation, while still feeling like something was sent to a person. The project ships as a working prototype, a case study and a declaration that it is independent of Meta.",
      stack: ["HTML", "CSS animation", "JavaScript", "Cloudflare"]
    },
    {
      title: "AdSense Helper",
      kind: "Documentation site · Learning tool",
      status: "live",
      featured: true,
      url: "https://adsensehelp.wanthub7.workers.dev",
      image: "",
      summary:
        "A complete, static guide to setting up Google AdSense, written so a beginner can follow it start to finish. Every step has copy-ready code, a reading mode for long text and colour-coded snippets.",
      depth:
        "This replaced a full-stack Flask version that I dismissed on purpose: the content was the product, and a backend only added things that could break. Cutting scope to a static site made it faster, cheaper to host and easier to keep correct.",
      stack: ["HTML", "CSS", "JavaScript", "Cloudflare"]
    },
    {
      title: "Webstore",
      kind: "E-commerce front end",
      status: "live",
      featured: true,
      url: "https://nexus-8d.wanthub7.workers.dev",
      image: "",
      summary:
        "A deployed web storefront, built as a complete shopping experience rather than a single mock screen.",
      depth:
        "Its page structure became the reference I reused when designing later sites, so it doubles as a pattern library for how I organise navigation, content and calls to action.",
      stack: ["HTML", "CSS", "JavaScript", "Cloudflare"]
    },
    {
      title: "txtskill",
      kind: "Prompt library · Static site",
      status: "upcoming",
      featured: true,
      url: "",
      image: "",
      summary:
        "A library of copy-and-paste prompts for AI image and video creation, plus an all-round master prompt for websites, school work and official documents.",
      depth:
        "Planned with a Yale Blue and Lemon Chiffon palette, legal pages, support channels and AdSense readiness from the first day instead of added later.",
      stack: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "OpenCollection",
      kind: "Full-stack platform",
      status: "case",
      featured: false,
      url: "",
      image: "",
      summary:
        "A two-portal resource-sharing platform: a public side for visitors and a separate admin side for managing what is shared.",
      depth:
        "Separating the portals forced clear decisions about roles, routes and which data each side is allowed to see.",
      stack: ["Python", "Flask", "HTML", "CSS"]
    },
    {
      title: "EcoGahan",
      kind: "UI redesign",
      status: "case",
      featured: false,
      url: "",
      image: "",
      summary:
        "A redesign of the interface for an electric-vehicle booking web app under the EcoGahan name.",
      depth:
        "Focused on making a multi-step booking flow clear: fewer decisions per screen and obvious next actions.",
      stack: ["UI/UX", "HTML", "CSS"]
    }
  ],

  /* 5) SETUP AND CONFIGURATION SKILLS (Skills page + Home teaser)
        image: thumbnail URL. Leave "" to show a lettered tile instead. */
  skills: [
    {
      id: "mongodb",
      title: "MongoDB database setup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvVc6Ed8X2RHEFxyT6t0ncpOB5Ni4wnkLVa1ypDVto6-5L1W8mWJCxnKA&s=10",
      short: "Cluster, users, network access and a working connection from the app.",
      setup: [
        "Creating a cluster and a database user with only the permissions the app needs",
        "Network access rules so the hosting platform can reach the database",
        "Building the connection string and keeping it in an environment variable, never in code",
        "Collections, indexes and unique constraints that match how the app queries"
      ],
      fixes: [
        "Authentication failed, usually a wrong user or an unescaped special character in the password",
        "Server selection timeouts caused by blocked IP addresses or a wrong connection string",
        "Data that saves locally but not in production because the variable is missing on the host"
      ]
    },
    {
      id: "storage",
      title: "Cloud storage setup",
      image: "",
      short: "Image and video hosting with safe uploads and fast delivery.",
      setup: [
        "Creating a cloud storage account and organising assets into folders",
        "Signed and unsigned upload presets, and when each is appropriate",
        "Keeping API secrets on the server while the browser only receives what it needs",
        "Delivery URLs with transformations for size, format and quality"
      ],
      fixes: [
        "Invalid signature and upload preset not found errors",
        "Uploads blocked by cross-origin or file size limits",
        "Large videos that load slowly because they were not optimised"
      ]
    },
    {
      id: "cloudflare",
      title: "Cloudflare deployment and database setup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnrbB5hghBs_U5b8oHbTiwmreLRw4hhJa9Zxf4wdRNRg&s=10",
      short: "Publishing sites, wiring secrets and connecting a database.",
      setup: [
        "Deploying static sites and connecting them to a GitHub repository for automatic updates",
        "Build settings, output folders and project configuration files",
        "Environment variables and secrets kept out of the repository",
        "Creating a Cloudflare database and binding it to the application"
      ],
      fixes: [
        "A deploy that succeeds but shows a blank page or a 404 because of a wrong output folder",
        "Missing bindings or variables that only fail after publishing",
        "Stale pages caused by caching after an update"
      ]
    },
    {
      id: "github",
      title: "Git and GitHub configuration",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FXqA54Sam8uClQez-xBKiK2xe4Nyce4y6e3aCKziQU1igRICEJ3el_gR&s=10",
      short: "Repositories, authentication and clean version history.",
      setup: [
        "Identity, remotes, branches and a sensible ignore file for every repository",
        "Authentication with access tokens or SSH keys",
        "Linking a repository to a hosting platform for automatic deployment",
        "Rotating any secret that was committed by mistake"
      ],
      fixes: [
        "Permission denied and authentication failed on push",
        "Rejected pushes from diverged history, and merge conflicts",
        "Files that should be ignored but are still tracked"
      ]
    },
    {
      id: "bugs",
      title: "Configuration errors and bug fixing",
      image: "",
      short: "A repeatable method for finding the real cause of a failure.",
      setup: [
        "Reproduce the problem, then shrink it to the smallest case",
        "Read the full error and trace it to the first line that is actually wrong",
        "Compare local and production settings, since most deploy bugs live there",
        "Fix the cause, confirm the fix, and check nothing nearby broke"
      ],
      fixes: [
        "Wrong file paths and case-sensitive names that work locally but fail online",
        "Mixed secure and insecure content, and cross-origin blocks",
        "Version mismatches between installed packages and the code"
      ]
    },
    {
      id: "payments",
      title: "Payment integration",
      image: "",
      short: "Checkout flows where the server, not the browser, decides the amount.",
      setup: [
        "Creating orders on the server so the amount cannot be changed by the visitor",
        "Hosted checkout and returning visitors to a clear success or failure page",
        "Verifying payment confirmations and signatures before marking an order paid",
        "Separate test and live keys, with secrets stored as environment variables"
      ],
      fixes: [
        "Orders stuck as pending because a confirmation was never verified",
        "Duplicate confirmations that would otherwise record the same payment twice",
        "Test keys left in production, or live keys exposed in front-end code"
      ]
    },
    {
      id: "oauth",
      title: "Google OAuth authentication",
      image: "",
      short: "Sign in with Google, configured correctly in the console and the app.",
      setup: [
        "A Google Cloud project, consent screen and OAuth client",
        "Authorised redirect addresses for both local testing and the live site",
        "Requesting only the scopes the app needs, and verifying the returned token",
        "Turning a verified Google account into a secure application session"
      ],
      fixes: [
        "redirect_uri_mismatch, caused by an address that differs by a single character",
        "Access blocked because the app is in testing mode and the user is not listed",
        "Invalid client errors from a mismatched ID or secret"
      ]
    }
  ],

  /* 4) KNOWLEDGE MAP (About page). Edit freely. */
  knowledge: [
    {
      area: "Interface and interaction",
      points: [
        "Typography, spacing and colour systems that stay readable on small screens",
        "Motion used to explain what happened, such as the Expressive Send flight path",
        "Design-to-code in plain HTML, CSS and JavaScript, without framework weight"
      ]
    },
    {
      area: "Backend and data",
      points: [
        "Python and Flask applications with separate public and admin portals",
        "MongoDB for application data",
        "Google OAuth sign-in flows"
      ]
    },
    {
      area: "Media and delivery",
      points: [
        "Cloudinary for hosting images and video",
        "Cloudflare for deploying and serving static sites",
        "Render for hosting Python services"
      ]
    },
    {
      area: "Workflow",
      points: [
        "Git and GitHub for version control",
        "Reading logs and stack traces to find the real cause of a failure, then fixing it at the source",
        "Writing legal, support and SEO pages as part of the product, not as an afterthought"
      ]
    }
  ]
};

# Colton Almaraz — CV (canonical content source)

> **This file is the single source of truth for all bio/résumé content on coltonalmaraz.com.**
> If a fact is not in this file, it does not go on the site. Transcribed from
> `public/docs/AlmarazColton_Resume.pdf` plus details Colton provided directly.
> Keep this file in sync with the résumé PDF when it changes.

## Basics

- **Name:** Colton Almaraz
- **Location:** Vancouver, WA (Pacific Time)
- **Headline:** Senior Full-Stack Software Engineer — 6 years of experience
- **Status:** Open to senior full-stack roles
- **Email:** almarazcolton333@gmail.com
- **LinkedIn:** https://linkedin.com/in/coltonalmaraz
- **GitHub:** https://github.com/almaraz333
- **Website:** https://coltonalmaraz.com
- **Résumé PDF:** /docs/AlmarazColton_Resume.pdf

## Experience

### EY — Senior Full Stack Software Engineer (01/2022 – Present · Portland, OR)

- Led technical design and architecture of mission-critical applications, coordinating cross-functional teams to deliver scalable solutions for clients
- Debug and build scalable Go and Python backend systems to support custom React TypeScript user-first front-ends
- Performed code reviews and mentored team members to uphold code quality standards and promote professional development
- Maintained a high level of code quality and operational rigor by optimizing Docker and Azure DevOps pipelines to enhance engineer efficiency and product quality
- Developed software and automations to support refined business processes, working closely with stakeholders across departments

### RangerCode (Founder) — Lead Full Stack Software Engineer (06/2022 – Present · Portland, OR)

- Develop custom solutions for clients using Svelte, React, Redux, TypeScript, TailwindCSS, GraphQL, and AWS
- Oversee CI/CD processes, design teams, and vital business operations to guarantee optimal customer experience
- Design and develop robust backend systems in Python and Go to efficiently handle data and create a smooth user experience
- Create documentation and tutorials for clients to facilitate smooth transition and easy scalability

### BIGGBY Coffee — Full Stack Software Engineer (06/2020 – 12/2021 · East Lansing, MI)

- Built a scalable online ordering platform using React, Redux, TypeScript, GraphQL, and AWS, generating $12.0M in revenue
- Managed the full development lifecycle of building, deploying, and maintaining web applications
- Maintained codebase with GitHub actions and husky hooks to ensure high quality code standards
- Assisted in integrating new front end features into a Python/Django backend
- Led a team of 3 junior engineers and mentored them in best practices and professional development

## Skills

- **Languages & Frameworks:** Go, Python, Node, JavaScript, TypeScript, React, Svelte, Angular, Redux, Recoil, Tailwind, Sass
- **Backend Technologies:** gRPC, REST, GraphQL, Apollo, Node, Express, SQL, AWS, Azure, Docker, MongoDB, PostgreSQL
- **Development & Testing:** Git, CI/CD, Jest, Cypress, Unit Testing, OOP, Functional Programming, Agile
- **Design & UX:** Figma, Information Architecture, Usability Testing, Wireframing, Digital Prototyping, Iterative Design
- **Soft Skills:** Leadership, Mentorship, Communication, Curiosity, Problem Solving, Project Management, Time Management

## AI Tooling

> Tools Colton **uses** in his daily workflow — he did not build these. Never word site copy
> to imply authorship of these tools.

- Cursor — agent & sub-agent workflows
- Claude Code
- Self-hosted local LLM via llama.cpp

## Education

### Michigan State University — Bachelor of Science (08/2015 – 05/2020 · East Lansing, MI)

- Major in Experience Architecture (Computer Science with UX Design)

## Projects

### Spotlight (verified from Colton's GitHub, August 2026 — highlight these first)

- **Quantum Vault** (2026) — _Featured project (Disc Channel)._ Branded "Quantum Vault — a post-quantum cryptographic file system." In-browser file encryption built on the NIST post-quantum standard **ML-KEM (Kyber)** for key encapsulation, paired with AES-256-GCM and ChaCha20-Poly1305 authenticated encryption (both selectable in the UI, as is the ML-KEM variant — ML-KEM-768 is the default/"Standard"). The crypto core is written in **Go and compiled to WebAssembly**, exposing `EncryptFile`/`DecryptFile` directly to the browser (files never leave the machine unencrypted); encrypting produces an `.encrypted` file plus a private key the user stores themselves (no key escrow, no accounts). A Go HTTP backend serves the app, with a React Router + TypeScript frontend (Dockerized). **Live: https://post-quantum-encryption-frontend.vercel.app/** · Repos: https://github.com/almaraz333/post-quantum-encryption-backend · https://github.com/almaraz333/post-quantum-encryption-frontend · Stack: Go, WebAssembly, ML-KEM (Kyber), AES-256-GCM, ChaCha20-Poly1305, React Router, TypeScript, Docker
- **Goal Tracker** (2025–2026, active) — Cross-platform goal-tracking app built with **Expo React Native + TypeScript** (migrated from a Vite + Capacitor implementation, kept as legacy reference), with a month/day calendar flow, Zustand state management, AsyncStorage persistence, and an **EAS Build/Submit pipeline targeting iOS and Android** (TestFlight / Play Internal Testing checklists in repo). Live web demo: https://goal-tracker-ten-alpha.vercel.app · Repo: https://github.com/almaraz333/goal-tracker · Stack: Expo, React Native, TypeScript, Zustand, AsyncStorage, EAS
- **Drive Sync** (2024) — Google Drive sync tool written in **Go**, using the Google Drive API with **goroutines for concurrent downloads**; recursively traverses the Drive file tree and replicates the directory structure on local disk. Repo: https://github.com/almaraz333/driveSync · Stack: Go, Google Drive API

### From the résumé PDF

- **Drive Sync** — Developed a Google Drive sync tool written in Go, automating the recursive search and download of Google Drive file trees to local disk, improving data accessibility and workflow efficiency
- **Finance Tracking Microservices** — Led the design and development of a collection of microservices using Go, gRPC, and SQLite to create and manage financial records, enhancing automation and efficiency in financial processes
- **Krypt** — A cryptocurrency app using React, TypeScript, and Tailwind, allowing users to manage real crypto transfers
- **EY Blog** — A contemporary, responsive blog platform for EY studios worldwide, catering to a diverse audience of tens of thousands of readers across various devices
- **Carter Treehouse** — An Airbnb site made with a fully custom, from-scratch CMS system utilizing Google APIs
- **Biggby Online Ordering** — An intuitive online ordering app for a modern experience, enhancing user satisfaction

---

## Addendum — content from the previous coltonalmaraz.com (authored by Colton)

> Everything below was written and published by Colton on the prior version of this site
> (preserved in git history). Facts here may be used on the new site. Where the résumé PDF
> and this addendum disagree on dates/titles, the résumé PDF governs.

### Early experience

- **Professional Athletes Healthcare Advocates — Software Developer and UX Designer (2019)** — HTML, CSS, JavaScript

### Project details & links

- **Biggby Online Ordering (2020)** — Seamless app + web ordering experience for BIGGBY Coffee: customers place an order and send it to a store of their choosing, with a strong focus on UX across devices. Live: https://app.biggby.com · Stack: NodeJS, React, TypeScript, Apollo, GraphQL · Image: /images/projects/biggby.png, /images/projects/biggbyCheckout.png
- **EY Blog (2022)** — Revitalized the EY Studios blog for tens of thousands of readers across devices; modern responsive UX. Live: https://studio.ey.com/blog/study-halls/ · Stack: HTML, JS, Greensock, 11ty · Image: /images/projects/eyBlog.png, /images/projects/eyBlogHomepage.png
- **Krypt / Ethereum Trading App (2022)** — Online Ethereum platform to send and receive crypto by integrating with users' ETH wallets for real-time transactions. Live: https://blockchain-app-olive.vercel.app/ · Stack: NodeJS, React, Ethers, Recoil, TypeScript, Tailwind, Hardhat · Image: /images/projects/cyrptoapp.png, /images/projects/cryptoapp2.png
- **Symplee (2020)** — Fast, intuitive text + video chat app focused on good UX and security. Live: https://symplee.app/ · Stack: NodeJS, React, TypeScript, Apollo, GraphQL · Image: /images/projects/symplee.png
- **Sports Web Scraper (2019)** — For a small sports-related insurance company: scraped, formatted, and presented player data across major national sports. Repo: https://github.com/almaraz333/Sports-Web-Scraper · Stack: Python, BeautifulSoup, Pandas · Image: /images/projects/webScraper.png, /images/projects/proFootballRef.png
- **Conway's Game of Life (2021)** — Cellular automaton implementation. Repo: https://github.com/almaraz333/conways-game-of-life · Stack: Python, pyGame, NumPy · Image: /images/projects/gameOfLife.png
- **Pi Dog Surveillance Camera (2021)** — Raspberry Pi cam streaming to a second Pi set up as a server, to check on his dog Ranger from his phone while away. Stack: Raspberry Pi, Pi Cam, Python · Image: /images/projects/piCamera.jpg, /images/projects/Ranger.jpg

### Old "About Me" (Colton's own words, for tone reference)

"As a senior full stack software engineer, I specialize in creating minimal, effective products with a focus on ethical and profitable outcomes. … With a background in Experience Architecture and UX design, I prioritize user-centric design and accessibility. In my current and past roles, I have designed and developed AI-integrated data visualization tools, collaborated remotely with global clients, overseen CI/CD processes, and developed e-commerce storefronts that boosted sales by 20–30%."

### Assets available in /public/images

- headShot.jpg (profile photo) · logo.png, logoLightMode.png (old logos) · projects/* (screenshots listed above)

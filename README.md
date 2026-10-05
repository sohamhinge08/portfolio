# ⚓ Soham Hinge — Developer Portfolio
> **Theme:** Developer Portfolio × Grand Line Adventure  
> **Core Concept:** A dark cinematic, One Piece-inspired portfolio crafted for the **GDG on Campus** recruitment application. Features an original Grand Line voyage aesthetic without copyrighted assets, emphasizing clean engineering, responsive layouts, and honest project disclosures.

---

## 🧭 Live Demo & Preview

This is a **pure static website** built with Vanilla HTML5, CSS3, JavaScript, Bootstrap 5, and GSAP. It requires zero compilation or build steps and can be opened directly or hosted on any static hosting provider.

---

## 🌟 Key Features

1. **Cinematic Hero Section**:
   - Procedural HTML5 Canvas rendering multi-layered sine-wave ocean physics, bioluminescent crests, a sailing explorer ship silhouette, and starry night skies.
   - Smooth entrance animations powered by GSAP.
   - Responsive CTA buttons (`[ EXPLORE MY JOURNEY ]`, `[ VIEW PROJECTS ]`) with seamless scroll targets.

2. **Captain's Logbook (About Section)**:
   - Structured developer dossier with coordinates, status indicator, and authentic narrative describing passion for problem solving, Python, full-stack development, and continuous learning.

3. **My Crew (Skills Arsenal)**:
   - Interactive category filter tabs (*All Technologies, Core Languages, Frontend, Backend & Database, Tools*).
   - Showcases only verified skills: **Python, C++, JavaScript, HTML5, CSS3, Bootstrap, Node.js, Express.js, MySQL, Git, GitHub**.

4. **The Voyage (Interactive Island Route Timeline)**:
   - Dynamic timeline tracing the engineering progression:
     `HTML & CSS ➔ JavaScript ➔ Python ➔ Object-Oriented Programming ➔ APIs & Automation ➔ Node.js / Express ➔ MySQL / Databases ➔ Full-Stack Projects`.
   - ScrollTrigger-driven progress line that dynamically charts the voyage as you scroll.

5. **My Treasure (Featured Projects)**:
   - Subtle bounty/treasure card aesthetics with honest team contribution disclosures:
     - **Hospital Management System** (*Team project with Jayesh: Clear attribution for frontend UI, database queries, and backend integration*).
     - **ISS Overhead Notifier** (*Python, REST APIs, Datetime logic, SMTPLib*).
     - **Snake Game** (*Python, OOP architecture, collision detection, high score persistence*).
     - **Password Manager** (*Python, Tkinter GUI, JSON data persistence, password generator*).
     - **Amazon Clone** (*HTML5/CSS3 frontend recreation practice project*).

6. **Python Project Archive**:
   - Instant search and filter bar for 8 Python utilities & games (*Snake, Pong, Turtle Crossing, Flash Card App, Password Manager, ISS Overhead Notifier, Blackjack, Quiz Game*).

7. **Repository Intel (Qualitative Achievements)**:
   - Qualitative highlights and live simulated terminal logbook showcasing builder mindset and GDG candidacy.

8. **Start a New Voyage (Contact & Dispatcher)**:
   - Quick one-click clipboard copying for email, LinkedIn, and GitHub.
   - Interactive message dispatch form with simulated transmission and automatic mailto client fallback.

9. **Interactive Polish & Accessibility**:
   - Built-in generative Web Audio API ambient ocean synthesizer (zero external sound files needed, toggled via nav button).
   - Dynamic modal viewer for comprehensive project breakdowns.
   - Toast notification feedback system.
   - Semantic HTML5, visible `:focus-visible` rings, ARIA labels, and `@media (prefers-reduced-motion)` support.

---

## 📁 Project Structure

```
/
├── index.html          # Semantic HTML5 markup, sections, and modals
├── css/
│   └── style.css       # Custom design tokens, glassmorphism, responsive grid, animations
├── js/
│   ├── ocean.js        # Canvas wave physics, ship navigation, and starfield
│   └── script.js       # Navigation, GSAP animations, audio synthesizer, modal & toast logic
├── assets/             # Icons and media folders
│   ├── icons/
│   └── images/
└── README.md           # Documentation & customization guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Open
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Live Server (VS Code / Python)
For local HTTP serving:
```bash
# Using Python 3 built-in server:
python -m http.server 8080

# Using npx serve:
npx serve .
```
Then visit `http://localhost:8080` in your browser.

---

## 🛠️ Where to Replace Placeholders

Search and replace the following placeholder tokens across `index.html` and `js/script.js` with your personal information:

| Placeholder | Where to Replace | Description |
| :--- | :--- | :--- |
| `YOUR_GITHUB_URL` | `index.html`, `js/script.js` | Your full GitHub profile URL (e.g. `https://github.com/sohamhinge`) |
| `YOUR_GITHUB_USERNAME` | `index.html`, `js/script.js` | Your GitHub handle for project repositories |
| `YOUR_LINKEDIN_URL` | `index.html`, `js/script.js` | Your LinkedIn username or vanity URL |
| `YOUR_EMAIL` | `index.html`, `js/script.js` | Your personal / professional email address |
| `YOUR_DEMO_URL` | `index.html`, `js/script.js` | Live hosting URLs for web projects if deployed |

---

## 🌐 How to Deploy Static Website

### 1. GitHub Pages (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial Grand Line developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. Go to **Repository Settings** ➔ **Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, select branch `main`, folder `/ (root)`, and click **Save**.
4. Your website will be live at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

### 2. Vercel
1. Run `npx vercel` or connect your GitHub repository at [vercel.com](https://vercel.com).
2. Framework Preset: **Other / Static**.
3. Deploy in 1 click.

### 3. Netlify
1. Drag and drop the `gdg_project` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Your portfolio is live with instant SSL.

---

## 📜 License & Attribution

Designed and engineered for **Soham Hinge**'s GDG on Campus developer portfolio. Free to customize, expand, and deploy!

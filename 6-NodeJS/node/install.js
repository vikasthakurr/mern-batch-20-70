// --- INSTALLING NODE.JS & NPM ---

// --- WHAT IS NPM? ---

// NPM = Node Package Manager
// It comes automatically when you install Node.js
// NPM is used to install, manage, and share JavaScript packages/libraries
// Think of NPM as an "App Store" for JavaScript libraries.

// --- HOW TO INSTALL NODE.JS ---

// Step 1: Go to https://nodejs.org
// Step 2: Download the LTS (Long Term Support) version
//         - LTS = Stable, recommended for most users
//         - Current = Latest features but may have bugs
// Step 3: Run the installer (.msi for Windows, .pkg for Mac)
// Step 4: Follow the installation wizard (Next → Next → Install)
// Step 5: Restart your terminal/VS Code

// --- VERIFY INSTALLATION ---

// Open terminal and run:
// node --version   OR   node -v    → Output: v20.x.x
// npm --version    OR   npm -v     → Output: 10.x.x
// If both show versions → Installation successful!

// --- IMPORTANT NPM COMMANDS ---

// npm init           → Creates package.json (asks questions)
// npm init -y        → Creates package.json with defaults (skip questions)
// npm install express        → Installs express (adds to dependencies)
// npm install nodemon -D     → Installs as devDependency
// npm i express              → Short form of npm install
// npm install   OR   npm i   → Installs all packages from package.json
// npm uninstall express      → Removes the package
// npm install -g nodemon     → Installs globally (available everywhere)
// npm start                  → Runs "start" script from package.json
// npm run dev                → Runs "dev" script from package.json

// --- WHAT IS package.json? ---

// package.json is the configuration file for your Node.js project.
// It stores: Project name, version, dependencies, scripts

// Example:
// {
//   "name": "my-project",
//   "version": "1.0.0",
//   "type": "module",
//   "scripts": {
//     "start": "node index.js",
//     "dev": "nodemon index.js"
//   },
//   "dependencies": {
//     "express": "^4.18.2"
//   },
//   "devDependencies": {
//     "nodemon": "^3.0.0"
//   }
// }

// --- WHAT IS node_modules? ---

// When you run npm install, packages are downloaded into node_modules folder.
// This folder can be VERY large (100s of MBs).
// NEVER push node_modules to GitHub → add it to .gitignore

// --- WHAT IS package-lock.json? ---

// Locks the exact versions of all installed packages.
// Ensures everyone on the team gets the same package versions.
// DO push this to GitHub. DON'T edit it manually.

// --- USEFUL TOOLS ---

// Nodemon - Automatically restarts your server when you save changes.
// Install: npm install -g nodemon
// Use: nodemon index.js (instead of node index.js)

// NVM (Node Version Manager) - Switch between multiple Node.js versions.
// nvm install 18
// nvm use 18
// nvm list

// --- VERIFICATION CODE ---

console.log("Node.js Version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);

// Run: node installing-nodejs-npm.js

// --- KEY POINTS ---

// 1. Always download LTS version of Node.js
// 2. NPM comes bundled with Node.js (no separate install needed)
// 3. npm init -y → quick project setup
// 4. npm install <pkg> → adds to dependencies
// 5. npm install <pkg> -D → adds to devDependencies
// 6. node_modules should NEVER be pushed to GitHub
// 7. package-lock.json should ALWAYS be pushed to GitHub
// 8. Use nodemon for auto-restart during development
// 9. Use nvm to manage multiple Node.js versions

# Earth Simulation (Three.js)

> “It’s not just rotation. It’s the rhythm of gravity, light, and silence.”  
> — Daniel Fitz, 2025

---

## Overview

This project renders a **rotating Earth with dynamic cloud layers, city lights, and a starfield** using [Three.js](https://threejs.org/).  
It’s built as a modular and documented setup following the _DronePilot_ project’s clean comment and architecture style.

---

## Features

- Realistic **Earth textures** (surface, bump, specular, and emissive maps)
- Layered **cloud atmosphere** with additive blending
- Responsive **window resizing**
- **OrbitControls** for interactive navigation
- Dynamic **starfield generator** using spherical distribution
- Simple, dependency-free structure (Three.js via ES modules)

---

## Project Structure

```
.
├── index.html              # Entry point with minimal HTML and style setup
├── main.js                 # Scene setup, animation loop, and resize handling
├── stars/
│   └── getStarfield.js     # Modular starfield generator
├── maps/                   # Earth texture maps (surface, bump, clouds, etc.)
├── package.json
└── package-lock.json
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/earth-simulation.git
cd earth-simulation
```

### Install dependencies

```bash
npm install
```

### Run locally

Use any local web server (for example, using VS Code Live Server or http-server):

```bash
npx http-server .
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Technical Notes

- Built with **Three.js r152**
- Texture loader paths are relative — ensure the `/maps` folder structure remains unchanged
- Stars are procedurally generated each load for natural distribution
- Resize handling maintains correct camera aspect and renderer scaling

---

## Credits

**Author:** Daniel Fitz  
**Year:** 2025  
**Inspiration:** DronePilot project architecture and documentation style.

---

## License

MIT License — free to use, modify, and distribute with attribution.

---

> “Every orbit is a question of balance — between motion and stillness.”  
> — Daniel Fitz, 2024

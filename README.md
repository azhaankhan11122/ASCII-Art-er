<div align="center">

```
     █████╗ ███████╗ ██████╗██╗██╗      ███████╗██╗   ██╗
    ██╔══██╗██╔════╝██╔════╝██║██║      ██╔════╝╚██╗ ██╔╝
    ███████║███████╗██║     ██║██║█████╗█████╗   ╚████╔╝ 
    ██╔══██║╚════██║██║     ██║██║╚════╝██╔══╝    ╚██╔╝  
    ██║  ██║███████║╚██████╗██║██║      ██║        ██║   
    ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝      ╚═╝        ╚═╝   
```

### ⚡ Real-Time ASCII Art Engine

**Transform text, images, and live camera feeds into stunning ASCII art — rendered in real-time on HTML5 Canvas.**

<br>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

<br>

<img src="https://img.shields.io/badge/-%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88-00FF41?style=flat-square" alt="divider">

</div>

<br>

## 🖥️ What is ASCII-fy?

**ASCII-fy** is a browser-based real-time ASCII art engine that converts anything visual into beautiful character art. Type text and watch it transform into a living Matrix-style display. Upload any image and see it recreated with ASCII characters. Point your webcam and experience yourself rendered as ASCII — all at 60fps.

> *"Any sufficiently advanced technology is indistinguishable from magic."*
> — Arthur C. Clarke

<br>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Three Input Modes
| Mode | Description |
|------|-------------|
| `⌨️ Text` | Type anything → instant ASCII typography |
| `🖼️ Image` | Drag & drop or upload any image |
| `📷 Camera` | Live webcam feed → real-time ASCII |

</td>
<td width="50%">

### 🎨 Three Stunning Themes
| Theme | Vibe |
|-------|------|
| `🟢 Matrix` | Classic green-on-black hacker aesthetic |
| `🔴 Synthwave` | Neon pink & cyan retro-futurism |
| `🌈 True Color` | Full RGB color preservation |

</td>
</tr>
</table>

<br>

### 🛠️ Fine-Grained Controls

```
┌──────────────────────────────────────────┐
│  Resolution    ████████████░░░░  100 cols │
│  Brightness    ████████░░░░░░░░    +0     │
│  Contrast      ████████░░░░░░░░    +0     │
│  Invert        [ ] ASCII Gradient         │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │        📸  Take Snapshot            │  │
│  └─────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

- **Resolution** — Control ASCII column density (40–180 cols)
- **Brightness** — Adjust luminance offset (-100 to +100)
- **Contrast** — Fine-tune tonal range (-100 to +100)
- **Invert** — Flip the ASCII character gradient
- **Snapshot** — Export your creation as a PNG

<br>

<div align="center">
<img src="https://img.shields.io/badge/-%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88-ff007f?style=flat-square" alt="divider">
</div>

<br>

## 🚀 Quick Start

### Prerequisites

- **Node.js** `≥ 18`
- **npm** `≥ 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/azhaankhan/ASCII-Art-er.git

# Navigate into the project
cd ASCII-Art-er

# Install dependencies
npm install

# Launch the dev server
npm run dev
```

Open **http://localhost:5173** and start creating ✨

<br>

## 🏗️ Architecture

```
ASCII-Art-er/
│
├── src/
│   ├── components/
│   │   ├── AsciiCanvas.jsx     # Canvas renderer with camera/image/text modes
│   │   └── ControlPanel.jsx    # Sidebar UI with all controls
│   │
│   ├── hooks/
│   │   └── useAsciiEngine.js   # Core ASCII conversion engine
│   │
│   ├── App.jsx                 # Root layout & state management
│   ├── App.css                 # Theme-specific styles
│   ├── index.css               # Base styles & Tailwind imports
│   └── main.jsx                # Entry point
│
├── index.html                  # HTML shell
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies & scripts
```

<br>

## ⚙️ How It Works

<div align="center">

```
┌─────────────┐     ┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│   Input      │     │  Hidden      │     │  ASCII Engine  │     │  Display     │
│              │────▶│  Canvas      │────▶│                │────▶│  Canvas      │
│  Text /      │     │  (downscale) │     │  pixel → char  │     │  (render)    │
│  Image /     │     │              │     │  luminance map │     │              │
│  Camera      │     │  cols × rows │     │  theme colors  │     │  60fps output│
└─────────────┘     └──────────────┘     └────────────────┘     └──────────────┘
```

</div>

1. **Input Source** — Text is rendered to a bitmap, images are loaded, camera streams via `getUserMedia`
2. **Downscale** — A hidden canvas resizes the input to the target column/row resolution
3. **Pixel Analysis** — Each pixel's luminance is calculated using `0.2126R + 0.7152G + 0.0722B`
4. **Character Mapping** — Luminance maps to the ASCII gradient: ` .:-=+*#%@`
5. **Themed Rendering** — Characters are drawn to the display canvas with theme-specific colors
6. **Animation Loop** — `requestAnimationFrame` drives continuous 60fps rendering for text & camera

<br>

## 🧬 The ASCII Gradient

```
 .:-=+*#%@
│          │
▼          ▼
Dark     Bright
```

Each character represents a different visual density. Spaces for darkness, `@` for full brightness. The `invert` toggle reverses this mapping.

<br>

<div align="center">
<img src="https://img.shields.io/badge/-%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88%E2%96%88-00f0ff?style=flat-square" alt="divider">
</div>

<br>

## 📦 Tech Stack

<div align="center">

| Technology | Purpose |
|:----------:|:--------|
| <img src="https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black" /> | UI Components & State |
| <img src="https://img.shields.io/badge/-Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white" /> | Build Tool & Dev Server |
| <img src="https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" /> | Utility-First Styling |
| <img src="https://img.shields.io/badge/-Canvas%20API-E34F26?style=flat-square&logo=html5&logoColor=white" /> | Real-Time Pixel Rendering |
| <img src="https://img.shields.io/badge/-Lucide%20Icons-F56565?style=flat-square" /> | Beautiful UI Icons |
| <img src="https://img.shields.io/badge/-Fira%20Code-4A4A4A?style=flat-square" /> | Monospace Font Rendering |

</div>

<br>

## 🎮 Usage Tips

> 💡 **Pro Tip:** Lower resolution + high contrast produces the most dramatic ASCII art.

- For **portraits**, use the `Synthwave` theme for a cyberpunk look
- For **text**, try cranking up the resolution to `150+` for sharp lettering
- For **photos**, `True Color` mode preserves the original palette
- **Export** your favorite creations with the Snapshot button — perfect for wallpapers!

<br>

## 🛣️ Roadmap

- [ ] 🎬 GIF / video file support
- [ ] 🔤 Custom ASCII character sets
- [ ] 🌊 Animated text effects (wave, glitch, rain)
- [ ] 📋 Copy ASCII to clipboard as text
- [ ] 🖥️ Fullscreen mode
- [ ] 📱 Mobile-optimized layout
- [ ] 🎵 Audio-reactive ASCII visualizer

<br>

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a PR.

```bash
# Fork & clone the repo
git clone https://github.com/<your-username>/ASCII-Art-er.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "feat: add amazing feature"

# Push and open a PR
git push origin feature/amazing-feature
```

<br>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<br>

<div align="center">

```
    ██████████████████████████████████████
    █                                    █
    █        Made with ♥ by 4zhaan       █
    █                                    █
    ██████████████████████████████████████
```

**[⬆ Back to Top](#)**

</div>

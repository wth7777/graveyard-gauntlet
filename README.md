# Graveyard Gauntlet

A 2D top-down graveyard maze adventure game built with **Phaser 3** and **Vite**. Play as a stylized character, navigate a procedurally generated graveyard maze, fight ghosts and goblins, manage your power meter, visit tattoo shops to recharge, and survive pranks from a mischievous lady ghost.

## Play Online

https://wth7777.github.io/graveyard-gauntlet/

## Features

- **Procedurally generated graveyard maze** — different layout every run
- **Player character** — stylized cartoon design with idle, 4-direction walk, and attack animations
- **Health + Power system** — power drains over time and faster when attacking/taking hits; visit tattoo shops to recharge
- **Enemies** — ghosts (phase through walls) and goblins (ground-based melee)
- **Tattoo shops** — restore power and grant buffs (speed, strength, light) with a face-focused "getting inked" animation
- **Lady Ghost Prankster** — appears randomly with harmless pranks (reverse controls, spin, float, confetti)
- **Exit crypt** — reach it to win
- **UI** — health bar, power bar, player portrait, score, game over/win screens
- **Desktop + mobile** — keyboard/mouse on desktop, virtual joystick + on-screen buttons on mobile

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | WASD / Arrow keys | Virtual joystick (bottom left) |
| Attack | Space / Left click | Attack button (bottom right) |
| Interact | E / Right click | Interact button |
| Pause | ESC | Pause button |

## Tech Stack

- [Phaser 3](https://phaser.io/) — 2D game framework
- [Vite](https://vitejs.dev/) — build tool and dev server
- Plain JavaScript (no TypeScript build step)
- Web Audio API — procedural sound effects (no external audio files)

## Project Structure

```
graveyard-gauntlet/
├── index.html              # Entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .nojekyll               # GitHub Pages: disable Jekyll
├── public/                 # Static public assets
├── dist/                   # Built output (gitignored)
└── src/
    ├── main.js             # Game entry and Phaser config
    ├── scenes/
    │   ├── BootScene.js    # Asset loading (procedural placeholders)
    │   ├── MainScene.js    # Core gameplay: maze, player, enemies, shops
    │   └── UIScene.js      # HUD, portrait, game over/win screens
    ├── entities/           # (reserved for entity classes)
    ├── ui/                 # (reserved for UI components)
    └── utils/              # (reserved for utilities)
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deploy to GitHub Pages

This project is configured to deploy to GitHub Pages from the `main` branch root.

### One-command deploy

```bash
# Build and deploy
npm run build
npx gh-pages -d dist
```

Or manually:

```bash
npm run build
git add -f dist/
git commit -m "Deploy: production build"
git subtree split --prefix dist | xargs -I {} git push origin {}:gh-pages --force
```

Then configure GitHub Pages in the repository settings:
- Source: `main` branch, `/` (root) folder
- Or use the `gh-pages` branch if you prefer that workflow

The live site will be at: `https://wth7777.github.io/graveyard-gauntlet/`

## Adding Real Art

Placeholder procedural graphics are used throughout. To add real sprites:

1. Place image files in `assets/images/`
2. Update `src/scenes/BootScene.js` to load them with `this.load.image()`
3. Replace the procedural texture generation with the loaded assets
4. For the player character portrait, use `player-portrait` texture keys

The code is structured so sprite textures can be swapped in without changing gameplay logic.

## License

MIT
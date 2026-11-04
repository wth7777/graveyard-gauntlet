/**
 * BootScene — Loads all assets and shows loading progress.
 * Uses procedural placeholder graphics so the game works without external art files.
 * Real sprites (including the cousin's photo-based character) can be dropped into
 * assets/images/ and referenced here.
 */

import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Loading UI
    this.add.text(width / 2, height / 2 - 50, 'GRAVEYARD GAUNTLET', {
      fontSize: '32px',
      fontFamily: 'Courier New, monospace',
      color: '#4ade80'
    }).setOrigin(0.5)

    const progressBar = this.add.graphics()
    this.add.text(width / 2, height / 2 + 20, 'Loading assets...', {
      fontSize: '16px',
      fontFamily: 'Courier New, monospace',
      color: '#e0e0e0'
    }).setOrigin(0.5)

    this.load.on('progress', (value) => {
      progressBar.clear()
      progressBar.fillStyle(0x4ade80, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 20)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
    })

    // ---------- PROCEDURAL PLACEHOLDER GRAPHICS ----------
    // These generate canvas-based textures so the game runs immediately.
    // Replace with real sprite sheets (including the cousin's character) in assets/images/.

    // Player character (top-down, stylized — will be replaced with photo-based art)
    this.createPlayerSprite()

    // Player face portrait (larger, for UI and prank moments)
    this.createPlayerPortrait()

    // Ghost enemy
    this.createGhostSprite()

    // Goblin enemy
    this.createGoblinSprite()

    // Lady ghost (prankster)
    this.createLadyGhostSprite()

    // Tattoo shop building
    this.createTattooShopSprite()

    // Exit crypt
    this.createCryptSprite()

    // Tiles / environment
    this.createTileTextures()

    // Particles
    this.createParticleTextures()

    // UI elements
    this.createUITextures()

    // ---------- AUDIO (placeholder tones generated at runtime) ----------
    // Audio is created procedurally in MainScene using the Web Audio API
    // so there are no external audio file dependencies.
  }

  create() {
    this.scene.start('MainScene')
  }

  // ---------- PROCEDURAL GRAPHICS GENERATORS ----------

  createPlayerSprite() {
    const size = 48
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xe0e0e0, 1) // skin tone
    canvas.fillCircle(size / 2, size / 2, size / 2.2) // head
    canvas.fillStyle(0x8b4513, 1) // hair
    canvas.fillCircle(size / 2, size * 0.3, size / 2)
    canvas.fillStyle(0x4a7c59, 1) // green tunic
    canvas.fillRect(size * 0.25, size * 0.55, size * 0.5, size * 0.4) // body
    canvas.fillStyle(0xffd700, 1) // belt
    canvas.fillRect(size * 0.35, size * 0.85, size * 0.3, size * 0.1)
    canvas.generateTexture('player-idle', size, size)

    // Walk frames (simple leg offset)
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0xe0e0e0, 1)
    canvas2.fillCircle(size / 2, size / 2, size / 2.2)
    canvas2.fillStyle(0x8b4513, 1)
    canvas2.fillCircle(size / 2, size * 0.3, size / 2)
    canvas2.fillStyle(0x4a7c59, 1)
    canvas2.fillRect(size * 0.25, size * 0.55, size * 0.5, size * 0.4)
    canvas2.fillStyle(0xffd700, 1)
    canvas2.fillRect(size * 0.35, size * 0.85, size * 0.3, size * 0.1)
    canvas2.fillStyle(0x2d5a27, 1) // leg forward
    canvas2.fillRect(size * 0.3, size * 0.9, size * 0.15, size * 0.1)
    canvas2.generateTexture('player-walk-1', size, size)

    const canvas3 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas3.fillStyle(0xe0e0e0, 1)
    canvas3.fillCircle(size / 2, size / 2, size / 2.2)
    canvas3.fillStyle(0x8b4513, 1)
    canvas3.fillCircle(size / 2, size * 0.3, size / 2)
    canvas3.fillStyle(0x4a7c59, 1)
    canvas3.fillRect(size * 0.25, size * 0.55, size * 0.5, size * 0.4)
    canvas3.fillStyle(0xffd700, 1)
    canvas3.fillRect(size * 0.35, size * 0.85, size * 0.3, size * 0.1)
    canvas3.fillStyle(0x2d5a27, 1) // other leg forward
    canvas3.fillRect(size * 0.55, size * 0.9, size * 0.15, size * 0.1)
    canvas3.generateTexture('player-walk-2', size, size)

    // Attack frame (arm forward)
    const canvas4 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas4.fillStyle(0xe0e0e0, 1)
    canvas4.fillCircle(size / 2, size / 2, size / 2.2)
    canvas4.fillStyle(0x8b4513, 1)
    canvas4.fillCircle(size / 2, size * 0.3, size / 2)
    canvas4.fillStyle(0x4a7c59, 1)
    canvas4.fillRect(size * 0.25, size * 0.55, size * 0.5, size * 0.4)
    canvas4.fillStyle(0xffd700, 1)
    canvas4.fillRect(size * 0.35, size * 0.85, size * 0.3, size * 0.1)
    canvas4.fillStyle(0xe0e0e0, 1) // attack arm
    canvas4.fillRect(size * 0.7, size * 0.5, size * 0.25, size * 0.15)
    canvas4.generateTexture('player-attack', size, size)

    this.anims.create({
      key: 'player-walk',
      frames: this.anims.generateFrameNames('player-idle', { start: 0, end: 0 }).concat(
        this.anims.generateFrameNames('player-walk-1', { start: 0, end: 0 }),
        this.anims.generateFrameNames('player-idle', { start: 0, end: 0 }),
        this.anims.generateFrameNames('player-walk-2', { start: 0, end: 0 })
      ),
      frameRate: 10,
      repeat: -1
    })
  }

  createPlayerPortrait() {
    const size = 96
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    // Face shape
    canvas.fillStyle(0xe0e0e0, 1)
    canvas.fillCircle(size / 2, size / 2, size / 2.4)
    // Hair
    canvas.fillStyle(0x5d4037, 1)
    canvas.fillCircle(size / 2, size * 0.35, size / 2.2)
    // Eyes
    canvas.fillStyle(0x000000, 1)
    canvas.fillCircle(size * 0.35, size * 0.4, size * 0.06)
    canvas.fillCircle(size * 0.65, size * 0.4, size * 0.06)
    // Nose
    canvas.fillStyle(0xccaa99, 1)
    canvas.fillCircle(size / 2, size * 0.5, size * 0.05)
    // Mouth
    canvas.fillStyle(0x8b4513, 1)
    canvas.fillRect(size * 0.45, size * 0.58, size * 0.1, size * 0.05)
    // Expression lines
    canvas.lineStyle(2, 0x5d4037, 1)
    canvas.lineBetween(size * 0.3, size * 0.32, size * 0.2, size * 0.4)
    canvas.lineBetween(size * 0.7, size * 0.32, size * 0.8, size * 0.4)
    canvas.generateTexture('player-portrait', size, size)

    // Hurt portrait (different expression)
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0xe0e0e0, 1)
    canvas2.fillCircle(size / 2, size / 2, size / 2.4)
    canvas2.fillStyle(0x5d4037, 1)
    canvas2.fillCircle(size / 2, size * 0.35, size / 2.2)
    canvas2.fillStyle(0xff0000, 1)
    canvas2.fillCircle(size * 0.35, size * 0.4, size * 0.06)
    canvas2.fillCircle(size * 0.65, size * 0.4, size * 0.06)
    canvas2.fillStyle(0xccaa99, 1)
    canvas2.fillCircle(size / 2, size * 0.5, size * 0.05)
    canvas2.fillStyle(0x4a4a4a, 1)
    canvas2.fillRect(size * 0.45, size * 0.6, size * 0.1, size * 0.04)
    canvas2.generateTexture('player-portrait-hurt', size, size)

    // Victory portrait
    const canvas3 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas3.fillStyle(0xe0e0e0, 1)
    canvas3.fillCircle(size / 2, size / 2, size / 2.4)
    canvas3.fillStyle(0x5d4037, 1)
    canvas3.fillCircle(size / 2, size * 0.35, size / 2.2)
    canvas3.fillStyle(0x00aa00, 1)
    canvas3.fillCircle(size * 0.35, size * 0.38, size * 0.06)
    canvas3.fillCircle(size * 0.65, size * 0.38, size * 0.06)
    canvas3.fillStyle(0xccaa99, 1)
    canvas3.fillCircle(size / 2, size * 0.48, size * 0.05)
    canvas3.fillStyle(0x4ade80, 1)
    canvas3.fillRect(size * 0.42, size * 0.55, size * 0.16, size * 0.06)
    canvas3.generateTexture('player-portrait-victory', size, size)

    // Tattoo/inked portrait (face being worked on)
    const canvas4 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas4.fillStyle(0xe0e0e0, 1)
    canvas4.fillCircle(size / 2, size / 2, size / 2.4)
    canvas4.fillStyle(0x5d4037, 1)
    canvas4.fillCircle(size / 2, size * 0.35, size / 2.2)
    canvas4.fillStyle(0x000000, 1)
    canvas4.fillCircle(size * 0.35, size * 0.4, size * 0.06)
    canvas4.fillCircle(size * 0.65, size * 0.4, size * 0.06)
    canvas4.fillStyle(0xccaa99, 1)
    canvas4.fillCircle(size / 2, size * 0.5, size * 0.05)
    canvas4.fillStyle(0x4a4a4a, 1)
    canvas4.fillRect(size * 0.45, size * 0.58, size * 0.1, size * 0.05)
    // Ink marks on face
    canvas4.fillStyle(0x000000, 0.3)
    canvas4.fillCircle(size * 0.3, size * 0.3, size * 0.03)
    canvas4.fillCircle(size * 0.7, size * 0.45, size * 0.03)
    canvas4.generateTexture('player-portrait-inked', size, size)
  }

  createGhostSprite() {
    const size = 40
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffffff, 0.6)
    canvas.fillCircle(size / 2, size / 2, size / 2)
    canvas.fillStyle(0x00ffff, 0.8)
    canvas.fillCircle(size / 2, size * 0.35, size * 0.15) // left eye
    canvas.fillCircle(size / 2 + size * 0.25, size * 0.35, size * 0.15) // right eye
    canvas.fillStyle(0xff6b6b, 1)
    canvas.fillCircle(size / 2, size * 0.6, size * 0.08) // mouth
    canvas.generateTexture('ghost', size, size)
  }

  createGoblinSprite() {
    const size = 40
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0x4a7c59, 1)
    canvas.fillCircle(size / 2, size / 2, size / 2.2) // head
    canvas.fillStyle(0x2d5a27, 1)
    canvas.fillCircle(size / 2, size * 0.3, size / 2) // hair/ears
    canvas.fillStyle(0x8b4513, 1) // body
    canvas.fillRect(size * 0.3, size * 0.6, size * 0.4, size * 0.35)
    canvas.fillStyle(0x000000, 1) // eyes
    canvas.fillCircle(size * 0.35, size * 0.35, size * 0.06)
    canvas.fillCircle(size * 0.65, size * 0.35, size * 0.06)
    canvas.generateTexture('goblin', size, size)
  }

  createLadyGhostSprite() {
    const size = 56
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffd700, 0.5)
    canvas.fillCircle(size / 2, size / 2, size / 2)
    canvas.fillStyle(0xff6b00, 0.8)
    canvas.fillCircle(size / 2, size * 0.3, size * 0.15) // left eye
    canvas.fillCircle(size / 2 + size * 0.3, size * 0.3, size * 0.15) // right eye
    canvas.fillStyle(0xff0000, 1)
    canvas.fillCircle(size / 2, size * 0.65, size * 0.1) // mischievous smile
    // Flowing bottom
    canvas.fillStyle(0xffd700, 0.4)
    canvas.fillEllipse(size / 2, size, size * 0.6, size * 0.4)
    canvas.generateTexture('lady-ghost', size, size)
  }

  createTattooShopSprite() {
    const size = 64
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    // Building
    canvas.fillStyle(0x2a2a2a, 1)
    canvas.fillRect(size * 0.2, size * 0.2, size * 0.6, size * 0.6)
    // Roof
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillRect(size * 0.15, size * 0.1, size * 0.7, size * 0.15)
    // Door
    canvas.fillStyle(0x4a4a4a, 1)
    canvas.fillRect(size * 0.45, size * 0.55, size * 0.1, size * 0.25)
    // Glowing neon sign
    canvas.fillStyle(0x4ade80, 1)
    canvas.fillCircle(size * 0.5, size * 0.15, size * 0.08)
    canvas.generateTexture('tattoo-shop', size, size)
  }

  createCryptSprite() {
    const size = 64
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    // Crypt structure
    canvas.fillStyle(0x3a3a3a, 1)
    canvas.fillRect(size * 0.25, size * 0.2, size * 0.5, size * 0.6)
    // Door
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillRect(size * 0.42, size * 0.45, size * 0.16, size * 0.35)
    // Glow
    canvas.fillStyle(0xffd700, 0.3)
    canvas.fillCircle(size * 0.5, size * 0.3, size * 0.15)
    canvas.generateTexture('exit-crypt', size, size)
  }

  createTileTextures() {
    // Floor tile
    const floorSize = 32
    const floorCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    floorCanvas.fillStyle(0x2d2d2d, 1)
    floorCanvas.fillRect(0, 0, floorSize, floorSize)
    floorCanvas.fillStyle(0x3a3a3a, 0.3)
    floorCanvas.fillRect(0, 0, floorSize, 2)
    floorCanvas.fillRect(0, floorSize - 2, floorSize, 2)
    floorCanvas.generateTexture('tile-floor', floorSize, floorSize)

    // Wall tile (fence)
    const wallSize = 32
    const wallCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    wallCanvas.fillStyle(0x4a4a4a, 1)
    wallCanvas.fillRect(0, 0, wallSize, wallSize)
    wallCanvas.fillStyle(0x2a2a2a, 1)
    for (let i = 0; i < wallSize; i += 6) {
      wallCanvas.fillRect(i, 0, 3, wallSize)
    }
    wallCanvas.generateTexture('tile-wall', wallSize, wallSize)

    // Hedge tile
    const hedgeSize = 32
    const hedgeCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    hedgeCanvas.fillStyle(0x2d5a27, 1)
    hedgeCanvas.fillRect(0, 0, hedgeSize, hedgeSize)
    hedgeCanvas.fillStyle(0x1e3a1a, 0.5)
    hedgeCanvas.fillCircle(8, 8, 8)
    hedgeCanvas.fillCircle(24, 8, 8)
    hedgeCanvas.fillCircle(16, 20, 8)
    hedgeCanvas.generateTexture('tile-hedge', hedgeSize, hedgeSize)

    // Tomb tile
    const tombSize = 32
    const tombCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    tombCanvas.fillStyle(0x4a4a4a, 1)
    tombCanvas.fillRect(0, 0, tombSize, tombSize)
    tombCanvas.fillStyle(0x2a2a2a, 1)
    tombCanvas.fillRect(6, 6, 20, 14)
    tombCanvas.fillStyle(0x4ade80, 0.5)
    tombCanvas.fillRect(14, 6, 2, 4)
    tombCanvas.generateTexture('tile-tomb', tombSize, tombSize)
  }

  createParticleTextures() {
    // Sparkle particle
    const size = 8
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffd700, 1)
    canvas.fillRect(size / 2 - 1, 0, 2, size)
    canvas.fillRect(0, size / 2 - 1, size, 2)
    canvas.generateTexture('sparkle', size, size)

    // Blood splat
    const size2 = 6
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0x8b0000, 1)
    canvas2.fillCircle(size2 / 2, size2 / 2, size2 / 2)
    canvas2.generateTexture('blood-splat', size2, size2)
  }

  createUITextures() {
    // Heart icon
    const size = 24
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xff0000, 1)
    canvas.fillCircle(size * 0.35, size * 0.35, size * 0.2)
    canvas.fillCircle(size * 0.65, size * 0.35, size * 0.2)
    canvas.fillRect(size * 0.2, size * 0.35, size * 0.6, size * 0.5)
    canvas.generateTexture('ui-heart', size, size)

    // Power bolt icon
    const size2 = 24
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0xffd700, 1)
    canvas2.fillRect(size2 * 0.45, 0, size2 * 0.1, size2 * 0.3)
    canvas2.fillRect(size2 * 0.3, size2 * 0.3, size2 * 0.4, size2 * 0.4)
    canvas2.fillRect(size2 * 0.45, size2 * 0.7, size2 * 0.1, size2 * 0.3)
    canvas2.generateTexture('ui-power', size2, size2)
  }
}

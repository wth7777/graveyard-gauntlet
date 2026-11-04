/**
 * BootScene — Loads all assets and shows loading progress.
 * 
 * Procedural character art is based on the cousin's photos:
 * - White/gray full beard and mustache
 * - Black-rimmed glasses
 * - Black baseball cap with yellow/gold logo
 * - Heavy arm tattoos ("MEMENTO MORI" on left arm, sleeve on both arms)
 * - Black sleeveless athletic shirt with white trim + Sullen Art Collective skull logo
 * - Silver chain with skull pendant, multiple rings
 * - Stocky build, blue jeans
 * - Image 3 shows him in a graveyard holding an axe
 * 
 * Real sprite images can be dropped into assets/images/ and loaded here
 * to replace the procedural graphics.
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

    // ---------- PROCEDURAL CHARACTER GRAPHICS ----------
    // Based on cousin's photos. Replace with real images in assets/images/.

    this.createPlayerSprite()
    this.createPlayerPortraits()
    this.createGhostSprite()
    this.createGoblinSprite()
    this.createLadyGhostSprite()
    this.createTattooShopSprite()
    this.createCryptSprite()
    this.createTileTextures()
    this.createParticleTextures()
    this.createUITextures()
  }

  create() {
    console.log('[BOOT] BootScene.create() - all textures generated, starting MainScene')
    this.add.text(10, 10, 'BOOT: Textures ready -> MainScene', {
      fontSize: '14px',
      fontFamily: 'Courier New, monospace',
      color: '#4ade80',
      backgroundColor: '#000000',
      padding: { x: 4, y: 4 }
    }).setDepth(1000)
    this.scene.start('MainScene')
  }

  // ============================================================
  // PLAYER CHARACTER — Based on cousin's photos
  // ============================================================

  createPlayerSprite() {
    const size = 48
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })

    // ---------- HEAD ----------
    // Skin tone
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillCircle(size / 2, size / 2, size / 2.3) // head

    // Black baseball cap
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillCircle(size / 2, size * 0.28, size / 2.1) // cap dome
    canvas.fillRect(size * 0.15, size * 0.28, size * 0.7, size * 0.12) // cap brim
    // Cap logo (yellow/gold)
    canvas.fillStyle(0xffd700, 1)
    canvas.fillCircle(size / 2, size * 0.22, size * 0.08)

    // Black glasses
    canvas.lineStyle(3, 0x1a1a1a, 1)
    canvas.lineBetween(size * 0.3, size * 0.32, size * 0.22, size * 0.34)
    canvas.lineBetween(size * 0.7, size * 0.32, size * 0.78, size * 0.34)
    canvas.fillRect(size * 0.2, size * 0.3, size * 0.6, size * 0.06)

    // White/gray full beard
    canvas.fillStyle(0xf0f0f0, 1)
    canvas.fillCircle(size / 2, size * 0.62, size / 2.6) // beard mass
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillRect(size * 0.25, size * 0.45, size * 0.5, size * 0.25) // chin/neck bridge

    // Mustache (white)
    canvas.fillStyle(0xf0f0f0, 1)
    canvas.fillEllipse(size / 2, size * 0.42, size * 0.18, size * 0.08)

    // ---------- BODY ----------
    // Black tank top with white trim
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillRect(size * 0.22, size * 0.52, size * 0.56, size * 0.42) // torso
    canvas.fillStyle(0xffffff, 1)
    canvas.fillRect(size * 0.18, size * 0.5, size * 0.08, size * 0.45) // left strap
    canvas.fillRect(size * 0.74, size * 0.5, size * 0.08, size * 0.45) // right strap
    canvas.fillRect(size * 0.18, size * 0.5, size * 0.64, size * 0.06) // neck trim

    // Sullen Art Collective logo (chest circle)
    canvas.lineStyle(2, 0xffffff, 1)
    canvas.strokeCircle(size / 2, size * 0.68, size * 0.12)
    canvas.fillStyle(0xffffff, 1)
    canvas.fillCircle(size / 2, size * 0.68, size * 0.05) // skull center
    canvas.fillRect(size * 0.45, size * 0.64, size * 0.1, size * 0.03) // crossbar

    // Silver chain necklace
    canvas.lineStyle(1, 0xc0c0c0, 1)
    canvas.lineBetween(size * 0.4, size * 0.45, size * 0.6, size * 0.45)
    // Skull pendant
    canvas.fillStyle(0xc0c0c0, 1)
    canvas.fillCircle(size / 2, size * 0.58, size * 0.04)

    // ---------- ARMS WITH TATTOOS ----------
    // Left arm (viewer's right) - heavy tattoos including MEMENTO MORI
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillRect(size * 0.05, size * 0.55, size * 0.18, size * 0.3) // arm
    canvas.fillStyle(0x2a2a2a, 0.6)
    canvas.fillRect(size * 0.08, size * 0.6, size * 0.12, size * 0.15) // tattoo block
    canvas.fillRect(size * 0.08, size * 0.75, size * 0.12, size * 0.1) // tattoo block

    // Right arm (viewer's left) - tattoos
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillRect(size * 0.77, size * 0.55, size * 0.18, size * 0.3) // arm
    canvas.fillStyle(0x2a2a2a, 0.6)
    canvas.fillRect(size * 0.8, size * 0.6, size * 0.12, size * 0.15) // tattoo block
    canvas.fillRect(size * 0.8, size * 0.75, size * 0.12, size * 0.1) // tattoo block

    // Hands with rings
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillCircle(size * 0.13, size * 0.88, size * 0.08) // left hand
    canvas.fillCircle(size * 0.87, size * 0.88, size * 0.08) // right hand
    canvas.fillStyle(0xc0c0c0, 1)
    canvas.fillRect(size * 0.1, size * 0.85, size * 0.05, size * 0.04) // ring left
    canvas.fillRect(size * 0.84, size * 0.85, size * 0.05, size * 0.04) // ring right

    canvas.generateTexture('player-idle', size, size)

    // ---------- WALK FRAME 1 (left leg forward) ----------
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    // Head & body (same as idle)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillCircle(size / 2, size / 2, size / 2.3)
    canvas2.fillStyle(0x1a1a1a, 1)
    canvas2.fillCircle(size / 2, size * 0.28, size / 2.1)
    canvas2.fillRect(size * 0.15, size * 0.28, size * 0.7, size * 0.12)
    canvas2.fillStyle(0xffd700, 1)
    canvas2.fillCircle(size / 2, size * 0.22, size * 0.08)
    canvas2.lineStyle(3, 0x1a1a1a, 1)
    canvas2.lineBetween(size * 0.3, size * 0.32, size * 0.22, size * 0.34)
    canvas2.lineBetween(size * 0.7, size * 0.32, size * 0.78, size * 0.34)
    canvas2.fillRect(size * 0.2, size * 0.3, size * 0.6, size * 0.06)
    canvas2.fillStyle(0xf0f0f0, 1)
    canvas2.fillCircle(size / 2, size * 0.62, size / 2.6)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillRect(size * 0.25, size * 0.45, size * 0.5, size * 0.25)
    canvas2.fillStyle(0xf0f0f0, 1)
    canvas2.fillEllipse(size / 2, size * 0.42, size * 0.18, size * 0.08)
    canvas2.fillStyle(0x1a1a1a, 1)
    canvas2.fillRect(size * 0.22, size * 0.52, size * 0.56, size * 0.42)
    canvas2.fillStyle(0xffffff, 1)
    canvas2.fillRect(size * 0.18, size * 0.5, size * 0.08, size * 0.45)
    canvas2.fillRect(size * 0.74, size * 0.5, size * 0.08, size * 0.45)
    canvas2.fillRect(size * 0.18, size * 0.5, size * 0.64, size * 0.06)
    canvas2.lineStyle(2, 0xffffff, 1)
    canvas2.strokeCircle(size / 2, size * 0.68, size * 0.12)
    canvas2.fillStyle(0xffffff, 1)
    canvas2.fillCircle(size / 2, size * 0.68, size * 0.05)
    canvas2.fillRect(size * 0.45, size * 0.64, size * 0.1, size * 0.03)
    canvas2.lineStyle(1, 0xc0c0c0, 1)
    canvas2.lineBetween(size * 0.4, size * 0.45, size * 0.6, size * 0.45)
    canvas2.fillStyle(0xc0c0c0, 1)
    canvas2.fillCircle(size / 2, size * 0.58, size * 0.04)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillRect(size * 0.05, size * 0.55, size * 0.18, size * 0.3)
    canvas2.fillStyle(0x2a2a2a, 0.6)
    canvas2.fillRect(size * 0.08, size * 0.6, size * 0.12, size * 0.15)
    canvas2.fillRect(size * 0.08, size * 0.75, size * 0.12, size * 0.1)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillRect(size * 0.77, size * 0.55, size * 0.18, size * 0.3)
    canvas2.fillStyle(0x2a2a2a, 0.6)
    canvas2.fillRect(size * 0.8, size * 0.6, size * 0.12, size * 0.15)
    canvas2.fillRect(size * 0.8, size * 0.75, size * 0.12, size * 0.1)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillCircle(size * 0.13, size * 0.88, size * 0.08)
    canvas2.fillCircle(size * 0.87, size * 0.88, size * 0.08)
    canvas2.fillStyle(0xc0c0c0, 1)
    canvas2.fillRect(size * 0.1, size * 0.85, size * 0.05, size * 0.04)
    canvas2.fillRect(size * 0.84, size * 0.85, size * 0.05, size * 0.04)
    // Left leg forward (blue jeans)
    canvas2.fillStyle(0x4a6fa5, 1)
    canvas2.fillRect(size * 0.3, size * 0.88, size * 0.16, size * 0.12)
    canvas2.generateTexture('player-walk-1', size, size)

    // ---------- WALK FRAME 2 (right leg forward) ----------
    const canvas3 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillCircle(size / 2, size / 2, size / 2.3)
    canvas3.fillStyle(0x1a1a1a, 1)
    canvas3.fillCircle(size / 2, size * 0.28, size / 2.1)
    canvas3.fillRect(size * 0.15, size * 0.28, size * 0.7, size * 0.12)
    canvas3.fillStyle(0xffd700, 1)
    canvas3.fillCircle(size / 2, size * 0.22, size * 0.08)
    canvas3.lineStyle(3, 0x1a1a1a, 1)
    canvas3.lineBetween(size * 0.3, size * 0.32, size * 0.22, size * 0.34)
    canvas3.lineBetween(size * 0.7, size * 0.32, size * 0.78, size * 0.34)
    canvas3.fillRect(size * 0.2, size * 0.3, size * 0.6, size * 0.06)
    canvas3.fillStyle(0xf0f0f0, 1)
    canvas3.fillCircle(size / 2, size * 0.62, size / 2.6)
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillRect(size * 0.25, size * 0.45, size * 0.5, size * 0.25)
    canvas3.fillStyle(0xf0f0f0, 1)
    canvas3.fillEllipse(size / 2, size * 0.42, size * 0.18, size * 0.08)
    canvas3.fillStyle(0x1a1a1a, 1)
    canvas3.fillRect(size * 0.22, size * 0.52, size * 0.56, size * 0.42)
    canvas3.fillStyle(0xffffff, 1)
    canvas3.fillRect(size * 0.18, size * 0.5, size * 0.08, size * 0.45)
    canvas3.fillRect(size * 0.74, size * 0.5, size * 0.08, size * 0.45)
    canvas3.fillRect(size * 0.18, size * 0.5, size * 0.64, size * 0.06)
    canvas3.lineStyle(2, 0xffffff, 1)
    canvas3.strokeCircle(size / 2, size * 0.68, size * 0.12)
    canvas3.fillStyle(0xffffff, 1)
    canvas3.fillCircle(size / 2, size * 0.68, size * 0.05)
    canvas3.fillRect(size * 0.45, size * 0.64, size * 0.1, size * 0.03)
    canvas3.lineStyle(1, 0xc0c0c0, 1)
    canvas3.lineBetween(size * 0.4, size * 0.45, size * 0.6, size * 0.45)
    canvas3.fillStyle(0xc0c0c0, 1)
    canvas3.fillCircle(size / 2, size * 0.58, size * 0.04)
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillRect(size * 0.05, size * 0.55, size * 0.18, size * 0.3)
    canvas3.fillStyle(0x2a2a2a, 0.6)
    canvas3.fillRect(size * 0.08, size * 0.6, size * 0.12, size * 0.15)
    canvas3.fillRect(size * 0.08, size * 0.75, size * 0.12, size * 0.1)
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillRect(size * 0.77, size * 0.55, size * 0.18, size * 0.3)
    canvas3.fillStyle(0x2a2a2a, 0.6)
    canvas3.fillRect(size * 0.8, size * 0.6, size * 0.12, size * 0.15)
    canvas3.fillRect(size * 0.8, size * 0.75, size * 0.12, size * 0.1)
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillCircle(size * 0.13, size * 0.88, size * 0.08)
    canvas3.fillCircle(size * 0.87, size * 0.88, size * 0.08)
    canvas3.fillStyle(0xc0c0c0, 1)
    canvas3.fillRect(size * 0.1, size * 0.85, size * 0.05, size * 0.04)
    canvas3.fillRect(size * 0.84, size * 0.85, size * 0.05, size * 0.04)
    // Right leg forward (blue jeans)
    canvas3.fillStyle(0x4a6fa5, 1)
    canvas3.fillRect(size * 0.54, size * 0.88, size * 0.16, size * 0.12)
    canvas3.generateTexture('player-walk-2', size, size)

    // ---------- ATTACK FRAME (arm forward with axe swing) ----------
    const canvas4 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillCircle(size / 2, size / 2, size / 2.3)
    canvas4.fillStyle(0x1a1a1a, 1)
    canvas4.fillCircle(size / 2, size * 0.28, size / 2.1)
    canvas4.fillRect(size * 0.15, size * 0.28, size * 0.7, size * 0.12)
    canvas4.fillStyle(0xffd700, 1)
    canvas4.fillCircle(size / 2, size * 0.22, size * 0.08)
    canvas4.lineStyle(3, 0x1a1a1a, 1)
    canvas4.lineBetween(size * 0.3, size * 0.32, size * 0.22, size * 0.34)
    canvas4.lineBetween(size * 0.7, size * 0.32, size * 0.78, size * 0.34)
    canvas4.fillRect(size * 0.2, size * 0.3, size * 0.6, size * 0.06)
    canvas4.fillStyle(0xf0f0f0, 1)
    canvas4.fillCircle(size / 2, size * 0.62, size / 2.6)
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillRect(size * 0.25, size * 0.45, size * 0.5, size * 0.25)
    canvas4.fillStyle(0xf0f0f0, 1)
    canvas4.fillEllipse(size / 2, size * 0.42, size * 0.18, size * 0.08)
    canvas4.fillStyle(0x1a1a1a, 1)
    canvas4.fillRect(size * 0.22, size * 0.52, size * 0.56, size * 0.42)
    canvas4.fillStyle(0xffffff, 1)
    canvas4.fillRect(size * 0.18, size * 0.5, size * 0.08, size * 0.45)
    canvas4.fillRect(size * 0.74, size * 0.5, size * 0.08, size * 0.45)
    canvas4.fillRect(size * 0.18, size * 0.5, size * 0.64, size * 0.06)
    canvas4.lineStyle(2, 0xffffff, 1)
    canvas4.strokeCircle(size / 2, size * 0.68, size * 0.12)
    canvas4.fillStyle(0xffffff, 1)
    canvas4.fillCircle(size / 2, size * 0.68, size * 0.05)
    canvas4.fillRect(size * 0.45, size * 0.64, size * 0.1, size * 0.03)
    canvas4.lineStyle(1, 0xc0c0c0, 1)
    canvas4.lineBetween(size * 0.4, size * 0.45, size * 0.6, size * 0.45)
    canvas4.fillStyle(0xc0c0c0, 1)
    canvas4.fillCircle(size / 2, size * 0.58, size * 0.04)
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillRect(size * 0.05, size * 0.55, size * 0.18, size * 0.3)
    canvas4.fillStyle(0x2a2a2a, 0.6)
    canvas4.fillRect(size * 0.08, size * 0.6, size * 0.12, size * 0.15)
    canvas4.fillRect(size * 0.08, size * 0.75, size * 0.12, size * 0.1)
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillRect(size * 0.77, size * 0.55, size * 0.18, size * 0.3)
    canvas4.fillStyle(0x2a2a2a, 0.6)
    canvas4.fillRect(size * 0.8, size * 0.6, size * 0.12, size * 0.15)
    canvas4.fillRect(size * 0.8, size * 0.75, size * 0.12, size * 0.1)
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillCircle(size * 0.13, size * 0.88, size * 0.08)
    canvas4.fillCircle(size * 0.87, size * 0.88, size * 0.08)
    canvas4.fillStyle(0xc0c0c0, 1)
    canvas4.fillRect(size * 0.1, size * 0.85, size * 0.05, size * 0.04)
    canvas4.fillRect(size * 0.84, size * 0.85, size * 0.05, size * 0.04)
    // Axe swing (right arm forward)
    canvas4.fillStyle(0x5d4037, 1)
    canvas4.fillRect(size * 0.8, size * 0.5, size * 0.2, size * 0.1) // handle
    canvas4.fillStyle(0x8b4513, 1)
    canvas4.fillRect(size * 0.95, size * 0.48, size * 0.1, size * 0.12) // blade
    canvas4.generateTexture('player-attack', size, size)

    this.anims.create({
      key: 'player-walk',
      frames: [
        { key: 'player-walk-1', frame: 0 },
        { key: 'player-idle', frame: 0 },
        { key: 'player-walk-2', frame: 0 },
        { key: 'player-idle', frame: 0 }
      ],
      frameRate: 10,
      repeat: -1
    })
  }

  // ============================================================
  // PLAYER FACE PORTRAITS — For UI, pranks, shop moments
  // ============================================================

  createPlayerPortraits() {
    const size = 96
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })

    // ---------- NORMAL PORTRAIT ----------
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillCircle(size / 2, size / 2, size / 2.3) // face
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillCircle(size / 2, size * 0.32, size / 2.1) // hair under cap
    canvas.fillRect(size * 0.1, size * 0.15, size * 0.8, size * 0.2) // cap
    canvas.fillStyle(0xffd700, 1)
    canvas.fillCircle(size / 2, size * 0.22, size * 0.07) // cap logo
    // Glasses
    canvas.lineStyle(3, 0x1a1a1a, 1)
    canvas.lineBetween(size * 0.3, size * 0.38, size * 0.22, size * 0.4)
    canvas.lineBetween(size * 0.7, size * 0.38, size * 0.78, size * 0.4)
    canvas.fillRect(size * 0.18, size * 0.36, size * 0.64, size * 0.07)
    // White beard
    canvas.fillStyle(0xf0f0f0, 1)
    canvas.fillCircle(size / 2, size * 0.68, size / 2.4)
    canvas.fillStyle(0xe8c39e, 1)
    canvas.fillRect(size * 0.3, size * 0.5, size * 0.4, size * 0.25) // chin bridge
    // Mustache
    canvas.fillStyle(0xf0f0f0, 1)
    canvas.fillEllipse(size / 2, size * 0.5, size * 0.2, size * 0.09)
    // Neck tattoo
    canvas.fillStyle(0x2a2a2a, 0.5)
    canvas.fillRect(size * 0.42, size * 0.42, size * 0.16, size * 0.08)
    canvas.generateTexture('player-portrait', size, size)

    // ---------- HURT PORTRAIT ----------
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillCircle(size / 2, size / 2, size / 2.3)
    canvas2.fillStyle(0x1a1a1a, 1)
    canvas2.fillCircle(size / 2, size * 0.32, size / 2.1)
    canvas2.fillRect(size * 0.1, size * 0.15, size * 0.8, size * 0.2)
    canvas2.fillStyle(0xffd700, 1)
    canvas2.fillCircle(size / 2, size * 0.22, size * 0.07)
    canvas2.lineStyle(3, 0x1a1a1a, 1)
    canvas2.lineBetween(size * 0.3, size * 0.38, size * 0.22, size * 0.4)
    canvas2.lineBetween(size * 0.7, size * 0.38, size * 0.78, size * 0.4)
    canvas2.fillRect(size * 0.18, size * 0.36, size * 0.64, size * 0.07)
    canvas2.fillStyle(0xff0000, 0.4) // blood/darkness overlay
    canvas2.fillCircle(size / 2, size * 0.68, size / 2.4)
    canvas2.fillStyle(0xf0f0f0, 1)
    canvas2.fillCircle(size / 2, size * 0.68, size / 2.6)
    canvas2.fillStyle(0xe8c39e, 1)
    canvas2.fillRect(size * 0.3, size * 0.5, size * 0.4, size * 0.25)
    canvas2.fillStyle(0xf0f0f0, 1)
    canvas2.fillEllipse(size / 2, size * 0.5, size * 0.2, size * 0.09)
    canvas2.fillStyle(0x2a2a2a, 0.5)
    canvas2.fillRect(size * 0.42, size * 0.42, size * 0.16, size * 0.08)
    canvas2.generateTexture('player-portrait-hurt', size, size)

    // ---------- VICTORY PORTRAIT ----------
    const canvas3 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillCircle(size / 2, size / 2, size / 2.3)
    canvas3.fillStyle(0x1a1a1a, 1)
    canvas3.fillCircle(size / 2, size * 0.32, size / 2.1)
    canvas3.fillRect(size * 0.1, size * 0.15, size * 0.8, size * 0.2)
    canvas3.fillStyle(0xffd700, 1)
    canvas3.fillCircle(size / 2, size * 0.22, size * 0.07)
    canvas3.lineStyle(3, 0x1a1a1a, 1)
    canvas3.lineBetween(size * 0.3, size * 0.38, size * 0.22, size * 0.4)
    canvas3.lineBetween(size * 0.7, size * 0.38, size * 0.78, size * 0.4)
    canvas3.fillRect(size * 0.18, size * 0.36, size * 0.64, size * 0.07)
    canvas3.fillStyle(0xf0f0f0, 1)
    canvas3.fillCircle(size / 2, size * 0.68, size / 2.4)
    canvas3.fillStyle(0xe8c39e, 1)
    canvas3.fillRect(size * 0.3, size * 0.5, size * 0.4, size * 0.25)
    canvas3.fillStyle(0xf0f0f0, 1)
    canvas3.fillEllipse(size / 2, size * 0.5, size * 0.2, size * 0.09)
    canvas3.fillStyle(0x2a2a2a, 0.5)
    canvas3.fillRect(size * 0.42, size * 0.42, size * 0.16, size * 0.08)
    // Victory smile
    canvas3.fillStyle(0x4ade80, 1)
    canvas3.fillRect(size * 0.43, size * 0.56, size * 0.14, size * 0.06)
    canvas3.generateTexture('player-portrait-victory', size, size)

    // ---------- INKED PORTRAIT (tattoo shop) ----------
    const canvas4 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillCircle(size / 2, size / 2, size / 2.3)
    canvas4.fillStyle(0x1a1a1a, 1)
    canvas4.fillCircle(size / 2, size * 0.32, size / 2.1)
    canvas4.fillRect(size * 0.1, size * 0.15, size * 0.8, size * 0.2)
    canvas4.fillStyle(0xffd700, 1)
    canvas4.fillCircle(size / 2, size * 0.22, size * 0.07)
    canvas4.lineStyle(3, 0x1a1a1a, 1)
    canvas4.lineBetween(size * 0.3, size * 0.38, size * 0.22, size * 0.4)
    canvas4.lineBetween(size * 0.7, size * 0.38, size * 0.78, size * 0.4)
    canvas4.fillRect(size * 0.18, size * 0.36, size * 0.64, size * 0.07)
    canvas4.fillStyle(0xf0f0f0, 1)
    canvas4.fillCircle(size / 2, size * 0.68, size / 2.4)
    canvas4.fillStyle(0xe8c39e, 1)
    canvas4.fillRect(size * 0.3, size * 0.5, size * 0.4, size * 0.25)
    canvas4.fillStyle(0xf0f0f0, 1)
    canvas4.fillEllipse(size / 2, size * 0.5, size * 0.2, size * 0.09)
    canvas4.fillStyle(0x2a2a2a, 0.5)
    canvas4.fillRect(size * 0.42, size * 0.42, size * 0.16, size * 0.08)
    // Fresh ink marks on face
    canvas4.fillStyle(0x000000, 0.4)
    canvas4.fillCircle(size * 0.32, size * 0.36, size * 0.035)
    canvas4.fillCircle(size * 0.68, size * 0.44, size * 0.035)
    canvas4.fillRect(size * 0.44, size * 0.5, size * 0.02, size * 0.04)
    canvas4.generateTexture('player-portrait-inked', size, size)
  }

  // ============================================================
  // ENEMIES
  // ============================================================

  createGhostSprite() {
    const size = 40
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffffff, 0.5)
    canvas.fillCircle(size / 2, size / 2, size / 2)
    canvas.fillStyle(0x00ffff, 0.9)
    canvas.fillCircle(size / 2 - size * 0.12, size * 0.38, size * 0.12)
    canvas.fillCircle(size / 2 + size * 0.12, size * 0.38, size * 0.12)
    canvas.fillStyle(0xff6b6b, 1)
    canvas.fillCircle(size / 2, size * 0.62, size * 0.07)
    canvas.generateTexture('ghost', size, size)
  }

  createGoblinSprite() {
    const size = 40
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0x4a7c59, 1)
    canvas.fillCircle(size / 2, size / 2, size / 2.2)
    canvas.fillStyle(0x2d5a27, 1)
    canvas.fillCircle(size / 2, size * 0.3, size / 2)
    canvas.fillStyle(0x8b4513, 1)
    canvas.fillRect(size * 0.3, size * 0.6, size * 0.4, size * 0.35)
    canvas.fillStyle(0x000000, 1)
    canvas.fillCircle(size * 0.35, size * 0.35, size * 0.06)
    canvas.fillCircle(size * 0.65, size * 0.35, size * 0.06)
    canvas.generateTexture('goblin', size, size)
  }

  createLadyGhostSprite() {
    const size = 56
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffd700, 0.45)
    canvas.fillCircle(size / 2, size / 2, size / 2)
    canvas.fillStyle(0xff6b00, 0.9)
    canvas.fillCircle(size / 2 - size * 0.1, size * 0.32, size * 0.13)
    canvas.fillCircle(size / 2 + size * 0.1, size * 0.32, size * 0.13)
    canvas.fillStyle(0xff0000, 1)
    canvas.fillEllipse(size / 2, size * 0.66, size * 0.12, size * 0.06)
    canvas.fillStyle(0xffd700, 0.35)
    canvas.fillEllipse(size / 2, size, size * 0.7, size * 0.45)
    canvas.generateTexture('lady-ghost', size, size)
  }

  // ============================================================
  // ENVIRONMENT
  // ============================================================

  createTattooShopSprite() {
    const size = 64
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0x2a2a2a, 1)
    canvas.fillRect(size * 0.2, size * 0.2, size * 0.6, size * 0.6)
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillRect(size * 0.15, size * 0.1, size * 0.7, size * 0.15)
    canvas.fillStyle(0x4a4a4a, 1)
    canvas.fillRect(size * 0.45, size * 0.55, size * 0.1, size * 0.25)
    canvas.fillStyle(0x4ade80, 1)
    canvas.fillCircle(size * 0.5, size * 0.15, size * 0.08)
    canvas.generateTexture('tattoo-shop', size, size)
  }

  createCryptSprite() {
    const size = 64
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0x3a3a3a, 1)
    canvas.fillRect(size * 0.25, size * 0.2, size * 0.5, size * 0.6)
    canvas.fillStyle(0x1a1a1a, 1)
    canvas.fillRect(size * 0.42, size * 0.45, size * 0.16, size * 0.35)
    canvas.fillStyle(0xffd700, 0.3)
    canvas.fillCircle(size * 0.5, size * 0.3, size * 0.15)
    canvas.generateTexture('exit-crypt', size, size)
  }

  createTileTextures() {
    const floorSize = 32
    const floorCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    floorCanvas.fillStyle(0x2d2d2d, 1)
    floorCanvas.fillRect(0, 0, floorSize, floorSize)
    floorCanvas.fillStyle(0x3a3a3a, 0.3)
    floorCanvas.fillRect(0, 0, floorSize, 2)
    floorCanvas.fillRect(0, floorSize - 2, floorSize, 2)
    floorCanvas.generateTexture('tile-floor', floorSize, floorSize)

    const wallSize = 32
    const wallCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    wallCanvas.fillStyle(0x4a4a4a, 1)
    wallCanvas.fillRect(0, 0, wallSize, wallSize)
    wallCanvas.fillStyle(0x2a2a2a, 1)
    for (let i = 0; i < wallSize; i += 6) {
      wallCanvas.fillRect(i, 0, 3, wallSize)
    }
    wallCanvas.generateTexture('tile-wall', wallSize, wallSize)

    const hedgeSize = 32
    const hedgeCanvas = this.make.graphics({ x: 0, y: 0, add: false })
    hedgeCanvas.fillStyle(0x2d5a27, 1)
    hedgeCanvas.fillRect(0, 0, hedgeSize, hedgeSize)
    hedgeCanvas.fillStyle(0x1e3a1a, 0.5)
    hedgeCanvas.fillCircle(8, 8, 8)
    hedgeCanvas.fillCircle(24, 8, 8)
    hedgeCanvas.fillCircle(16, 20, 8)
    hedgeCanvas.generateTexture('tile-hedge', hedgeSize, hedgeSize)

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
    const size = 8
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xffd700, 1)
    canvas.fillRect(size / 2 - 1, 0, 2, size)
    canvas.fillRect(0, size / 2 - 1, size, 2)
    canvas.generateTexture('sparkle', size, size)

    const size2 = 6
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0x8b0000, 1)
    canvas2.fillCircle(size2 / 2, size2 / 2, size2 / 2)
    canvas2.generateTexture('blood-splat', size2, size2)
  }

  createUITextures() {
    const size = 24
    const canvas = this.make.graphics({ x: 0, y: 0, add: false })
    canvas.fillStyle(0xff0000, 1)
    canvas.fillCircle(size * 0.35, size * 0.35, size * 0.2)
    canvas.fillCircle(size * 0.65, size * 0.35, size * 0.2)
    canvas.fillRect(size * 0.2, size * 0.35, size * 0.6, size * 0.5)
    canvas.generateTexture('ui-heart', size, size)

    const size2 = 24
    const canvas2 = this.make.graphics({ x: 0, y: 0, add: false })
    canvas2.fillStyle(0xffd700, 1)
    canvas2.fillRect(size2 * 0.45, 0, size2 * 0.1, size2 * 0.3)
    canvas2.fillRect(size2 * 0.3, size2 * 0.3, size2 * 0.4, size2 * 0.4)
    canvas2.fillRect(size2 * 0.45, size2 * 0.7, size2 * 0.1, size2 * 0.3)
    canvas2.generateTexture('ui-power', size2, size2)
  }
}

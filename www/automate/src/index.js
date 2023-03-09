import Phaser from 'phaser/src/phaser.js';
import { Sprite } from 'phaser/src/gameobjects';
import { Input } from 'phaser/src/input';
import { storyline } from './storyline.js';
import { property } from 'lit-element';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('egg', 'assets/img/egg.png');
}

function create() {
  const egg = this.add.sprite(400, 300, 'egg');
  egg.setScale(0.5);
  egg.setInteractive({ useHandCursor: true });

  const glow = this.add.sprite(400, 300, 'egg');
  glow.setAlpha(0.5);
  glow.setScale(1.2);
  glow.setVisible(false);

  egg.on('pointerdown', () => {
    let warmth = 100;
    let timer = this.time.addEvent({ delay: 3600000, callback: () => {
      warmth -= 10;
      updateWarmthText(warmth);
      updateGlowColor(warmth);
      if (warmth <= 0) {
        endGame();
      }
    }, loop: true });

    egg.on('pointerdown', () => {
      warmth += 20;
      updateWarmthText(warmth);
      updateGlowColor(warmth);
      timer.reset({ delay: 3600000, callback: () => {
        warmth -= 10;
        updateWarmthText(warmth);
        updateGlowColor(warmth);
        if (warmth <= 0) {
          endGame();
        }
      }, loop: true });
    });
  });

  const warmthText = this.add.text(400, 100, 'Warmth: 100%', { font: '32px Arial', fill: '#FFFFFF' });
  warmthText.setOrigin(0.5, 0.5);

  function updateWarmthText(warmth) {
    warmthText.setText('Warmth: ' + warmth + '%');
  }

  function updateGlowColor(warmth) {
    if (warmth >= 50) {
      glow.setTint(0xFFA500);
    } else {
      glow.setTint(0x87CEEB);
    }
    glow.setVisible(true);
  }

  function endGame() {
    egg.off('pointerdown');
    game.scene.stop();
    alert('Game over!');
  }
}

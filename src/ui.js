/* eslint-disable import/extensions */
import dungeon from './dungeon.js';
import turnManager from './turnManager.js';

const ui = {
  key: 'ui-scene',
  active: true,
  create() {
    this.createdUI = false;

    this.scene.get('world-scene').events.on('createUI', () => {
      const x = (80 * 16) - 190;
      let y = 10;

      turnManager.entities.forEach((entity) => {
        if (typeof entity.createUI === 'function') {
          const height = entity.createUI({
            scene: this,
            x,
            y,
            width: 198,
          });

          y += height;
        }
      });

      this.add.line(x + 5, y, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);

      this.log = this.add.text(x + 10, y + 20, '', {
        font: '12px Arial',
        color: '#cfc6b8',
        wordWrap: {
          width: 180,
        },
      });

      this.createdUI = true;
    });
  },
  update() {
    if (this.createdUI) {
      const text = dungeon.msgs.join('\n\n');
      this.log.setText(text);
    }
  },
};

export default ui;

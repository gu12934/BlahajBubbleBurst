const config = {
    type: Phaser.AUTO, // Can choose between Canvas or WebGL for rendering, this automatically chooses the best one for the user's system
    parent: 'phaser-example', // the name of the HTML <canvas> element to attach the game to. If it doesn't exist, it will create it.
    width: 800, // width of the canvas
    height: 600, // height of the canvas
    physics: { // config for game physics if we wanna use that
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: { // lifecycle hooks for game
      preload: preload,
      create: create,
      update: update
    }
};

const game = new Phaser.Game(config);

function preload() {}
function create() { // when the game is created, socket.io connection is also created
    this.socket = io();
}
function update() {}

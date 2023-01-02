import Game from "./Game";

window.addEventListener("DOMContentLoaded", () => {
  let canvas: any = document.getElementById("game") as HTMLCanvasElement;
  let game: Game = new Game(canvas);
  game.run();
});

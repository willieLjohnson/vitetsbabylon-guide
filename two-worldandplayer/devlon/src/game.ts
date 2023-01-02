import {
  Engine,
  Scene,
  Vector3,
  MeshBuilder,
  FreeCamera,
  HemisphericLight,
  KeyboardEventTypes,
} from "babylonjs";
import World from "./world/world";

export default class Game {
  engine: Engine;
  scene: Scene;
  world: World;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine, this.canvas);
    this.world = new World(this.scene);
    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          this.world.player.onKeyDown(kbInfo.event.keyCode);
          break;
        case KeyboardEventTypes.KEYUP:
          this.world.player.onKeyUp(kbInfo.event.keyCode);
          break;
      }
    });
  }

  debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  run() {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
      this.world.update();
    });
  }
}

var createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
  var scene = new Scene(engine);
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  var ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  ground.position.y = -1;

  return scene;
};

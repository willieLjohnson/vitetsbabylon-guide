import {
  Engine,
  Scene,
  Vector3,
  MeshBuilder,
  HemisphericLight,
  UniversalCamera,
  TransformNode,
} from "babylonjs";
import World from "./world/world";

export default class Game {
  engine: Engine;
  scene: Scene;
  world: World;
  camera: UniversalCamera;
  camRoot: TransformNode;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine);
    this.world = new World(this.scene);
    this.camera = new UniversalCamera(
      "cam",
      new Vector3(0, 20, -30),
      this.scene
    );
    this.camRoot = new TransformNode("root");
    this.setupCamera();
    this.camera = this.registerCamera();
  }

  debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  public registerCamera(): UniversalCamera {
    this.scene.registerBeforeRender(() => {
      this.beforeRenderUpdate();
      this.updateCamera();
    });
    return this.camera;
  }

  private beforeRenderUpdate(): void {
    this.world.update();
  }

  private setupCamera(): UniversalCamera {
    //root camera parent that handles positioning of the camera to follow the player
    this.camRoot = new TransformNode("root");
    this.camRoot.position = new Vector3(0, 0, 0); //initialized at (0,0,0)
    //to face the player from behind (180 degrees)
    this.camRoot.rotation = new Vector3(0, 0, 0);

    //rotations along the x-axis (up/down tilting)
    let yTilt = new TransformNode("ytilt");
    //adjustments to camera view to point down at our player
    yTilt.parent = this.camRoot;

    //our actual camera that's pointing at our root's position
    this.camera.lockedTarget = this.camRoot.position;
    this.camera.fov = 0.47350045992678597;
    this.camera.parent = yTilt;

    this.scene.activeCamera = this.camera;
    return this.camera;
  }

  private updateCamera(): void {
    let player = this.world.player;
    this.camRoot.position = Vector3.Lerp(
      this.camRoot.position,
      player.mesh.position,
      0.4
    );
  }

  run() {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

var createScene = function (engine: Engine) {
  var scene = new Scene(engine);

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

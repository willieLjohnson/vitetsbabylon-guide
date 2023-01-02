import { Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

export default class Entity {
  mesh: Mesh;
  moveDirection: Vector3 = new Vector3();
  constructor(
    public id: string,
    public position: Vector3 = new Vector3(),
    public diameter: number = 2,
    public moveSpeed: number = 0.2,
    public scene?: Scene
  ) {
    this.mesh = MeshBuilder.CreateSphere(
      this.id,
      { diameter: diameter },
      scene
    );
  }

  move(direction: Vector3) {
    this.position.addInPlace(direction.scale(this.moveSpeed));
  }
  update() {
    this.mesh.moveWithCollisions(this.moveDirection.scale(this.moveSpeed));
  }
}

import { Scene, PerspectiveCamera, Color } from 'three';

export class CreateScene {
  constructor(info) {
    this.renderer = info.renderer;
    this.elm = document.querySelector(info.placeholder);
    const rect = this.elm.getBoundingClientRect();

    const bgColor = info.bgColor || '#fff';
    const fov = info.fov || 75;
    const aspect = rect.width / rect.height;
    const near = info.near || 0.1;
    const far = info.far || 100;
    const cameraPosition = info.cameraPosition || { x: 0, y: 0, z: 3 };

    // scene
    this.scene = new Scene();
    this.scene.background = new Color(bgColor);

    // camera
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    this.scene.add(this.camera);

    this.meshes = [];
  }

  set(func) {
    func();
  }

  render() {
    const renderer = this.renderer;
    const rect = this.elm.getBoundingClientRect();
    // 화면에 안 보이는 경우 렌더링 제외
    if (rect.top > renderer.domElement.clientHeight || rect.bottom < 0 || rect.left > renderer.domElement.clientWidth || rect.right < 0) {
      return;
    }

    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();

    const canvasBottom = renderer.domElement.clientHeight - rect.bottom;
    renderer.setScissor(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setViewport(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setScissorTest(true);

    renderer.render(this.scene, this.camera);
  }
}

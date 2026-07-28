import { BufferGeometry, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

interface SampleModelOptions {
  count: number;
  size?: number;
}

export async function sampleModelPoints(
  modelUrl: string,
  options: SampleModelOptions,
): Promise<Float32Array> {
  const { count, size = 8 } = options;

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(modelUrl);

  gltf.scene.updateMatrixWorld(true);

  const geometries: BufferGeometry[] = [];

  gltf.scene.traverse((object) => {
    if (!(object instanceof Mesh)) {
      return;
    }

    const sourcePosition = object.geometry.getAttribute("position");

    if (!sourcePosition) {
      return;
    }

    let geometry = new BufferGeometry();

    geometry.setAttribute("position", sourcePosition.clone());

    if (object.geometry.index) {
      geometry.setIndex(object.geometry.index.clone());
    }

    geometry.applyMatrix4(object.matrixWorld);

    /**
     * Using non-indexed geometry simplifies merging
     * meshes that come from different parts of the GLB.
     */
    if (geometry.index) {
      geometry = geometry.toNonIndexed();
    }

    geometries.push(geometry);
  });

  if (geometries.length === 0) {
    throw new Error(`The model "${modelUrl}" does not contain any valid mesh.`);
  }

  const mergedGeometry = mergeGeometries(geometries, false);

  for (const geometry of geometries) {
    geometry.dispose();
  }

  if (!mergedGeometry) {
    throw new Error(`The meshes from "${modelUrl}" could not be merged.`);
  }

  mergedGeometry.computeBoundingBox();

  const boundingBox = mergedGeometry.boundingBox;

  if (!boundingBox) {
    mergedGeometry.dispose();

    throw new Error(`The model "${modelUrl}" has no valid bounding box.`);
  }

  const center = boundingBox.getCenter(new Vector3());

  const dimensions = boundingBox.getSize(new Vector3());

  const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);

  const scale = largestDimension > 0 ? size / largestDimension : 1;

  const samplingMesh = new Mesh(mergedGeometry);

  const sampler = new MeshSurfaceSampler(samplingMesh).build();

  const sampledPositions = new Float32Array(count * 3);

  const sampledPoint = new Vector3();

  for (let index = 0; index < count; index += 1) {
    sampler.sample(sampledPoint);

    sampledPoint.sub(center).multiplyScalar(scale);

    const positionIndex = index * 3;

    sampledPositions[positionIndex] = sampledPoint.x;

    sampledPositions[positionIndex + 1] = sampledPoint.y;

    sampledPositions[positionIndex + 2] = sampledPoint.z;
  }

  mergedGeometry.dispose();

  return sampledPositions;
}

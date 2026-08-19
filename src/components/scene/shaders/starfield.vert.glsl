uniform float uRevealProgress;
uniform float uMorphProgress;
uniform float uPointSize;

uniform vec3 uSourceOffset;
uniform vec3 uTargetOffset;

uniform float uRotationX;
uniform float uRotationY;

attribute vec3 aTargetPosition;
attribute float aRevealThreshold;
attribute float aSizeVariation;

varying float vAlpha;

mat3 rotationX(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, cosine, sine,
    0.0, -sine, cosine
  );
}

mat3 rotationY(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);

  return mat3(
    cosine, 0.0, -sine,
    0.0, 1.0, 0.0,
    sine, 0.0, cosine
  );
}

void main() {
  float reveal = smoothstep(
    aRevealThreshold,
    aRevealThreshold + 0.1,
    uRevealProgress
  );

  mat3 rotation =
    rotationY(uRotationY)
    * rotationX(uRotationX);

  vec3 rotatedSource =
    rotation * position;

  vec3 rotatedTarget =
    rotation * aTargetPosition;

  vec3 sourcePosition =
    rotatedSource + uSourceOffset;

  vec3 targetPosition =
    rotatedTarget + uTargetOffset;

  vec3 finalPosition = mix(
    sourcePosition,
    targetPosition,
    uMorphProgress
  );

  /*
   * Move each star from the center to its actual position
   * as it is revealed.
   */
  float emergence =
    1.0 - pow(1.0 - reveal, 3.0);

  vec3 revealedPosition = mix(
    vec3(0.0),
    finalPosition,
    emergence
  );

  vec4 viewPosition =
    modelViewMatrix
    * vec4(revealedPosition, 1.0);

  gl_Position =
    projectionMatrix
    * viewPosition;

  float perspectiveScale =
    300.0 / max(-viewPosition.z, 0.1);

  gl_PointSize =
    uPointSize
    * aSizeVariation
    * perspectiveScale
    * reveal;

  vAlpha = reveal;
}
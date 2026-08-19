uniform float uRevealProgress;
uniform float uMorphProgress;
uniform float uPointSize;

uniform vec3 uSourceOffset;
uniform vec3 uTargetOffset;

attribute vec3 aTargetPosition;
attribute float aRevealThreshold;
attribute float aSizeVariation;

varying float vAlpha;

void main() {
  float reveal = smoothstep(
    aRevealThreshold,
    aRevealThreshold + 0.1,
    uRevealProgress
  );

  vec3 sourcePosition =
    position + uSourceOffset;

  vec3 targetPosition =
    aTargetPosition + uTargetOffset;

  vec3 finalPosition = mix(
    sourcePosition,
    targetPosition,
    uMorphProgress
  );

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
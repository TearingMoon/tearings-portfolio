uniform float uRevealProgress;
uniform float uMorphProgress;
uniform float uPointSize;

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

  float morph = smoothstep(
    0.0,
    1.0,
    uMorphProgress
  );

  vec3 finalPosition = mix(
    position,
    aTargetPosition,
    morph
  );

  float emergence = smoothstep(
    0.0,
    1.0,
    reveal
  );

  vec3 revealedPosition = mix(
    vec3(0.0),
    finalPosition,
    emergence
  );

  vec4 viewPosition = modelViewMatrix
    * vec4(revealedPosition, 1.0);

  gl_Position = projectionMatrix
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
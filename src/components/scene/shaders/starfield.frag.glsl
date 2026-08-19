uniform float uOpacity;

    varying float vAlpha;

    void main() {
      vec2 centeredCoordinate =
        gl_PointCoord - vec2(0.5);

      float distanceFromCenter =
        length(centeredCoordinate);

      float circle = 1.0 - smoothstep(
        0.35,
        0.5,
        distanceFromCenter
      );

      float alpha =
        circle
        * vAlpha
        * uOpacity;

      if (alpha <= 0.01) {
        discard;
      }

      gl_FragColor = vec4(
        vec3(1.0),
        alpha
      );
    }
uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    projectionPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.5;
    projectionPosition.x += cos(uTime + modelPosition.x * 120.0) * aScale * 0.5;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;

    gl_PointSize *= (1.0 / -viewPosition.z);

}
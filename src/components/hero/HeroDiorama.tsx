"use client";

import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];

type MeshSpec = {
  center: Vec3;
  size: Vec3;
  color: [number, number, number];
};

const MESHES: MeshSpec[] = [
  { center: [0, -0.35, 0.35], size: [7.4, 0.3, 4.6], color: [0.10, 0.24, 0.28] },
  { center: [0.35, -0.12, 0.05], size: [2.4, 0.18, 2.15], color: [0.18, 0.40, 0.46] },
  { center: [-1.8, 0.85, -0.4], size: [1.15, 1.7, 1.15], color: [0.48, 0.78, 0.84] },
  { center: [0.35, 1.2, 0.05], size: [1.35, 2.4, 1.35], color: [0.66, 0.88, 0.91] },
  { center: [2.1, 0.62, -0.2], size: [0.95, 1.25, 0.95], color: [0.36, 0.68, 0.75] },
  { center: [-0.4, 0.78, -0.72], size: [0.16, 1.78, 0.18], color: [0.42, 0.83, 0.90] },
  { center: [1.1, 0.78, -0.72], size: [0.16, 1.78, 0.18], color: [0.42, 0.83, 0.90] },
  { center: [0.35, 1.66, -0.72], size: [1.66, 0.16, 0.18], color: [0.52, 0.92, 0.96] },
  { center: [2.85, 0.55, 0.7], size: [0.28, 1.7, 0.28], color: [0.28, 0.66, 0.74] },
  { center: [-3.1, 0.32, 1.6], size: [0.9, 0.95, 0.9], color: [0.12, 0.28, 0.33] },
  { center: [-2.05, 0.45, 1.75], size: [0.72, 1.2, 0.72], color: [0.14, 0.32, 0.37] },
  { center: [2.85, 0.36, 1.72], size: [0.88, 1.02, 0.88], color: [0.12, 0.28, 0.33] },
];

const VERTEX_SHADER = `#version 300 es
in vec3 a_position;
in vec3 a_color;
uniform mat4 u_matrix;
out vec3 v_color;
void main() {
  gl_Position = u_matrix * vec4(a_position, 1.0);
  v_color = a_color;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec3 v_color;
out vec4 outColor;
void main() {
  outColor = vec4(v_color, 0.84);
}`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create WebGL shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info ?? "WebGL shader compilation failed");
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create WebGL program");
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info ?? "WebGL program linking failed");
  }
  return program;
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const rangeInv = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, 2 * near * far * rangeInv, 0,
  ]);
}

function multiply(a: Float32Array, b: Float32Array) {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      out[column * 4 + row] =
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3];
    }
  }
  return out;
}

function rotateY(angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ]);
}

function rotateX(angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ]);
}

function translate(x: number, y: number, z: number) {
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1,
  ]);
}

function buildBox(center: Vec3, size: Vec3, color: [number, number, number]) {
  const [cx, cy, cz] = center;
  const [sx, sy, sz] = size;
  const hx = sx / 2;
  const hy = sy / 2;
  const hz = sz / 2;
  const x0 = cx - hx;
  const x1 = cx + hx;
  const y0 = cy - hy;
  const y1 = cy + hy;
  const z0 = cz - hz;
  const z1 = cz + hz;
  const faceColors = [
    color,
    color.map((value) => value * 0.82) as [number, number, number],
    color.map((value) => value * 0.66) as [number, number, number],
    color.map((value) => Math.min(1, value * 1.12)) as [number, number, number],
    color.map((value) => value * 0.9) as [number, number, number],
    color.map((value) => value * 0.74) as [number, number, number],
  ];
  const vertices = [
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
    [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0],
    [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1],
    [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1],
    [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0],
  ];
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
  ];
  const colors: number[] = [];
  faceColors.forEach((faceColor) => {
    for (let i = 0; i < 4; i += 1) colors.push(...faceColor);
  });
  return { vertices, indices, colors };
}

export function HeroDiorama() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.dataset.meshCount = String(MESHES.length);
    canvas.dataset.meshTriangles = String(MESHES.length * 12);

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) {
      canvas.dataset.webgl = "unavailable";
      return;
    }
    canvas.dataset.webgl = "active";

    const program = createProgram(gl);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!positionBuffer || !colorBuffer || !indexBuffer) throw new Error("Unable to create WebGL buffers");

    const positionData: number[] = [];
    const colorData: number[] = [];
    const indexData: number[] = [];
    let vertexOffset = 0;
    for (const mesh of MESHES) {
      const box = buildBox(mesh.center, mesh.size, mesh.color);
      box.vertices.forEach((vertex) => positionData.push(...vertex));
      colorData.push(...box.colors);
      box.indices.forEach((index) => indexData.push(index + vertexOffset));
      vertexOffset += box.vertices.length;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let rotation = -0.38;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      if (!reducedMotion.matches) rotation += 0.0022;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const projection = perspective(Math.PI / 4.5, width / height, 0.1, 100);
      const camera = translate(0, -0.55, -9.2);
      const world = multiply(rotateX(-0.1), rotateY(rotation));
      const matrix = multiply(projection, multiply(camera, world));
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
      frame = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(frame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas className="hero-mesh-canvas" data-testid="hero-mesh-canvas" aria-hidden="true" />;
}

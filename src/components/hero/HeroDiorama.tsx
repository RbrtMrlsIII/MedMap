"use client";

import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];
type Color = [number, number, number];

type MeshSpec = {
  center: Vec3;
  size: Vec3;
  color: Color;
  emissive?: number;
};

const MESHES: MeshSpec[] = [
  // Spatial arrival field.
  { center: [0, -0.34, 0.2], size: [8.6, 0.28, 5.4], color: [0.08, 0.19, 0.23] },
  { center: [0.15, -0.12, -0.08], size: [3.7, 0.18, 2.6], color: [0.12, 0.34, 0.40] },
  { center: [0.15, -0.015, -1.22], size: [0.62, 0.05, 2.0], color: [0.36, 0.66, 0.71], emissive: 0.08 },

  // Featured clinic mass, stepped roofline, and lobby canopy.
  { center: [-0.7, 0.88, -0.10], size: [1.85, 1.85, 1.55], color: [0.50, 0.78, 0.84] },
  { center: [0.68, 1.18, 0.18], size: [1.22, 2.45, 1.18], color: [0.67, 0.89, 0.92] },
  { center: [0.02, 0.78, -0.86], size: [1.52, 0.18, 0.30], color: [0.42, 0.82, 0.88], emissive: 0.18 },

  // Arrival portal and illuminated entrance spine.
  { center: [-0.72, 0.82, -1.05], size: [0.15, 1.72, 0.18], color: [0.37, 0.78, 0.86], emissive: 0.14 },
  { center: [0.72, 0.82, -1.05], size: [0.15, 1.72, 0.18], color: [0.37, 0.78, 0.86], emissive: 0.14 },
  { center: [0, 1.66, -1.05], size: [1.58, 0.15, 0.18], color: [0.53, 0.92, 0.96], emissive: 0.22 },

  // Landmark beacon and distant city masses.
  { center: [2.55, 0.62, 0.75], size: [0.24, 2.02, 0.24], color: [0.29, 0.67, 0.76], emissive: 0.25 },
  { center: [-2.35, 0.44, 1.55], size: [1.05, 1.55, 0.92], color: [0.10, 0.25, 0.29] },
  { center: [2.55, 0.43, 1.68], size: [1.00, 1.62, 0.92], color: [0.10, 0.25, 0.29] },
];

const VERTEX_SHADER = `#version 300 es
in vec3 a_position;
in vec3 a_color;
in vec3 a_normal;
in float a_emissive;
uniform mat4 u_matrix;
out vec3 v_color;
out vec3 v_normal;
out vec3 v_position;
out float v_emissive;
void main() {
  vec4 worldPosition = vec4(a_position, 1.0);
  gl_Position = u_matrix * worldPosition;
  v_position = worldPosition.xyz;
  v_normal = a_normal;
  v_color = a_color;
  v_emissive = a_emissive;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec3 v_color;
in vec3 v_normal;
in vec3 v_position;
in float v_emissive;
uniform float u_time;
out vec4 outColor;

void main() {
  vec3 n = normalize(v_normal);
  vec3 lightA = normalize(vec3(-0.45, 0.90, 0.55));
  vec3 lightB = normalize(vec3(0.60, 0.30, -0.40));
  float diffuseA = max(dot(n, lightA), 0.0);
  float diffuseB = max(dot(n, lightB), 0.0);
  float ambient = 0.34;

  vec3 lit = v_color * (ambient + diffuseA * 0.68 + diffuseB * 0.18);
  float pulse = 0.92 + 0.08 * sin(u_time * 2.4);
  lit += v_color * (v_emissive * pulse * 1.45);

  float edge = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
  lit += vec3(0.18, 0.34, 0.38) * edge * 0.20;

  float depth = clamp((v_position.z + 3.5) / 7.5, 0.0, 1.0);
  float fog = smoothstep(0.0, 1.0, depth) * 0.30;
  vec3 fogColor = vec3(0.03, 0.12, 0.15);
  lit = mix(lit, fogColor, fog);

  outColor = vec4(lit, 0.90);
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
        a[0 * 4 + row] * b[column * 4 + 0] +
        a[1 * 4 + row] * b[column * 4 + 1] +
        a[2 * 4 + row] * b[column * 4 + 2] +
        a[3 * 4 + row] * b[column * 4 + 3];
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

function buildBox(center: Vec3, size: Vec3, color: Color, emissive = 0) {
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

  const faceColors: Color[] = [
    color,
    color.map((value) => value * 0.80) as Color,
    color.map((value) => value * 0.64) as Color,
    color.map((value) => Math.min(1, value * 1.12)) as Color,
    color.map((value) => value * 0.90) as Color,
    color.map((value) => value * 0.74) as Color,
  ];
  const faceNormals: Vec3[] = [
    [0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0],
  ];

  const faces: Vec3[][] = [
    [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]],
    [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]],
    [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]],
    [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]],
    [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]],
    [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]],
  ];

  const vertices: number[] = [];
  const colors: number[] = [];
  const normals: number[] = [];
  const emissiveData: number[] = [];

  faces.forEach((face, faceIndex) => {
    const faceColor = faceColors[faceIndex];
    const normal = faceNormals[faceIndex];
    face.forEach((vertex) => {
      vertices.push(...vertex);
      colors.push(...faceColor);
      normals.push(...normal);
      emissiveData.push(emissive);
    });
  });

  return {
    vertices,
    colors,
    normals,
    emissive: emissiveData,
    indices: [
      0, 1, 2, 0, 2, 3,
      4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11,
      12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19,
      20, 21, 22, 20, 22, 23,
    ],
  };
}

export function HeroDiorama() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) {
      canvas.dataset.webgl = "unavailable";
      return;
    }
    canvas.dataset.webgl = "active";

    const program = createProgram(gl);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const normalLocation = gl.getAttribLocation(program, "a_normal");
    const emissiveLocation = gl.getAttribLocation(program, "a_emissive");
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const emissiveBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!positionBuffer || !colorBuffer || !normalBuffer || !emissiveBuffer || !indexBuffer) {
      throw new Error("Unable to create WebGL buffers");
    }

    const positionData: number[] = [];
    const colorData: number[] = [];
    const normalData: number[] = [];
    const emissiveData: number[] = [];
    const indexData: number[] = [];
    let vertexOffset = 0;

    for (const mesh of MESHES) {
      const box = buildBox(mesh.center, mesh.size, mesh.color, mesh.emissive ?? 0);
      positionData.push(...box.vertices);
      colorData.push(...box.colors);
      normalData.push(...box.normals);
      emissiveData.push(...box.emissive);
      box.indices.forEach((index) => indexData.push(index + vertexOffset));
      vertexOffset += box.vertices.length / 3;
    }

    canvas.dataset.meshCount = String(MESHES.length);
    canvas.dataset.meshTriangles = String(indexData.length / 3);
    canvas.dataset.environmentVersion = "2";

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalLocation);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, emissiveBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(emissiveData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(emissiveLocation);
    gl.vertexAttribPointer(emissiveLocation, 1, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let rotation = -0.34;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const delta = Math.min(32, now - lastTime);
      lastTime = now;
      if (!reducedMotion.matches) rotation += delta * 0.000022;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const projection = perspective(Math.PI / 4.2, width / height, 0.1, 100);
      const camera = translate(0, -0.58, -9.4);
      const world = multiply(rotateX(-0.18), rotateY(rotation));
      const matrix = multiply(projection, multiply(camera, world));
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.uniform1f(timeLocation, now * 0.001);
      gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
      frame = window.requestAnimationFrame(render);
    };

    render(performance.now());
    return () => {
      window.cancelAnimationFrame(frame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteBuffer(normalBuffer);
      gl.deleteBuffer(emissiveBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-mesh-canvas"
      data-testid="hero-mesh-canvas"
      data-webgl="unavailable"
      data-mesh-count="12"
      data-mesh-triangles="144"
      data-environment-version="2"
      aria-hidden="true"
    />
  );
}

"use client";
import React, { useEffect } from "react";
import { createNoise3D } from "simplex-noise";

const AnimatedCanvasDark: React.FC = () => {
  useEffect(() => {
    const circleCount = 150;
    const circlePropCount = 8;
    const circlePropsLength = circleCount * circlePropCount;
    const baseSpeed = 0.1;
    const rangeSpeed = 1;
    const baseTTL = 150;
    const rangeTTL = 200;
    const baseRadius = 100;
    const rangeRadius = 200;
    const rangeHue = 60;
    const xOff = 0.0015;
    const yOff = 0.0015;
    const zOff = 0.0015;
    const darkBackgroundColor = "hsla(0,0%,5%,1)";

    let container: HTMLElement | null;
    let canvas: { a: HTMLCanvasElement; b: HTMLCanvasElement };
    let ctx: { a: CanvasRenderingContext2D; b: CanvasRenderingContext2D };
    let circleProps: Float32Array;
    const noise3D = createNoise3D();
    let baseHue = 220;

    function rand(max: number): number {
      return Math.random() * max;
    }

    function setup() {
      createCanvas();
      resize();
      initCircles();
      draw();
      window.addEventListener("resize", resize);
    }

    function initCircles() {
      circleProps = new Float32Array(circlePropsLength);

      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i);
      }
    }

    function initCircle(i: number) {
      let x = rand(canvas.a.width);
      let y = rand(canvas.a.height);
      let n = noise3D(x * xOff, y * yOff, baseHue * zOff);
      let t = rand(Math.PI * 2);
      let speed = baseSpeed + rand(rangeSpeed);
      let vx = speed * Math.cos(t);
      let vy = speed * Math.sin(t);
      let life = 0;
      let ttl = baseTTL + rand(rangeTTL);
      let radius = baseRadius + rand(rangeRadius);
      let hue = baseHue + n * rangeHue;

      circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
    }

    function updateCircles() {
      baseHue++;
      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i);
      }
    }

    function updateCircle(i: number) {
      let i2 = i + 1;
      let i3 = i + 2;
      let i4 = i + 3;
      let i5 = i + 4;
      let i6 = i + 5;
      let i7 = i + 6;
      let i8 = i + 7;
      let x = circleProps[i];
      let y = circleProps[i2];
      let vx = circleProps[i3];
      let vy = circleProps[i4];
      let life = circleProps[i5];
      let ttl = circleProps[i6];
      let radius = circleProps[i7];
      let hue = circleProps[i8];

      drawCircle(x, y, life, ttl, radius, hue);

      life++;

      circleProps[i] = x + vx;
      circleProps[i2] = y + vy;
      circleProps[i5] = life;

      if (checkBounds(x, y, radius) || life > ttl) {
        initCircle(i);
      }
    }

    function drawCircle(
      x: number,
      y: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) {
      ctx.a.save();
      ctx.a.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.arc(x, y, radius, 0, Math.PI * 2);
      ctx.a.fill();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function checkBounds(x: number, y: number, radius: number) {
      return (
        x < -radius ||
        x > canvas.a.width + radius ||
        y < -radius ||
        y > canvas.a.height + radius
      );
    }

    function createCanvas() {
      container = document.querySelector(".content--canvas");
      if (!container) return;

      canvas = {
        a: document.createElement("canvas"),
        b: document.createElement("canvas"),
      };
      canvas.b.style.position = "fixed";
      canvas.b.style.top = "0";
      canvas.b.style.left = "0";
      canvas.b.style.width = "100%";
      canvas.b.style.height = "100%";
      container.appendChild(canvas.b);
      ctx = {
        a: canvas.a.getContext("2d") as CanvasRenderingContext2D,
        b: canvas.b.getContext("2d") as CanvasRenderingContext2D,
      };
    }

    function resize() {
      const { innerWidth, innerHeight } = window;

      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;

      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;

      ctx.b.drawImage(canvas.a, 0, 0);
    }

    function render() {
      ctx.b.save();
      ctx.b.filter = "blur(50px)";
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function draw() {
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
      ctx.b.fillStyle = darkBackgroundColor;
      ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
      updateCircles();
      render();
      window.requestAnimationFrame(draw);
    }

    function fadeInOut(life: number, ttl: number) {
      const halfTTL = ttl / 2;
      return life < halfTTL ? life / halfTTL : 1 - (life - halfTTL) / halfTTL;
    }

    setup();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="content--canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedCanvasDark;

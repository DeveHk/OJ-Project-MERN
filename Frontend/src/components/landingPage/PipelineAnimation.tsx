"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const PipelineAnimationCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff), 1); // White background
    mountRef.current!.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      plane.rotation.x += 0.01;
      plane.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      mountRef.current!.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default PipelineAnimationCanvas;

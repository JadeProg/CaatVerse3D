import { PerspectiveCamera, Text, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControlsStore } from "./controlsStore";
import * as THREE from "three";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Avatar } from "../Avatar";
import { useFrame } from "@react-three/fiber";

export function Player() {
  const rb = useRef();
  const cameraRef = useRef();
  const [, get] = useKeyboardControls();
  const footstepSound = useRef();
  const [Moving, setMoving] = useState(false);

  const audioUnlocked = useRef(false);

  useEffect(() => {
    const unlockAudio = () => {
      if (audioUnlocked.current) return;

      footstepSound.current = new Audio("/Steps.mp3");
      footstepSound.current.loop = true;
      footstepSound.current.volume = 0.17;
      audioUnlocked.current = true;
    };

    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("click", unlockAudio);

    return () => {
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  const mobileControls = useControlsStore();

  const [animation, setAnimation] = useState("idle");
  const character = useRef();

  // Câmera lateral, mais próxima e mais baixa
  const valueCamera =
    window.innerWidth < 768
      ? new THREE.Vector3(2.1, 0.55, 0)
      : new THREE.Vector3(2.5, 0.65, 0)

  const targetQuat = useRef(new THREE.Quaternion());
  const movingRef = useRef(false);

  useFrame((state) => {
    if (!rb.current) return;

    const keyboard = get();

    const forward = keyboard.forward || mobileControls.forward;
    const backward = keyboard.backward || mobileControls.backward;
    const left = keyboard.left || mobileControls.left;
    const right = keyboard.right || mobileControls.right;

    const isMoving = forward || backward || left || right;

    const nextAnimation = isMoving ? "run" : "idle";
    if (animation !== nextAnimation) {
      setAnimation(nextAnimation);
    }

    if (isMoving !== movingRef.current) {
      movingRef.current = isMoving;
      setMoving(isMoving);
    }

    const currentVel = rb.current.linvel();

    if (isMoving) {
      let velX = 0;
      let velZ = 0;

      const speed = window.innerWidth < 768 ? 3.5 : 4;

      if (forward) velX -= speed;
      if (backward) velX += speed;
      if (left) velZ += speed;
      if (right) velZ -= speed;

      rb.current.setLinvel(
        {
          x: velX,
          y: currentVel.y,
          z: velZ,
        },
        true
      );

      const angle = Math.atan2(velX, velZ) - Math.PI / 2;

      targetQuat.current.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angle
      );

      if (character.current) {
        character.current.quaternion.slerp(targetQuat.current, 0.15);
      }

      if (cameraRef.current) {
        const frequency = 8;
        const amplitude = 0.04;
        const bob = Math.sin(state.clock.elapsedTime * frequency) * amplitude;

        cameraRef.current.position.x = valueCamera.x;
        cameraRef.current.position.y = valueCamera.y + bob;
        cameraRef.current.position.z = valueCamera.z;
      }
    } else {
      rb.current.setLinvel(
        {
          x: 0,
          y: currentVel.y,
          z: 0,
        },
        true
      );

      if (cameraRef.current) {
        cameraRef.current.position.set(
          valueCamera.x,
          valueCamera.y,
          valueCamera.z
        );
      }
    }
  });

  useEffect(() => {
    const sound = footstepSound.current;
    if (!sound || !audioUnlocked.current) return;

    if (Moving) {
      if (sound.paused) {
        sound.play().catch(() => {});
      }
    } else {
      if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  }, [Moving]);

  return (
    <RigidBody
      name="player"
      gravityScale={2.5}
      ref={rb}
      colliders={false}
      position={[0, 5, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
      enabledRotations={[false, false, false]}
    >
      <PerspectiveCamera
        makeDefault
        position={valueCamera}
        rotation={[-0.025, Math.PI / 1.9, 0]}
        ref={cameraRef}
        fov={window.innerWidth < 768 ? 65 : 48}
      />

      <CapsuleCollider args={[0.4, 0.2]} position={[0, 0.6, 0]} />

      <Text fontSize={0.2} position={[0, 1.3, 0]}>
        Jey
      </Text>

      <group ref={character} rotation={[0, -Math.PI / 2, 0]}>
        <Avatar scale={0.3} animation={animation} />
      </group>
    </RigidBody>
  );
}
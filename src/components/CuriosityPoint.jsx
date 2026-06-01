import { Sparkles } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export function CuriosityPoint({
  position,
  title,
  text,
  image,
  onOpen,
  onClose,
}) {
  return (
    <>
      {/* Círculo visual no chão */}
      <group position={position}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
          <ringGeometry args={[0.28, 0.34, 64]} />
          <meshBasicMaterial
            color="#554001ff"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Brilho interno discreto */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial
            color="#92ccfcff"
            transparent
            opacity={0.02}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <Sparkles
          count={6}
          scale={[0.8, 1.1, 0.8]}
          size={window.innerWidth < 768 ? 4 : 8}
          speed={0.45}
          color="#dce875ff"
        />

        <pointLight
          distance={1.8}
          intensity={0.7}
          color="#6cdda1ff"
          position={[0, 0.18, 0]}
        />
      </group>

      {/* Área invisível de interação, menor e alinhada com o círculo */}
      <RigidBody type="fixed" colliders={false} position={position}>
        <CuboidCollider
          args={[0.25, 0.65, 0.25]}
          position={[0, 0.38, 0]}
          sensor
          onIntersectionEnter={(e) => {
            if (e.other.rigidBodyObject?.name === "player") {
              onOpen({
                title,
                text,
                image,
              });
            }
          }}
          onIntersectionExit={(e) => {
            if (e.other.rigidBodyObject?.name === "player") {
              onClose();
            }
          }}
        />
      </RigidBody>
    </>
  );
}
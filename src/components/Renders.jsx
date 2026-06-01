import { RigidBody } from "@react-three/rapier";
import { CasaAmarela, Casas, Coreto, Mapa, Praca, Torre } from "../Mapa";

export function Renders() {
    return (
        <>
            <RigidBody type='fixed' colliders="trimesh">
                <Mapa position={[0, -0.3, 0]} scale={5} rotation={[0, - Math.PI / 2, 0]} />
            </RigidBody>

            <RigidBody type='fixed' colliders="cuboid" scale={5} rotation={[0, - Math.PI / 2, 0]} position={[-0.1, -0.3, 0]}>
                <Casas />
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid" scale={5} rotation={[0, - Math.PI / 2, 0]} position={[-0.1, -0.3, 0]}>
                <CasaAmarela />
            </RigidBody>

            <RigidBody type='fixed' colliders="cuboid" scale={4.5} position={[-0.8, -0.3, -9]}>
                <Coreto />
            </RigidBody>

            <RigidBody type='fixed' colliders="cuboid" scale={4.5} position={[13, -0.3, -4]}>
                <Praca />
            </RigidBody>

            <RigidBody type='fixed' colliders="cuboid" scale={4.5} rotation={[0, - Math.PI / 2, 0]} position={[-1, -0.3, 0]}>
                <Torre />
            </RigidBody>
        </>
    )
}
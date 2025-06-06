import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function randomSpherePosition(radius) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
}

function Nucleus({ protons = 4, neutrons = 4 }) {
    const particles = [];
    for (let i = 0; i < protons; i++) {
        particles.push(
            <mesh key={`p-${i}`} position={randomSpherePosition(0.5)}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="crimson" />
            </mesh>
        );
    }
    for (let i = 0; i < neutrons; i++) {
        particles.push(
            <mesh key={`n-${i}`} position={randomSpherePosition(0.5)}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="gray" />
            </mesh>
        );
    }
    return <group>{particles}</group>;
}

function Electron({ radius, speed, index, total }) {
    const ref = useRef();
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * speed;
        const angle = (2 * Math.PI * index) / total + t;
        ref.current.position.x = radius * Math.cos(angle);
        ref.current.position.z = radius * Math.sin(angle);
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#00bfff" />
        </mesh>
    );
}

function Atom({ element, settings }) {
    const levels = element.electrons;
    const totalProtons = element.atomicNumber;
    const totalNeutrons = Math.round(element.mass - element.atomicNumber);
    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <Nucleus protons={totalProtons} neutrons={totalNeutrons} />
            {levels.map((count, i) =>
                Array.from({ length: count }).map((_, idx) => (
                    <Electron
                        key={`${i}-${idx}`}
                        radius={(1.5 + i * 1.5) * settings.scale}
                        speed={settings.rotate ? settings.speed * 0.5 : 0}
                        index={idx}
                        total={count}
                    />
                ))
            )}
        </>
    );
}

export default function AtomViewer({ element, settings }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: '#0b0f2f', height: '100vh', width: '100%' }}
        >
            <Atom element={element} settings={settings} />
            <OrbitControls enableZoom={true} />
        </Canvas>
    );
}

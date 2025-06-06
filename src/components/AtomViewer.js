import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

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
            <meshStandardMaterial color="blue" />
        </mesh>
    );
}

function Atom({ element, settings }) {
    const levels = element.electrons;
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />
            {/* Ядро */}
            <mesh>
                <sphereGeometry args={[0.5 * settings.scale, 32, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
            {/* Электроны */}
            {levels.map((count, i) =>
                Array.from({ length: count }).map((_, idx) => (
                    <Electron
                        key={`${i}-${idx}`}
                        radius={1.5 + i * 1.2}
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
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Atom element={element} settings={settings} />
            <OrbitControls enableZoom={true} />
        </Canvas>
    );
}
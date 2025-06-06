import { useState } from "react";
import AtomViewer from "./components/AtomViewer";
import PeriodicTable from "./components/PeriodicTable";
import ControlsPanel from "./components/ControlsPanel";
import elements from "./data/elements.json";

export default function App() {
    const [selectedElement, setSelectedElement] = useState(elements[0]);
    const [settings, setSettings] = useState({ scale: 1, speed: 1, rotate: true });

    return (
        <div className="flex flex-col h-screen bg-[#0b0f2f] text-white">
            <header className="p-4 text-center text-xl font-bold border-b border-white/10">
                3D Атомный Визуализатор
            </header>
            <main className="flex flex-1 overflow-hidden">
                <div className="w-1/4 p-4 bg-[#11162e] border-r border-white/10">
                    <PeriodicTable
                        elements={elements}
                        selected={selectedElement}
                        onSelect={setSelectedElement}
                    />
                    <ControlsPanel settings={settings} onChange={setSettings} />
                </div>
                <div className="flex-1">
                    <AtomViewer element={selectedElement} settings={settings} />
                </div>
            </main>
        </div>
    );
}
import { useState } from "react";
import AtomViewer from "./components/AtomViewer";
import PeriodicTable from "./components/PeriodicTable";
import ControlsPanel from "./components/ControlsPanel";
import elements from "./data/elements.json";

export default function App() {
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [settings, setSettings] = useState({ scale: 1, speed: 1, rotate: true });

  return (
      <div className="flex flex-col h-screen">
        <header className="bg-gray-800 text-white p-4 text-center text-xl font-bold">
          3D Атомный Визуализатор
        </header>
        <main className="flex flex-1">
          <div className="w-1/4 p-4 bg-gray-100">
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
export default function ControlsPanel({ settings, onChange }) {
    return (
        <div className="mt-6">
            <label className="block">Масштаб:</label>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.scale}
                onChange={(e) => onChange({ ...settings, scale: parseFloat(e.target.value) })}
            />

            <label className="block mt-4">Скорость вращения:</label>
            <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={settings.speed}
                onChange={(e) => onChange({ ...settings, speed: parseFloat(e.target.value) })}
            />

            <label className="block mt-4">
                <input
                    type="checkbox"
                    checked={settings.rotate}
                    onChange={(e) => onChange({ ...settings, rotate: e.target.checked })}
                />{' '}
                Вращение включено
            </label>
        </div>
    );
}
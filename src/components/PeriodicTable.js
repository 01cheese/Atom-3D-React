export default function PeriodicTable({ elements, selected, onSelect }) {
    return (
        <div>
            <label className="font-bold">Выбор элемента:</label>
            <select
                className="w-full p-2 mt-2 border"
                value={selected.symbol}
                onChange={(e) => {
                    const el = elements.find((el) => el.symbol === e.target.value);
                    onSelect(el);
                }}
            >
                {elements.map((el) => (
                    <option key={el.symbol} value={el.symbol}>
                        {el.name} ({el.symbol})
                    </option>
                ))}
            </select>
        </div>
    );
}
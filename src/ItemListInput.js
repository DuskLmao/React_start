import { useState } from "react";

function ItemListInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        placeholder="Thêm công việc..."
        style={{ flex: 1, marginRight: 10 }}
      />
      <button className="add-btn" onClick={handleAdd}>Thêm mới</button>
    </div>
  );
}

export default ItemListInput;
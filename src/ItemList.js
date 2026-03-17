import { useState } from "react";

function ItemListItem({ ItemList, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(ItemList.text);

  const handleSave = () => {
    onEdit(ItemList.id, newText);
    setIsEditing(false);
  };

  return (
    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        ) : (
          <span
            style={{
              marginLeft: 10
            }}
          >
            {index}. {ItemList.text.length > 20 ? ItemList.text.slice(0, 20) + '...' : ItemList.text}
          </span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button onClick={handleSave}>Lưu</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Sửa</button>
        )}

        <button className="delete-btn" onClick={() => onDelete(ItemList.id)}>Xóa</button>
      </div>
    </div>
  );
}

export default ItemListItem;
import { useState, useEffect } from "react";
import ItemListInput from "./ItemListInput";
import ItemListItem from "./ItemList";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addItemList = (text) => {
    const newItemList = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newItemList]);
  };

  const deleteItemList = (id) => {
    setTodos(todos.filter(ItemList => ItemList.id !== id));
  };

  const editItemList = (id, newText) => {
    setTodos(
      todos.map(ItemList =>
        ItemList.id === id
          ? { ...ItemList, text: newText }
          : ItemList
      )
    );
  };

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>ItemList App</h2>

      <ItemListInput onAdd={addItemList} />

      {currentTodos.map((ItemList, index) => (
        <ItemListItem
          key={ItemList.id}
          ItemList={ItemList}
          index={(currentPage - 1) * itemsPerPage + index + 1}
          onDelete={deleteItemList}
          onEdit={editItemList}
        />
      ))}

      {totalPages > 1 && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
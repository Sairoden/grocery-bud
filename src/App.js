import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) return JSON.parse(list);
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, "Please enter a value", "danger");
    } else if (name && isEditing) {
      // display with edit
      setList(
        list.map(item => {
          if (item.id === editID) {
            return { ...item, title: name };
          }

          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      // show alert
      showAlert(true, "Item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const handleReset = () => {
    showAlert(true, "empty list", "danger");
    setList([]);
  };

  const handleRemoveItem = id => {
    showAlert(true, "item removed", "danger");
    setList(list.filter(item => item.id !== id));
  };

  const handleEditItem = id => {
    const item = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(item.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            handleEditItem={handleEditItem}
            handleRemoveItem={handleRemoveItem}
            items={list}
          />
          <button onClick={handleReset} className="clear-btn">
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

// 48

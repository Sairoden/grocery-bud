import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, "Please enter a value", "danger");
    } else if (name && isEditing) {
      // display with edit
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
          <List handleRemoveItem={handleRemoveItem} items={list} />
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

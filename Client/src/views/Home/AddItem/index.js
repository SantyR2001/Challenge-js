import { Component } from "react";
import "./addItem.css";

class AddItem extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const concept = document.getElementById("concept");
    const type = document.getElementById("type");
    const amount = document.getElementById("amount");

    fetch("http://localhost:3001/add", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        concept: concept.value,
        type: type.value,
        amount: amount.value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Categoría creada");
        }
      });
  };
  render() {
    return (
      <form
        className="Form"
        method="POST"
        id="form"
        name="form"
        onSubmit={this.onSubmit}
      >
        <h3>Create new item!</h3>
        <hr />
        <div className="Form-selection">
          <label>
            <label>Type</label>
            <br />
            <select className="Form-input" required name="type" id="type">
              <option value="0">Entry</option>
              <option value="1">Egress</option>
            </select>
          </label>
          <div>
            <label>Amount</label>
            <br />
            <input
              className="Form-input"
              maxLength="10"
              required
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label>Concept</label>
            <br />
            <input
              className="Form-input"
              minLength="3"
              maxLength="15"
              required
              type="text"
              name="concept"
              id="concept"
              placeholder="Enter concept"
            />
          </div>
          <br />
          <button className="Form-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default AddItem;
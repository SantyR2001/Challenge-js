import React, { useEffect, useState } from "react";
import AddItem from "../AddItem";
import EditItem from "../EditItem";
import "./itemList.css";

const ItemList = () => {
  const url = "http://localhost:3001/movements";
  const [items, setItems] = useState();
  const fetchApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setItems(responseJSON);
  };
  useEffect(() => {
    fetchApi().catch(null);
  }, []);

  const [itemDate, setItemDate] = useState([]);
  let totalAmount = 0;
  const [isUpdating, setIsUpdating] = useState(false);

  const itemDelete = async (id) => {
    await fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    })
    fetchApi().catch(null);
  }

  const getItem = (item) => {
    setItemDate(item)
    setIsUpdating(true);
  }

  const getDate = (date) => {
    let parseDate = date.substring(0, 10);
    return parseDate;
  };

  return (
    <div>
      <div>
        <AddItem/>
      </div>
    <div className="list-item">
      <div>
        <h2>ITEM LIST</h2>
      </div>
      <hr />
        <div>
        {!items? "Loading..." : items
              .slice(items.length - 20)
              .reverse()
              .map((item, index) => {
                if(item.type === 0){
                  totalAmount= totalAmount + item.amount;
                } else{
                  totalAmount= totalAmount - item.amount;
                }
                return (
                  <div>
                    <div
                      className={item.type === 0 ? "item-green" : "item-red"}
                      key={index}
                    >
                      <button
                        className="update-btn"
                        onClick={() => getItem(item)}
                      >
                        Edit
                      </button>
                      {item.concept} | {getDate(item.date)} |{" "}
                      {item.type === 0 ? "+" : "-"}${item.amount}
                      <button className="delete-btn" onClick={()=>itemDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })
              }
        <div>MONTO TOTAL: {totalAmount}</div>
      </div>
    </div>
      <EditItem itemDate={itemDate} isUpdating={isUpdating} />
    </div>
  );
};

export default ItemList;

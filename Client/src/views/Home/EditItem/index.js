import React, { useState } from "react";
import './edititem.css'

function EditItem({ itemDate, isUpdating }) {

    const [concept, setConcept] = useState();
    const [amount, setAmount] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()   
    
        await fetch(`http://localhost:3001/edit/${itemDate.id}`, {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            concept: concept,
            amount: amount,
          }),
        })
        .then(async res => await res.json())
          .then(res => {
            if (!res.ok) {
                const error = (res && res.message) || res.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

        return(
            <div className="disp-center">
            {isUpdating === true ?
                <div className="Form-border">
                    <h2>Update Item!</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="Form-space">
                        <label className="column">
                          Amount
                            <input    
                            className="Form-edit-amount"           
                            maxLength="10"
                            required
                            type="number"
                            name="amount"
                            id="amount"
                            placeholder={itemDate.amount}
                            value={amount}
                            onChange= {({target: {value}})=> setAmount(value)}
                            />
                        </label>
                        <label className="column">
                          Concept
                            <input
                            className="Form-edit-concept" 
                            minLength="3"
                            maxLength="15"
                            required
                            type="text"
                            name="concept"
                            id="concept"
                            placeholder={itemDate.concept}
                            value={concept}
                            onChange= {({target: {value}})=> setConcept(value)}
                            />
                        </label>
                        </div>
                        <button className='Form-edit-btn' type="submit"> Set data </button>
                    </form>
                </div>
          : ''} 
          </div>
        )
}

export default EditItem;
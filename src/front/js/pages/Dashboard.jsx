import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Dashboard = () => {
    const { store, actions } = useContext(Context);
  



    return (
        
        <div className="d-flex justify-content-center mt-5">
            <div className="card" style={{ width: '18rem' }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1tORth-EGASRgwzJapWkoywwUW7OeyfH1w&usqp=CAU" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">User</h5>
                    <p className="card-text">{store.user.email}</p>

                </div>
            </div>
        </div>
    )
}

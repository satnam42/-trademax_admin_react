import React from "react";
import { useState } from "react";
import useValid from '../Hooks/useValid'

const DynamicForm = () => {
  const userTemplate = {
    name: "",
    username: ""
  };          

  const [users, setUsers] = useState([userTemplate]);
  const {isValidEmail,isFieldEmpty} = useValid();

  const addUser = (e) => {
    if(users.length<=4)
    {
      e.preventDefault();
    setUsers([...users, userTemplate]);
    }
  };
  const remove = (e,index) => {
    
    if(users.length>=2)
    {
    e.preventDefault();
    
    users.splice(index,1);
    setUsers([...users]);
    }
  };
  const update = (e, index) => {
    const {name, value}=e.target;
    const valid =isValidEmail(value);
    const upusers = users.map((user,i) => 
      index === i ?
        user= {...user,[e.target.name]:e.target.value}
        :
        user
    );
    localStorage.setItem("token", "bxvhs67657gs7t7zx66x55");
    const token= localStorage.getItem("token");
    console.log(token);
    setUsers([...upusers]);
  };
  return (
    <div className="container">
      <div className="card w-75 border shadow my-4 mx-auto">
        {
        users.map((user, index) => {
         const { name, username} = user;
          return (
              
            <form className="px-5 pb-2" key={index}>
              <div id="emailHelp" className="form-text" style={{position:"relative", marginBottom:"20px"}}>
              <p className="h5" style={{marginBottom:"10px",marginTop:"10px", textAlign:"center"}}>User {index+1}</p>
                <button
                onClick={(e) => remove(e, index)}
                className="btn btn-outline-light"
                style={{color:"red", position:"absolute", right:"0px", top:"0px"  }}
              >
              <i className="material-icons" >delete</i>
              </button>
                </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                Name 
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>update(e,index)}
                  name="name"
                  value={name}
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={e=>update(e,index)}
                  name="username"
                  value={username}
                />
              </div>
            </form>
          );
        })}
         <button
                onClick={(e) => addUser(e)}
                className="btn btn-outline-dark w-50 mx-auto mb-3"
              >
                <i className="material-icons" style={{color:"blue"}}>add</i>
              </button> 
        <button type="submit" className="btn btn-outline-dark w-50 mx-auto mb-3">
              <i className="material-icons" style={{color:"green"}}>check_circle</i>
              </button>
      </div>
    </div>
  );
};

export default DynamicForm;
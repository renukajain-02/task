import React, { useState, useEffect } from "react";
import items from './Mock_Data.json';
import ShowData from "./ShowData";

//To Access Arrow Keys(Up, Down) and Enter Key
const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

//Display filtered data in suggestion
const ListItem = ({ item, active, setSelected, setHovered}) => (
  
    <div
        className={`item ${active ? "active" : ""}`}
        onClick={() => setSelected(item)}
        onMouseEnter={() => setHovered(item)}
        onMouseLeave={() => setHovered(undefined)}
        onKeyPress={() => setSelected(item)}
        >
        <div>
          <h4>{item.id}</h4>
        </div>
        <div>
          <h5>{item.name}</h5>
        </div>
        <div>
            <p>{item.address}, {item.pincode}</p>
        </div>
    </div>
);

const SearchData = () => {
  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [user,setUser]= useState([]);
  const [searchString,setSearchString] =useState("");

  useEffect(() => {
    if (user.length && downPress) {
      setCursor(prevState =>
        prevState < items.length -1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (user.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (user.length && enterPress) {
      setSelected(user[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (user.length && hovered) {
      setCursor(user.indexOf(hovered));
    }
  }, [hovered]);

  //Filter User List on the basis of Search Value
  const handleChange= (event) => {
    let searchval=event.target.value;
    let suggestion=[];
    
    if(searchval.length >0){
      suggestion=items.sort().filter((e) => e.id.toLowerCase().includes(searchval.toLowerCase()) || e.name.toLowerCase().includes(searchval.toLowerCase()) || e.address.toLowerCase().includes(searchval.toLowerCase()) || e.pincode.toLowerCase().includes(searchval.toLowerCase()) || e.items.toString().includes(searchval.toLowerCase()));
    }
    
    setUser(suggestion);
    setSearchString(searchval);
  };

  const getUsers = () => {
    if (user.length===0 && searchString !== "") {
      return <p className="m-5">No User Found</p>;
    }
    return(
      <>
      {user.map((item,i) => {
        return(
            <ListItem
              key={item.id}
              active={i === cursor}
              item={item}
              setSelected={setSelected}
              setHovered={setHovered}
            /> 
        );
      })}
      </>
    );
  }

  //if Data selected then open that data into new page otherwise display "No User Found" Message
  if(selected != undefined){  
      return(
          <ShowData selected={selected} />
      )
  }
  else{
    return (
      <div className="container m-5">
        <div className="box">
          <i className="fa fa-search m-2"  />
          <input autoFocus={true} 
              className="input-search" 
              type="search" 
              onChange={handleChange}
              value={searchString}
              placeholder="Search Users by ID, Address, Name..." />
        </div>
        
          {getUsers()}
        
      </div>
    );
  }
};

export default SearchData

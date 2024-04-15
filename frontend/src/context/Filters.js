import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";

const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
    const [filter, setFilter] = useState(false);
    const [location, setLocation] = useState("");
    const [item, setItem] = useState({});
    const [count, setCount] = useState(1);



  return (
    <FiltersContext.Provider value={{ filter, setFilter, location, setLocation, item, setItem, count, setCount }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);

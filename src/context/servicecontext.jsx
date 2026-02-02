import { createContext, useContext, useEffect, useState } from "react";
import api from "../api"; // apna axios instance

const ServiceTitleContext = createContext(null);

export const ServiceTitleProvider = ({ children }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchServiceTitles = async () => {
      try {
        const res = await api.get("/api/services");
        const onlyTitles = res.data.data.map(item => item.title);
        setTitles(onlyTitles);
      } catch (error) {
        console.log("service titles error", error);
      }
    };

    fetchServiceTitles();
  }, []);

  return (
    <ServiceTitleContext.Provider value={{ titles }}>
      {children}
    </ServiceTitleContext.Provider>
  );
};
export const useServiceTitles = () => {
  return useContext(ServiceTitleContext);
};

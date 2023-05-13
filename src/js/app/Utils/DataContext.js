import { createContext } from "react";

const DataContext = createContext({
  data: {},
});

DataContext.displayName = "DataContext";

export default DataContext;

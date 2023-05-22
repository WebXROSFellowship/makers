import { createContext } from "react";

const MenuDataContext = createContext({
    menuData: {},
});

MenuDataContext.displayName = "Menu Data";

export default MenuDataContext;
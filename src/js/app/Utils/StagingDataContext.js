import { createContext } from "react";

const StagingDataContext = createContext({
    stagingData: [],

});

StagingDataContext.displayName = "Staging Data";

export default StagingDataContext;
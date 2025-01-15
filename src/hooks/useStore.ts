import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import RootStore from "../store/RootStore";

const useStore = (): RootStore => useContext(StoreContext);

export default useStore;
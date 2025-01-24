import InformationStore from "./InformationStore";
import UserStore from "./UserStore";

// 전역으로 관리할 state를 담고 있을 객체
export default interface RootStore {
    informationStore: InformationStore;
    userStore: UserStore;
}
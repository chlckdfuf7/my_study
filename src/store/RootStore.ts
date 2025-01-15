import InformationStore from "./InformationStore";

// 전역으로 관리할 state를 담고 있을 객체
export default interface RootStore {
    informationStore: InformationStore;
}
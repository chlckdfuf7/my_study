import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';

// 프로젝트에서 전역으로 관리할 변수들을 저장하는 store
// 각 페이지 별 필요한 정보들을 각각의 context로 분리해서 관리할 필요가 있을지 추후 점검 후 필요시 변경하자
class InformationStore {
    @observable
    private page: number;
    
    @observable
    private city: string | undefined;

    private wholeMenu: string[];
    
    public constructor() {
        makeObservable(this);
        this.city = undefined;
        this.page = 0;
        this.wholeMenu = ['홈', '날씨', '주가', '게임', '쇼핑', '블로그'];
    }

    @boundMethod
    public getPage(): number {
        return this.page;
    }

    @boundMethod
    public setPage(idx: number) {
        runInAction(() => this.page = idx);
    }

    @boundMethod
    public getCity(): string | undefined {
        return this.city;
    }

    @boundMethod
    public setCity(name: string) {
        runInAction(() => this.city = name);
    }

    @boundMethod
    public getWholeMenus(): string[] {
        return this.wholeMenu ?? [];
    }
}

export default InformationStore;
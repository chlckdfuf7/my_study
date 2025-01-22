import { action, makeObservable, observable } from "mobx";
import { boundMethod } from 'autobind-decorator';

// 프로젝트에서 전역으로 관리할 변수들을 저장하는 store
// 각 페이지 별 필요한 정보들을 각각의 context로 분리해서 관리할 필요가 있을지 추후 점검 후 필요시 변경하자
class InformationStore {
    @observable
    private page: number;
    
    @observable
    private city: string | undefined;

    @observable
    private favorites: string[];

    private wholeMenu: string[];
    
    public constructor() {
        makeObservable(this);
        this.city = undefined;
        this.page = 0;
        this.favorites = [];
        this.wholeMenu = ['홈', '날씨', '주가', '게임', '쇼핑', '블로그'];
    }

    @boundMethod
    public getPage(): number {
        return this.page;
    }

    @boundMethod
    public setPage(idx: number) {
        this.page = idx;
    }

    @boundMethod
    public getCity(): string | undefined {
        return this.city;
    }

    @boundMethod
    public setCity(name: string) {
        this.city = name;
    }

    @boundMethod
    public getFavorites(): string[] {
        return this.favorites;
    }

    @boundMethod
    public addFavorites(item: string): void {
        this.favorites = [...this.favorites, item];
    }

    @boundMethod
    public deleteFavorite(item: string): void {
        const index = this.favorites.indexOf(item);
        if (index !== -1) {
            this.favorites = [...this.favorites.splice(index, 1)];
        }
    }

    @boundMethod
    public deleteFavorites(items: string[]): void {
        const len = items.length;
        const deleteLookUp = len > 10 ? new Set(items) : items;
        this.favorites = this.favorites.filter(item => len > 10 ? !(deleteLookUp as Set<string>).has(item) : !(deleteLookUp as string[]).includes(item));
    }

    @boundMethod
    public getWholeMenus(): string[] {
        return this.wholeMenu;
    }
}

export default InformationStore;
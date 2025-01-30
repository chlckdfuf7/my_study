import { boundMethod } from "autobind-decorator";
import { makeObservable, observable, runInAction } from "mobx";

export type UserLevel = 
    | "admin"
    | "level3"
    | "level2"
    | "level1"
    | "viewer";

class UserStore {
    @observable
    private userId: string;

    @observable
    private userName: string;

    private userPassword:string;

    @observable
    private userLevel : UserLevel;

    @observable.shallow
    private heartList: number[];

    @observable.shallow
    private bookmarkList: number[];

    @observable.shallow
    private favoriteList: string[];

    constructor() {
        makeObservable(this);
        this.userId = "";
        this.userName = "";
        this.userPassword = "";
        this.userLevel = "viewer" as UserLevel;
        this.heartList = [];
        this.bookmarkList = [];
        this.favoriteList = [];
    }

    @boundMethod
    async fetchUserData(id: string) {
        try {
            const response = await fetch(`http://localhost:5000/userInfo/${id}`);
            const data = await response.json();
            runInAction(() => {
                this.userId = data.userId;
                this.userPassword = data.userPassword;
                this.userName = data.userName;
                this.userLevel = data.userLevel as UserLevel;
                this.favoriteList = data.favorites ?? [];
                this.bookmarkList = data.bookmark ?? [];
                this.heartList = data.heart ?? [];
            });
        } catch (error) {
            console.error("사용자 데이터 가져오기 실패: ", error);
        }
    }

    @boundMethod
    public getUserName(): string {
        return this.userName;
    }

    @boundMethod
    public getUserId(): string {
        return this.userId;
    }

    @boundMethod
    public getHeartList(): number[] {
        return this.heartList;
    }

    @boundMethod
    public setHeartList(newList: number[]): void {
        this.heartList = newList;
    }

    @boundMethod
    public addHeart(postid: number): void {
        this.heartList.push(postid);
    }

    @boundMethod
    public deleteHeart(postid: number): void {
        const idx = this.heartList.indexOf(postid);
        if (idx !== -1)
            this.heartList.splice(idx, 1);
    }

    @boundMethod
    public getBookmarkList(): number[] {
        return this.bookmarkList;
    }

    @boundMethod
    public addBookmark(postId: number) {
        this.bookmarkList.push(postId);
    }

    @boundMethod
    public deleteBookmark(postId: number) {
        const idx = this.bookmarkList.indexOf(postId);
        if (idx !== -1)
            this.bookmarkList.splice(idx, 1);
    }

    @boundMethod
    public getFavoriteList(): string[] {
        return this.favoriteList;
    }

    @boundMethod
    public addFavorite(menu: string) {
        this.favoriteList.push(menu);
    }

    @boundMethod
    public deleteFavorite(menu: string) {
        const idx = this.favoriteList.indexOf(menu);
        if (idx !== -1)
            this.favoriteList.splice(idx, 1);
    }

    @boundMethod
    public deleteFavorites(items: string[]): void {
        const len = items.length;
        const deleteLookUp = len > 10 ? new Set(items) : items;
        this.favoriteList = this.favoriteList.filter(item => len > 10 ? !(deleteLookUp as Set<string>).has(item) : !(deleteLookUp as string[]).includes(item));
    }
}

export default UserStore;
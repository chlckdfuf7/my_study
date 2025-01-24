import { boundMethod } from "autobind-decorator";
import { makeObservable, observable } from "mobx";

export type UserLevel = 
    | "admin"
    | "level3"
    | "level2"
    | "level1"
    | "viewer";

class UserStore {
    private userId: string;

    @observable
    private userName: string;

    private userPassword:string;

    private userLevel : UserLevel;

    @observable.shallow
    private heartList: number[];

    constructor() {
        makeObservable(this);
        this.userId = "admin";
        this.userName = "A";
        this.userPassword = "1234";
        this.userLevel = "admin" as UserLevel;
        this.heartList = [];
    }

    @boundMethod
    public getUserName(): string {
        return this.userName;
    }

    @boundMethod
    public setUserName(name: string) {
        this.userName = name;
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
        const newList = [ ...this.heartList, postid];
        this.heartList = newList;
    }

    @boundMethod
    public deleteHeart(postid: number): void {
        const newList = this.heartList.filter(item => item !== postid);
        this.heartList = newList;
    }
}

export default UserStore;
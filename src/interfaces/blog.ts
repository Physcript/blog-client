import IUser from "./user";


export interface IBlog {
    _id: string,
    title: string,
    author: string | IUser,
    content: string,
    headline: string,
    picture?: string,
    createdAt: string,
    updatedAt: string,
}

export interface IEditBlogPage {
    author: string;
    _id: string,
    title: string,
    content: string,
    headline: string,
    picture?: string,
    createdAt: string,
    updatedAt: string,
}

export default interface IRoute {
    path: string,
    auth: boolean,
    component: any,
    props?: any
}
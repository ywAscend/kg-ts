
interface IState {
    [propsName:string]:any
}

interface ActionParams<T = any> {
    type: string;
    payload: Object<T>
}

interface IData{
    [PropName:string]:any
}

// common tools

export const ImgUrlFilter = (param: string) => param && param.replace("{size}", '400')

export const SortSinger = (data:Array<any>) => {
    if (!data) return []
    let listArr:Array<any> = []
    data.forEach((item:any, index:number) => {
        let obj = []
        for (let i = 0; i < listArr.length; i++) {
            //对比放入相同的字段
            if (listArr[i][0].classname.slice(0, 2) == item.classname.slice(0, 2)) {
                listArr[i].push(item)
                return
            }
        }
        obj.push(item)
        listArr.push(obj)
    });
    return listArr
}
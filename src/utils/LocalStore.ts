/**
 * 封装本地存储方法
 * 
 */
const store = window.sessionStorage

class LocalStroe {

    public static set(key: string, value: any) {
        if (!store) return
        let v = value
        try {
            if (typeof v === 'object') {
                v = JSON.stringify(v)
            }
            store.setItem(key, v)
        } catch (error) {

        }
    }

    public static get(key: string) {
        if (!store) return
        return store.getItem(key)
    }

    public static get2Json(key: string) {
        if (!store) return
        const data = store.get(key)
        if (data) {
            try {
                return JSON.parse(data)
            } catch (error) {

            }
        }
        return null
    }

    public static remove(key: string) {
        if (!store) return
        try {
            store.removeItem(key);
        } catch (error) {

        }
    }

}




export default LocalStroe
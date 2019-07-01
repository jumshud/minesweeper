class LocalStorage
{
    static setItem(key: string, val: any): void {
        let data = JSON.stringify(val);
        localStorage.setItem(key, data);
    }

    static getItem(key: string): any {
        let data = localStorage.getItem(key);
        return data !== null ? JSON.parse(data) : null;
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}

export default LocalStorage;

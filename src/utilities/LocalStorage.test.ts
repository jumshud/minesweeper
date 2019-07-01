import LocalStorage from "./LocalStorage";

describe('Local storage', () => {
    const key = 'storage_key';
    const data = {key: 'Local storage'};

    test('test setItem and getItem methods', () => {
        LocalStorage.setItem(key, data);
        expect(LocalStorage.getItem(key)).toStrictEqual(data);
    });

    test('removeItem method', () => {
        LocalStorage.removeItem(key);
        expect(localStorage.getItem(key)).toBe(null);
    })

    test('clear method', () => {
        LocalStorage.setItem(key, data);
        LocalStorage.clear();
        expect(localStorage.getItem(key)).toBe(null);
    })

});

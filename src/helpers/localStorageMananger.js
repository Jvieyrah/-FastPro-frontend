export class LocalstorageManager {
  static setToken(value) {
    localStorage
        .setItem('userToken', JSON.stringify(value));
    }
    static getToken() {
        return JSON
            .parse(localStorage.getItem('userToken'));
    }   
}
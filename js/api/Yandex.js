/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('token');
    while (token === 'null' || token === null) {
      token = prompt('Введите токен пользователя');
      localStorage.setItem('token', token);
    }
    return token;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    const options = {
      method: 'POST',
      data: url,
      url: this.HOST + `/resources/upload?path=${path}&url=${url}`,
      headers: {
        'Authorization': `OAuth ${this.getToken()}`,
      },
      callback: callback,
    };
    createRequest(options);
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback) {
    const options = {
      method: 'DELETE',
      url: this.HOST + `/resources?path=${path}&permanently=true`,
      headers: {
        'Authorization': `OAuth ${this.getToken()}`,
      },
      callback: callback,
    };
    createRequest(options);
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const options = {
      method: 'GET',
      url: this.HOST + '/resources/files',
      headers: {
        'Authorization': `OAuth ${this.getToken()}`,
      },
      callback: callback,
    };
    createRequest(options);
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const a = document.createElement('a');
    a.href = url;
    a.click();
    a.remove()
  }
}

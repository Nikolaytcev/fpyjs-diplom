/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        options.callback(xhr.response);
      };
  });
    
    try {
        xhr.open( options.method, options.url );
        xhr.setRequestHeader('Authorization', options.headers['Authorization']);
        xhr.send('');
      }
      catch (err) {
        console.error(err);
      }
};

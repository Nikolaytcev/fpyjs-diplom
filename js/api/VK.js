/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback 11624068
 * */

 class VK {
  static ACCESS_TOKEN = '';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback) {
    this.lastCallback = callback;
    let script = document.createElement('SCRIPT');
    script.className = "script__delete";
    const HOST = "https://api.vk.com/method/";
    const method = "photos.get?";
    const params = `owner_id=${id}&album_id=profile&photo_sizes=1&access_token=${this.ACCESS_TOKEN}&v=5.150&callback=VK.processData`
    script.src = HOST + method +params;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  
  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    const list = [];
    document.querySelector('.script__delete').remove();
    if (result.error) {
      alert('Ошибка на VK сервере')
    }
    else {
      result.response.items.forEach(element => {
        const maxHeightlist = [];
        element.sizes.forEach(e => {
          maxHeightlist.push(e.height)
        });
        if (Math.max(...maxHeightlist) == 0) {
          element.sizes.forEach(e => {
            if (e.type == 'z') {list.push(e)}
          });
        }
        else {
          element.sizes.forEach(e => {
            if (e.height == Math.max(...maxHeightlist)) {list.push(e)};
          });
        }
      });
    };
    this.lastCallback(list);
    this.lastCallback = () => {};
  }
}



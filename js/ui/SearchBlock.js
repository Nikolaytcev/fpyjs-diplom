/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */

/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */

class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  checkDigit(insertText) {
    if (insertText !== '') {
      try {
        return insertText.length == insertText.match(/\d/g).length;
      }
      catch {
        this.element.getElementsByTagName('input')[0].value = '';
        alert('id должен состоять из цифер');
      };
    }
    else {
      return false;
    }
  };

  makeRequest(callback) {
    let insertText = this.element.getElementsByTagName('input')[0].value.trim();
      localStorage.setItem('id', insertText)
      if (this.checkDigit(insertText)) {
        VK.get(insertText, callback)
      };
  };

  registerEvents(){
    let callbackAdd = (images) => {new ImageViewer(document.getElementsByClassName('images-wrapper')[0]).drawImages(images)};

    this.element.querySelector('.add').addEventListener('click', () => {
      this.makeRequest(callbackAdd);
    });

    this.element.querySelector('.replace').addEventListener('click', () => {
      new ImageViewer(document.getElementsByClassName('images-wrapper')[0]).clear();
      this.makeRequest(callbackAdd);
    });
  }
}
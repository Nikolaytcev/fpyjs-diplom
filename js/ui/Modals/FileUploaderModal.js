/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.content = this.element[0].querySelector('.content');
    this.closeBtn = this.element[0].querySelector('.close');
    this.xBtn = this.element[0].querySelector('.x');
    this.sendAll = this.element[0].querySelector('.send-all');
    this.registerEvents();
  }
  

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.closeBtn.onclick = () => {
      this.close();
    };

    this.xBtn.onclick = () => {
      this.close();
    };

    this.content.onclick = (e) => {
      if (e.target.type == 'text') {
        e.target.closest('.image-preview-container').classList.remove('error');
      };
      
      if (e.target.classList.contains('upload')) {
        this.sendImage(e.target.closest('.image-preview-container'));
      };
    };

    this.sendAll.onclick = (e) => {
      this.sendAllImages();
    };

  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    let html = [];
    images.reverse().forEach(element => {
      html.push(this.getImageHTML(element.getElementsByTagName('img')[0]))
    });

    html = html.join('');
    this.content.innerHTML = html;
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    const html = `<div class="image-preview-container">
    <img src=${item.src} />
    <div class="ui action input">
    <input type="text" placeholder="Путь к файлу">
    <button class="ui button"><i class="upload icon"></i></button>
    </div>
    </div>`
    return html
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    this.content.querySelectorAll('.image-preview-container').forEach((element) => {
      this.sendImage(element);
    });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    if (imageContainer.getElementsByTagName('input')[0].value == '') {
      return imageContainer.classList.add('error');
    }
    else {
      imageContainer.getElementsByTagName('input')[0].classList.add('disabled');
      const path = imageContainer.getElementsByTagName('input')[0].value;
      const src = imageContainer.getElementsByTagName('img')[0].src;
      const callback = () => {imageContainer.remove()};
      if (Array.from(this.content.querySelectorAll('.image-preview-container')).length == 0) {
        this.close();
      }
      Yandex.uploadFile(path, src, callback);
    };
  };
}
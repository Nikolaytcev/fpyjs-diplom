/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.previewImage = this.element.querySelector('.image');
    this.drawBox = this.element.querySelector('.row');
    this.sendBtn = this.element.querySelector('.send');
    this.selectAll = this.element.querySelector('.select-all');
    this.uploadFiles = this.element.querySelector('.show-uploaded-files');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.drawBox.ondblclick = (e) => {
      this.element.querySelector('.image').src = e.target.src;
    };

    this.drawBox.onclick = (e) => {
      e.target.classList.toggle('selected');
      this.checkButtonText();
    };

    this.selectAll.onclick = () => {
      let selected = 0;
      let images = this.drawBox.querySelectorAll('.image-wrapper');
      images.forEach((e) => {
        if (e.getElementsByTagName('img')[0].classList.contains('selected')) {
          selected++
        };
      });
      if (selected > 0 && selected <= Array.from(images).length) {
        images.forEach((e) => {
          e.getElementsByTagName('img')[0].classList.remove('selected');
        });
      }
      else if (selected == 0){
        images.forEach((e) => {
          e.getElementsByTagName('img')[0].classList.add('selected');
        });
      }
      this.checkButtonText();
    };

    this.sendBtn.onclick = () => {
      let modal = App.getModal('fileUploader');
      let images = [];
      this.drawBox.querySelectorAll('.image-wrapper').forEach((e) => {
        if (e.getElementsByTagName('img')[0].classList.contains('selected')) {
          images.push(e)
        };
      });
      modal.open();
      modal.showImages(images);
    };

    this.uploadFiles.onclick = () => {
      let modal = App.getModal('filePreviewer');
      modal.open();
      const callback = (response) => {modal.showImages(response)};
      Yandex.getUploadedFiles(callback);
    };
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    let imageWrapper = Array.from(this.element.querySelectorAll('.image-wrapper'));
    if (imageWrapper){
      imageWrapper.forEach((e) => {
        e.remove()
      });
    };
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      this.element.querySelector('.select-all').classList.remove('disabled');
      images.forEach(e => {
        let html = `<div class='four wide column ui medium image-wrapper'>
        <img src=${e.url} />
        </div>`
        this.drawBox.innerHTML += html;
      });
    }
    else {
      this.element.querySelector('.select-all').classList.add('disabled');
    };
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    let selected = 0;
    let images = this.drawBox.querySelectorAll('.image-wrapper')
    images.forEach((e) => {
      if (e.getElementsByTagName('img')[0].classList.contains('selected')) {
        selected++;
      };
    });
    selected == Array.from(images).length ? this.selectAll.textContent = 'Снять выделение' : this.selectAll.textContent = 'Выбрать все';
    selected > 0 ? this.sendBtn.classList.remove('disabled') : this.sendBtn.classList.add('disabled');
  }
}
/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal{
  constructor( element ) {
    super(element);
    this.xBtn = this.element[0].querySelector('.x');
    this.content = this.element[0].querySelector('.content');
    this.loading = this.element[0].querySelector('.loading');
    this.registerEvents();

  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.xBtn.onclick = () => {
      this.close();
    };

    this.content.onclick = (e) => {
      if (e.target.classList.contains('delete')) {
        const icon = e.target.querySelector('.trash')
        icon.classList.remove('trash');
        icon.classList.add('spinner');
        icon.classList.add('loading');
        e.target.classList.add('disabled');
        const callback = () => {e.target.closest('.image-preview-container').remove()};
        const path = e.target.getAttribute('data-path')
        Yandex.removeFile(path, callback);
      };
      if (e.target.classList.contains('download')) {
        const url = e.target.getAttribute('data-file');
        Yandex.downloadFileByUrl(url);
      };
    };
  }
  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    let html = [];
    data.items.reverse().forEach(element => {
      html.push(this.getImageInfo(element));
    });
    html = html.join('');
    this.content.innerHTML = html;
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const d = new Date(date);
    return `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()} г. в ${d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes().toString(): d.getMinutes()}`
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const html = `<div class="image-preview-container">
    <img src=${item.file} />
    <table class="ui celled table">
    <thead>
      <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
    </thead>
    <tbody>
      <tr><td>${item.name}</td><td>${this.formatDate(item.modified)}</td><td>${(item.size/1000).toFixed(1)}Кб</td></tr>
    </tbody>
    </table>
    <div class="buttons-wrapper">
      <button class="ui labeled icon red basic button delete" data-path=${item.path}>
        Удалить
        <i class="trash icon"></i>
      </button>
      <button class="ui labeled icon violet basic button download" data-file=${item.file}>
        Скачать
        <i class="download icon"></i>
      </button>
    </div>
  </div>`;
  return html;
  }
}

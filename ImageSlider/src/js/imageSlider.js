export default class ImageSlider {
  #currentPosition = 0; // 현재 포지션

  #slideNumber = 0; // 슬라이드 개수

  #sliderWidth = 0; // 슬라이드의 넓이

  #intervalId;

  #autoPlay = true; // boolean

  sliderWrapEl; // sliderWrap

  sliderListEl; // sliderWrap > sliderList

  nextBtnEl; // sliderWrap > nextBtn

  previousBtnEl; // sliderWrap > previousBtn

  controlWrapEl;

  constructor() {
    this.assginElement(); // El 할당
    this.initSliderNumber(); // 이미지 슬라이더를 구성하는 슬라이드의 개수
    this.initSlideWidth(); // 슬라이드의 넓이
    this.initSliderListWidth(); // 이미지 슬라이더의 넓이
    this.addEvent();
    this.createIndicator(); // 인디케이터 동적 생성 함수
    this.setIndicator(); // 인디케이터 활성화 함수
    this.initAutoplay();
  }

  assginElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicaterWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#sliderWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#slideNumber * this.#sliderWidth
    }px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicaterWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoplay();
    } else if (event.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#sliderWidth
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#sliderWidth
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicaterWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicaterWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicaterWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#currentPosition * this.#sliderWidth
      }px`;
      this.setIndicator();
    }
  }
}

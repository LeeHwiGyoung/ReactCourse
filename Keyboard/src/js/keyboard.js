export class Keyboard {
  #switchEl; //#을 붙이면 private 속성이 됨
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById('container');
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector('#input');
  }

  #addEvent(){
    this.#switchEl.addEventListener("change",this.#onChangeTheme);
    this.#fontSelectEl.addEventListener('change',this.#onChangeFont);    
    this.#inputEl.addEventListener("input",this.#onInput);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    document.addEventListener("mousedown", this.#onChangeMouseDown.bind(this));
    document.addEventListener('mouseup', this.#onChangeMouseUp.bind(this));
  }

  #onChangeMouseDown(event){
    if(this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest('div.key')?.classList.add("active");
  }

  #onChangeMouseUp(event){
    if(this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest('div.key');
    const isActive = !!keyEl?.classList.contains('active'); //!! bool 값으로 타입캐스팅
    const val = keyEl?.dataset.val;
    if(isActive&&!!val &&val !== "Space" && val !== "Backspace"){
        this.#inputEl.value += val;
    }
    if(isActive && val === "Space"){
        this.#inputEl.value += " ";
    }
    if(isActive && val === "Backspace"){
        this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active")
  }

  #onKeyDown(event) {
    if(this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
        'error',
        event.key == 'Process'
    )
    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add('active');
    //console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
  }

  #onKeyUp(event) {
    if(this.#mouseDown) return;
    this.#keyPress = false
    this.#keyboardEl?.querySelector(`[data-code=${event.code}]`)?.classList.remove('active');
  }
  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    console.log(event.target.value, event)
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
            "theme",
            event.target.checked ? "dark-mode": ""
    )
  }
  
  #onChangeFont(evnet) {
    document.body.style.fontFamily = event.target.value; //body의 fontFamily를 변경
  }

}

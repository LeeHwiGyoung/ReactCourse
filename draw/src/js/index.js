class DrawingBoard {
  MODE = "NONE";
  IsMouseDown = false;
  eraserColor = "#FFFFFF";
  backgroundColor = "#FFFFFF";
  iSNavigatorVisible = false;
  undoArray = [];
  constructor() {
    this.assginElement();
    this.initContext();
    this.addEvent();
    this.initCanvasBackgroundColor();
  }

  assginElement() {
    this.containerEl = document.getElementById("container");
    this.canvasEl = this.containerEl.querySelector("#canvas");
    this.toolbarEl = this.containerEl.querySelector("#toolbar");
    this.brushEl = this.toolbarEl.querySelector("#brush");
    this.colorPickerEl = this.toolbarEl.querySelector("#colorPicker");
    this.brushPanelEl = this.containerEl.querySelector("#brushPanel");
    this.brushSliderEl = this.brushPanelEl.querySelector("#brushSize");
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector("#brushSizePreview");
    this.eraserEl = this.toolbarEl.querySelector("#eraser");
    this.navigatorEl = this.toolbarEl.querySelector("#navigator");
    this.imgNavEl = this.containerEl.querySelector("#imgNav");
    this.canvasImgEl = this.imgNavEl.querySelector("#canvasImg");
    this.undoEl = this.toolbarEl.querySelector("#undo");
    this.clearEl = this.toolbarEl.querySelector("#clear");
    this.downloadEl = this.toolbarEl.querySelector("#download");
  }

  initContext() {
    this.context = this.canvasEl.getContext("2d");
  }
  initCanvasBackgroundColor() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
  addEvent() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
    this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvasEl.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvasEl.addEventListener("mouseout", this.onMouseOut.bind(this));
    this.brushSliderEl.addEventListener(
      "input",
      this.onChangeBrushSize.bind(this),
    );
    this.colorPickerEl.addEventListener("input", this.onChangeColor.bind(this));
    this.eraserEl.addEventListener("click", this.onClickEraser.bind(this));
    this.navigatorEl.addEventListener(
      "click",
      this.onClickNavigator.bind(this),
    );
    this.undoEl.addEventListener("click", this.onClickUndo.bind(this));
    this.clearEl.addEventListener("click", this.onClickClear.bind(this));
    this.downloadEl.addEventListener("click", this.onClickDownload.bind(this));
  }

  onClickDownload() {
    this.downloadEl.href = this.canvasEl.toDataURL("image/jpeg", 1);
    this.downloadEl.download = "ex.jpeg";
  }
  onClickClear() {
    this.saveState();
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.updateNavigator();
    this.initCanvasBackgroundColor();
  }

  onClickUndo() {
    if (this.undoArray.length === 0) return;
    let previousDataUrl = this.undoArray.pop();
    let previousImg = new Image();
    previousImg.src = previousDataUrl;
    previousImg.onload = () => {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.context.drawImage(
        previousImg,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
      );
    };
  }

  saveState() {
    this.undoArray.push(this.canvasEl.toDataURL());
  }

  updateNavigator(event) {
    if (!this.iSNavigatorVisible) return;
    this.canvasImgEl.src = this.canvasEl.toDataURL();
  }
  onClickNavigator(event) {
    this.iSNavigatorVisible = !event.currentTarget.classList.contains("active");
    event.currentTarget.classList.toggle("active");
    this.imgNavEl.classList.toggle("hide");
    this.updateNavigator();
  }
  onClickEraser(event) {
    const IsActive = event.currentTarget.classList.contains("active");
    this.MODE = IsActive ? "NONE" : "ERASER";
    this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
    this.brushPanelEl.classList.add("hide");
    event.currentTarget.classList.toggle("active");
    this.brushEl.classList.remove("active");
  }
  onMouseOut() {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = false;
    this.updateNavigator();
  }
  onChangeColor() {
    this.brushSizePreviewEl.style.background = event.target.value;
  }
  onChangeBrushSize(event) {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`;
    this.brushSizePreviewEl.style.height = `${event.target.value}px`;
  }

  onMouseDown() {
    if (this.MODE == "NONE") return;
    this.IsMouseDown = true;
    const currentPosition = this.getMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = "round";
    if (this.MODE === "BRUSH") {
      this.context.strokeStyle = this.colorPickerEl.value;
      this.context.lineWidth = this.brushSliderEl.value;
    } else if (this.MODE === "ERASER") {
      this.context.strokeStyle = this.eraserColor;
      this.context.lineWidth = 50;
    }
    this.saveState();
  }

  onMouseUp(event) {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = false;
    this.updateNavigator();
  }

  onMouseMove(event) {
    if (!this.IsMouseDown) return;
    const currentPosition = this.getMousePosition(event);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
  }

  getMousePosition(event) {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  }

  onClickBrush(event) {
    const IsActive = event.currentTarget.classList.contains("active");
    this.MODE = IsActive ? "NONE" : "BRUSH";
    this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
    this.brushPanelEl.classList.toggle("hide");
    event.currentTarget.classList.toggle("active");
    this.eraserEl.classList.remove("active");
  }
}

new DrawingBoard();

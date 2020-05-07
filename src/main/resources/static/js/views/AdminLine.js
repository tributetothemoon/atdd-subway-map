import { EVENT_TYPE } from "../../utils/constants.js";
import {
  subwayLinesTemplate,
  colorSelectOptionTemplate
} from "../../utils/templates.js";
import { subwayLineColorOptions } from "../../utils/defaultSubwayData.js";
import Modal from "../../ui/Modal.js";
import api from "../../api/index.js";

function AdminLine() {
  const $subwayLineList = document.querySelector("#subway-line-list");
  const $subwayLineNameInput = document.querySelector("#subway-line-name");
  const $subwayLineColorInput = document.querySelector("#subway-line-color");
  const $subwayLineFirstTime = document.querySelector("#first-time");
  const $subwayLineLastTime = document.querySelector("#last-time");
  const $subwayLineIntervalTime = document.querySelector("#interval-time");

  const $createSubwayLineButton = document.querySelector(
    "#subway-line-create-form #submit-button"
  );
  const subwayLineModal = new Modal();

  const onShowSubwayLine = event => {
    event.preventDefault();
    if (event.target && event.target.classList.contains("subway-line-item")) {
      const id = event.target.querySelector(".subway-line-id");
      const line = api.line.getBy(id.value);
      line.then(data => {
        const $firstTime = document.querySelector("#selected-first-time");
        const $lastTime = document.querySelector("#selected-last-time");
        const $intervalTime = document.querySelector("#selected-interval-time");
        $firstTime.innerText = data.startTime;
        $lastTime.innerText = data.endTime;
        $intervalTime.innerText = data.intervalTime;
      });
    } else {
      return;
    }
  }

  const initDefaultSubwayLines = () => {
    const lines = api.line.get();
    lines.then(data => data.map(line => {
      $subwayLineList.insertAdjacentHTML("beforeend",subwayLinesTemplate(line));
    }))
  };

  const onCreateSubwayLine = event => {
    event.preventDefault();
    const newSubwayLineData = {
      name : $subwayLineNameInput.value,
      startTime : $subwayLineFirstTime.value,
      endTime : $subwayLineLastTime.value,
      intervalTime : $subwayLineIntervalTime.value,
      bgColor: $subwayLineColorInput.value
    }
    api.line.create(newSubwayLineData).then(() => {
      $subwayLineList.innerHTML = "";
          console.log(initDefaultSubwayLines);
          initDefaultSubwayLines();
          subwayLineModal.toggle();
          $subwayLineNameInput.value = "";
          $subwayLineColorInput.value = "";
          $subwayLineFirstTime.value = "";
          $subwayLineLastTime.value = "";
          $subwayLineIntervalTime.value ="";
    });
  };

  const onDeleteSubwayLine = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      $target.closest(".subway-line-item").remove();
    }
  };

  const onUpdateSubwayLine = event => {
    const $target = event.target;
    const isUpdateButton = $target.classList.contains("mdi-pencil");
    if (isUpdateButton) {
      subwayLineModal.toggle();
    }
  };

  const onEditSubwayLine = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-pencil");
  };


  const initEventListeners = () => {
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onDeleteSubwayLine);
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onUpdateSubwayLine);
    $createSubwayLineButton.addEventListener(
      EVENT_TYPE.CLICK,
      onCreateSubwayLine
    );
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onShowSubwayLine);
  };

  const onSelectColorHandler = event => {
    event.preventDefault();
    const $target = event.target;
    if ($target.classList.contains("color-select-option")) {
      document.querySelector("#subway-line-color").value =
        $target.dataset.color;
    }
  };

  const initCreateSubwayLineForm = () => {
    const $colorSelectContainer = document.querySelector(
      "#subway-line-color-select-container"
    );
    const colorSelectTemplate = subwayLineColorOptions
      .map((option, index) => colorSelectOptionTemplate(option, index))
      .join("");
    $colorSelectContainer.insertAdjacentHTML("beforeend", colorSelectTemplate);
    $colorSelectContainer.addEventListener(
      EVENT_TYPE.CLICK,
      onSelectColorHandler
    );
  };

  this.init = () => {
    initDefaultSubwayLines();
    initEventListeners();
    initCreateSubwayLineForm();
  };
}

const adminLine = new AdminLine();
adminLine.init();

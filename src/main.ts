import "./sass/style.scss";
import { generator } from "./utils/generator";

import { dnd } from "./utils/dnd";

const root = document.querySelector<HTMLDivElement>("#root");

const dropzone: HTMLElement | void = generator({
  type: "div",
  parent: <HTMLElement>root,
  class: "dropzone",
});
const dragelement: HTMLElement | void = generator({
  type: "div",
  parent: <HTMLElement>dropzone,
  class: "dragelement",
  content: "Drag me!",
  draggable: "true",
});

const dropzone2: HTMLElement | void = generator({
  type: "div",
  parent: <HTMLElement>root,
  class: "dropzone",
});
const dragelement2 = generator({
  type: "div",
  parent: <HTMLElement>dropzone2,
  class: "dragelement",
  content: "Drag me!",
  draggable: "true",
});
const dragelement3 = generator({
  type: "div",
  parent: <HTMLElement>dropzone2,
  class: "dragelement",
  content: "Drag me!",
  draggable: "true",
});

try {
  dnd.init(<HTMLDivElement>root, ".dropzone", ".dragelement");
} catch (error) {
  alert("something went wrong, check console for errors");
  console.log(error);
}

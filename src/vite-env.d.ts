/// <reference types="vite/client" />

// basically a defintion for {}
declare interface basicObject {
  [key: string]: any;
}

// Open definition, only type (div, img, p, h1, ...) is mandatory
declare interface generatorDefs {
  type: string;
  parent?: HTMLElement;
  content?: HTMLElement | string;
  attributes?: basicObject;
  [key: string]: string | basicObject | number | array | undefined;
}

/**
 *
 * This i to generate HTMl elements from definitions in the generatorDefs type.
 *
 * ToDos
 * I don't know at the moment.
 * currently it just handels everything as attributes apart from type, parent and content
 * which is technicaly correct
 *
 */

export const generator = (defs: generatorDefs): HTMLElement | void => {
  if (defs["type"] === null) return;
  // element type must be defined
  let element: HTMLElement = document.createElement(defs.type);

  Object.keys(defs).forEach((key) => {
    if (key === "type" || defs[key] === undefined || defs[key] === null) return;

    // if element parent is defined append element to parent
    // parent must be an HTMLElement
    if (key === "parent") {
      if (defs.parent !== undefined) {
        const parent = <HTMLElement>defs.parent;
        parent.appendChild(element);
      }
      return;
    }
    // ------------------------------------------------
    // ELEMENT CONTENT
    // If content is defined insert it into element
    // If content is a string insert it as innerHTML
    // else assume it is an HTMLElement and append it
    if (key === "content") {
      if (defs.content !== undefined) {
        if (typeof defs.content === "string") {
          element.innerHTML = defs.content;
          return;
        }
        const content = <HTMLElement>defs.content;
        element.appendChild(content);
      }
      return;
    }
    // ------------------------------------------------// ------------------------------------------------
    // ELEMENT CONTENT
    // If content is defined insert it into element
    // If content is a string insert it as innerHTML
    // else assume it is an HTMLElement and append it
    if (key === "events") {
      if (defs.events !== undefined) {
        defs.events.forEach((def: basicObject) => {
          element.addEventListener(def.type, def.callback);
        });
      }
      return;
    }
    // ------------------------------------------------

    if (typeof defs[key] === "object") {
      const attributes = <basicObject>defs[key];
      Object.keys(attributes).forEach((attrKey) => {
        element.setAttribute(attrKey, attributes[attrKey]);
      });
      return;
    } else {
      const value = <string>defs[key];
      element.setAttribute(key, value);
      return;
    }
  });

  return element;
};

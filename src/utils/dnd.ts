export const dnd = {
  initStyle: "", // this is a style text, taken from drag element on dragstart, that will be applied via set attribute on drag end, reseting styles to before drag state
  initClickPosition: { left: 0, top: 0 }, // this is the position of the mouse when the user clicked on the element
  ghostElement: HTMLElement, // this is the empty element inserted instead of drag element, it is the same size as the drag element
  init: (root: HTMLDivElement, drop: string, drag: string): void => {
    // in case somebody didn't read the documentation, as short as it is, and root is not a HTMLDivElement end  it
    if (root === undefined || drop === undefined || drag === undefined) return;

    // Add event listeners for all dropzone elements
    root.querySelectorAll(drop).forEach((dropzone) => {
      const zone = <HTMLElement>dropzone; // so typescript doesn't complain
      zone.addEventListener("mouseover", dnd.dropHover);
      zone.addEventListener("mouseout", dnd.dropHover);
    });

    // add event listeners for all dragabble elements
    root.querySelectorAll(drag).forEach((dragElement) => {
      const element = <HTMLElement>dragElement; // so typescript doesn't complain
      element.addEventListener("dragstart", dnd.initDrag);
      element.addEventListener("drag", dnd.dragging)
      element.addEventListener("dragend", dnd.endDrag);
    });
    // ------------------------------------------------------------
    // This removes default ghost image of dragged element
    document.addEventListener("dragstart", function( event ) {
      var img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      event.dataTransfer?.setDragImage(img, 0, 0);
    }, false);
    console.log("init");
    
  },
  initDrag: (e: MouseEvent): void => {
    const dragElement = <HTMLElement>e.target;
    const originalStyle = <basicObject>dragElement?.style;
    Object.keys(originalStyle).map (key =>
    {
      if (originalStyle.key !== undefined && originalStyle.key !== "" && originalStyle.key !== null) dnd.initStyle += key + ":" + originalStyle.key + ", ";
    });
    const rect = dragElement.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.
    dragElement.style.transformOrigin = x + "px " + y + "px"; // set transform origin on cursor position for any transform applied to drag
    dnd.initClickPosition = { left: x, top: y };
    dragElement.classList.add("dragging");
    
    console.log("initDrag");
  },
  dragging: (e:MouseEvent): void => {
    const dragElement = <HTMLElement>e.target;
    dnd.insertGhost(dragElement);
    dragElement.style.left = e.clientX - dnd.initClickPosition.left + "px";
    dragElement.style.top = e.clientY - dnd.initClickPosition.top + "px";
  },
  endDrag: (e: MouseEvent): void => {
    const dragElement = <HTMLElement>e.target;
    dragElement.setAttribute( "style" , dnd.initStyle );
    dnd.initStyle = ""
    dragElement.classList.remove("dragging");
    console.log("endDrag");
  },
  // --------------------------------------------------------------
  // 
  initDrop: (e: MouseEvent): void => {
    const dropElement = <HTMLElement>e.target;
    console.log("initDrop");
  },
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // This initiates the hover state on dropzone element
  // basically, whatever happens when you hover over dropzone element
  // goes here
  dropHover: (e: MouseEvent): void => {
    const dropTarget = <HTMLElement>e.target;
    //console.log("dropHover");
  },
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // this return DOM state after hover is done over dropzone
  endHover: (e: MouseEvent): void => {
    const dropTarget = <HTMLElement>e.target;
    //console.log("endHover");
  },
  // --------------------------------------------------------------
  // -------------------------------------------------------------
  // this inserts an empty element before given element
  insertGhost: (originalElement: HTMLElement): void =>
  {
    if (!originalElement.parentNode) return; // i know the parent element exists, but typescript doesn't know that
    const ghost = document.createElement("div");
    ghost.classList.add("ghost");
    ghost.setAttribute ("style", "width: " + originalElement.clientWidth + "px; height: " + originalElement.clientHeight + "px; padding: px; margin: ");
    originalElement.parentNode.insertBefore(ghost, originalElement);
    originalElement.style.display = "none";
    console.log("insertGhost");
  }
  // --------------------------------------------------------------
};

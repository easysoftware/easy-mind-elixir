let createButton = (id, name, native = true) => {
  let button = document.createElement("span");
  button.id = id;
  if (native) {
    button.innerHTML = `<svg class='icon' aria-hidden='true'>
    <use xlink:href='#icon-${name}'></use>
  </svg>`;
    return button;
  }
  button.innerHTML = `<span class='icon-${name}'></span>`;
  return button;
};

let createSeparator = () => {
  let separator = document.createElement("span");
  separator.classList.add("toolbar-vertical-separator");
  return separator;
};

function createToolBarRTContainer(mind) {
  let toolBarRTContainer = document.createElement("toolbar");
  let hi = createButton("hint", "question", false);
  let li2 = createSeparator();
  let ex = createButton("export", "print", false);
  let li1 = createSeparator();
  let fc = createButton("fullscreen", "full");
  let gc = createButton("toCenter", "living");
  let zo = createButton("zoomout", "move");
  let zi = createButton("zoomin", "add");
  let percentage = document.createElement("span");
  percentage.innerHTML = "100%";
  toolBarRTContainer.appendChild(hi);
  toolBarRTContainer.appendChild(li2);
  toolBarRTContainer.appendChild(ex);
  toolBarRTContainer.appendChild(li1);
  toolBarRTContainer.appendChild(fc);
  toolBarRTContainer.appendChild(gc);
  toolBarRTContainer.appendChild(zo);
  toolBarRTContainer.appendChild(zi);
  // toolBarRTContainer.appendChild(percentage)
  toolBarRTContainer.className = "rt";
  fc.onclick = () => {
    if (mind.customFullscreenTrigger) {
      mind.customFullscreenTrigger();
    } else {
      mind.container.requestFullscreen();
    }
  };
  gc.onclick = () => {
    mind.toCenter();
  };
  zo.onclick = () => {
    if (mind.scaleVal < 0.6) return;
    mind.scale((mind.scaleVal -= 0.2));
  };
  zi.onclick = () => {
    if (mind.scaleVal > 1.6) return;
    mind.scale((mind.scaleVal += 0.2));
  };
  ex.onclick = () => {
    mind.bus.fire("export");
  };
  hi.onclick = () => {
    mind.bus.fire("hint");
  };
  return toolBarRTContainer;
}

function createToolBarLTContainer(mind) {
  let toolBarLTContainer = document.createElement("toolbar");
  let l = createButton("tbltl", "left");
  let r = createButton("tbltr", "right");
  let s = createButton("tblts", "side");

  toolBarLTContainer.appendChild(l);
  toolBarLTContainer.appendChild(r);
  toolBarLTContainer.appendChild(s);
  toolBarLTContainer.className = "lt";
  l.onclick = () => {
    mind.initLeft();
  };
  r.onclick = () => {
    mind.initRight();
  };
  s.onclick = () => {
    mind.initSide();
  };
  return toolBarLTContainer;
}

export default function(mind) {
  mind.container.append(createToolBarRTContainer(mind));
  mind.container.append(createToolBarLTContainer(mind));
}

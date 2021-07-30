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
  separator.classList.add("toolbar-vertical-separator")
  return separator;
};

function createToolBarRBContainer(mind) {
  let toolBarRBContainer = document.createElement("toolbar");
  let ex = createButton("export", "print", false);
  let li = createSeparator();
  let fc = createButton("fullscreen", "full");
  let gc = createButton("toCenter", "living");
  let zo = createButton("zoomout", "move");
  let zi = createButton("zoomin", "add");
  let percentage = document.createElement("span");
  percentage.innerHTML = "100%";
  toolBarRBContainer.appendChild(ex);
  toolBarRBContainer.appendChild(li);
  toolBarRBContainer.appendChild(fc);
  toolBarRBContainer.appendChild(gc);
  toolBarRBContainer.appendChild(zo);
  toolBarRBContainer.appendChild(zi);
  // toolBarRBContainer.appendChild(percentage)
  toolBarRBContainer.className = "rb";
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
    mind.bus.fire("export")
  };
  return toolBarRBContainer;
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

export default function (mind) {
  mind.container.append(createToolBarRBContainer(mind));
  mind.container.append(createToolBarLTContainer(mind));
}

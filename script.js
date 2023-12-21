function updateColors(colors = []) {
  const colorsDefaults = {
    bgNav: "#000035",
    bgItem: "#062863",
    bgDrop: "#1c4c96",
    colNav: "#607ec9",
    colItem: "#9ab4ff",
    colDrop: "#9ab4ff"
  };

  var sheets = document.styleSheets;

  const rootStyle = sheets[0];
  rootStyle.insertRule(":root {}", 0);

  const rootVariables = rootStyle.cssRules[0].style;

  const colorKeys = Object.keys(colorsDefaults);

  colorKeys.forEach((key, index) => {
    const colorValue = colors[index] || colorsDefaults[key];
    rootVariables.setProperty(`--${key}`, colorValue);
  });
}

function updateColorsStr(colors = []) {
  const colorsDefaults = {
    bgNav: "#000035",
    bgItem: "#062863",
    bgDrop: "#1c4c96",
    colNav: "#fff",
    colItem: "#9ab4ff",
    colDrop: "#607ec9"
  };

  const colorKeys = Object.keys(colorsDefaults);
  
  var strColors = "";

  colorKeys.forEach((key, index) => {
    const colorValue = colors[index] || colorsDefaults[key];
    strColors += "--{key}:{color};\n".replace("{key}", key).replace("{color}", colorValue);
  });

  console.log(strColors);
  return ":root {\n" + strColors + "\n}"
}

function agregarEstilo(cssText) {
  const estilo = document.createElement("style");
  estilo.type = "text/css";

  if (estilo.styleSheet) {
    estilo.styleSheet.cssText = cssText;
  } else {
    estilo.appendChild(document.createTextNode(cssText));
  }
  document.head.appendChild(estilo);
}

function generateNavbar(options) {
  const navStyle = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

{color}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

/* UTILITIES */
a {
  text-decoration: none;
}

li {
  list-style: none;
}

.show {
}

.hide {
  display: none;
}
/* NAVBAR STYLING STARTS */
.navbar {
  display: flex;
  align-items: center;
  
  padding: 20px;
  background-color: var(--bgNav);
  color: var(--colNav);
}

.nav-links a {
  color: var(--colItem);
}

/* LOGO */
.logo {
  font-size: 32px;
}

/* NAVBAR MENU */
.menu {
  display: flex;
  top:86px;
  gap: 1em;
  font-size: 18px;
}

.menu li:hover {
  background-color: var(--bgItem);
  border-radius: 5px;
  transition: 0.3s ease;
}

.menu li {
  padding: 5px 24px;
}

/* DROPDOWN MENU */
.liDropdown {
  position: relative; 
}

.dropdown {
  background-color: var(--bgDrop);
  padding: 1em 0;
  position: absolute; /*WITH RESPECT TO PARENT*/
  display: none;
  border-radius: 8px;
  top: 35px;
}

.dropdown li + li {
  margin-top: 10px;
}

.dropdown li {
  padding: 0.5em 1em;
  width: 8em;
  text-align: center;
}

.dropdown li:hover {
  background-color: var(--bgDrop);
}

.liDropdown:hover .dropdown {
  display: block;
}

/* RESPONSIVE NAVBAR MENU STARTS */

/* CHECKBOX HACK */
input[type=checkbox] {
  display: none;
} 

/* HAMBURGER MENU */
.hamburger {
  display: none;
  font-size: 24px;
  user-select: none;
  justify-content: space-between;
}

/* APPLYING MEDIA QUERIES */
@media (max-width: 880px) {
 .menu {
    display:none;
    position: absolute;
    background-color: var(--bgItem);
    right: 0;
    left: 0;
    padding: 16px 0 24px 0;
   border:2px solid var(--bgItem);
  }

  .menu li:hover {
    display: inline-block;
    background-color: var(--bgItem);
    
    color: var(--colItem);
    transition: 0.3s ease;
  }
.menu li a:hover {
  color: var(--colItem);
  }
  
  .menu li + li {
    margin-top: 12px;
  }
  
  .nav-links .dropdown a {
  color: var(--colItem);
}
  
  input[type=checkbox]:checked ~ .menu {
    display: block;
  }

  .hamburger {
    display: block;
    float:right;
  }

  .dropdown {
    left: 50%;
    top: 30px;
    transform: translateX(35%);
  }

  .dropdown li:hover {
    background-color: var(--bgDrop);
    color: var(--colDrop);
  }
  .dropdown li a:hover {
    background-color: var(--bgDrop);
    color: var(--colDrop);
  }
}`;

  agregarEstilo(navStyle.replace("{color}", updateColorsStr([])));
  
  const navLi = `<li class="{class}">{element}</li>`;
  const navAnchor = `<a href="{href}">{text}</a>`;
  const navDrop = `<ul class="dropdown">{items}</ul>`;

  const navHtml = `<nav class="navbar">
    <!-- LOGO -->
    <div class="logo">{title}</div>

    <!-- NAVIGATION MENU -->
    <ul class="nav-links">

      <!-- USING CHECKBOX HACK -->
      <input type="checkbox" id="checkbox_toggle" />
      <label for="checkbox_toggle" class="hamburger">&#9776;</label>

      <!-- NAVIGATION MENUS -->
      <div class="menu">
      {item}
      </div>
    </ul>
  </nav>
  `;

  const navbarDataDefault = {
    title: "Mi Navbar",
    items: [
      {
        label: "title",
        link:"#"
        //link: "javascript:someFunction()"
      },
      {
        label: "Servicios",
        link: "#services",
        class: "liDropdown",
        dropitems: [
          {
            label: "Servicio 1",
            link: "#service1"
          },
          {
            label: "Servicio 2",
            link: "#service2"
          }
        ]
      }
    ]
  };

  const data = options || navbarDataDefault;

  var dr, li;

  var txtLst = "";
  data.items.forEach((item) => {
    var anchor = navAnchor
      .replace("{href}", item.link)
      .replace("{text}", item.label);
    dr = "";
    if (item.class === "liDropdown" && item.dropitems) {
      item.dropitems.forEach((dropitem) => {
        dr += navLi
          .replace(
            "{element}",
            navAnchor
              .replace("{href}", dropitem.link)
              .replace("{text}", dropitem.label)
          )
          .replace("{class}", "");
      });
      dr = navDrop.replace("{items}", dr);
    }

    if (!item.class) {
      li = navLi.replace("{class}", "");
    } else {
      li = navLi.replace("{class}", item.class);
    }

    txtLst += li.replace("{element}", anchor + dr);
  });

  var navList = navHtml
    .replace("{title}", data.title)
    .replace("{item}", txtLst);

  document.body.innerHTML = navList + document.body.innerHTML;
}

generateNavbar(navBarData);

//////////////////////////////////////////////////////////////////////////////////////


const lspFn = {
  Funciones: [
    "abs",
    "action_tile",
    "and",
    "aref",
    "append",
    "apply",
    "asin",
    "assoc",
    "atan",
    "atom",
    "car",
    "cdr",
    "cadr",
    "ceiling",
    "chr",
    "close",
    "command",
    "concatenate",
    "cond",
    "cons",
    "cos",
    "defun",
    "delete-file",
    "distance",
    "directory",
    "do",
    "done_dialog",
    "entget",
    "entmake",
    "entnext",
    "entsel",
    "equal",
    "eq",
    "expt",
    "file-length",
    "file-position",
    "file-write-date",
    "find",
    "first",
    "floor",
    "foreach",
    "format",
    "fourth",
    "gcd",
    "gensym",
    "getint",
    "get-internal-real-time",
    "get-internal-run-time",
    "getf",
    "gethash",
    "getkword",
    "getpoint",
    "if",
    "intersection",
    "itoa",
    "initget",
    "lambda",
    "last",
    "length",
    "list",
    "listp",
    "lcm",
    "load_dialog",
    "log",
    "logand",
    "logior",
    "lognot",
    "logxor",
    "loop",
    "macro-function",
    "make-array",
    "make-hash-table",
    "make-symbol",
    "map",
    "mapcar",
    "maphash",
    "max",
    "member",
    "min",
    "mode_tile",
    "mod",
    "nth",
    "not",
    "or",
    "open",
    "parse-integer",
    "peek-char",
    "plusp",
    "position",
    "prin1",
    "princ",
    "print",
    "probe-file",
    "prog1",
    "prog2",
    "progn",
    "quote",
    "prompt",
    "random",
    "random-state",
    "read",
    "read-char",
    "read-from-string",
    "read-line",
    "reduce",
    "remf",
    "remhash",
    "repeat",
    "replace",
    "reverse",
    "round",
    "rtos",
    "search",
    "second",
    "setq",
    "set-difference",
    "setf",
    "sgnth",
    "sin",
    "sort",
    "sqrt",
    "sslength",
    "ssname",
    "ssget",
    "strcat",
    "string",
    "string=",
    "string<",
    "string>",
    "stringp",
    "subsetp",
    "subst",
    "substring",
    "tan",
    "terpri",
    "third",
    "truncate",
    "type",
    "t",
    "union",
    "unload_dialog",
    "unless",
    "untrace",
    "while",
    "write",
    "write-char",
    "write-line",
    "vl-load-com",
    "vlax-ename->vla-object",
    "vla-get-objectname"
  ],
  Exclude: [
    "+",
    "-",
    "*",
    "/",
    "1+",
    "1-",
    "=",
    "/=",
    "<",
    ">",
    "<=",
    ">=",
    "and",
    "max",
    "min",
    "mod",
    "or",
    "t"
  ]
};

function handleFileUpload(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const lispCode = e.target.result;
      document.getElementById("lispCode").value = lispCode;

      var extension = getFile(fileInput.value).toLowerCase();
      if (extension == "lsp") {
        analyzeCode("lisp");
      }
      if (extension == "bas") {
        analyzeCode("vba");
      }
      alert("Archivo cargado " + fileInput.value);
    };

    reader.readAsText(file);
  }
}

function getFile(filePath) {
  return filePath.substr(filePath.lastIndexOf("\\") + 1).split(".")[1];
}

function getPrueba(opc) {
  opc = opc.toLowerCase();
  if (opc == "lisp") {
    document.getElementById("lispCode").value = eliminarComentarios(
      document.getElementById("pruebaLisp").innerText,
      /;.*$/gm
    );
  }
  if (opc == "vba") {
    document.getElementById("lispCode").value = eliminarComentarios(
      document.getElementById("pruebaVBA").innerText,
      /'.*$/gm
    );
  }
  analyzeCode(opc);
}

function analyzeCode(opc) {
  const lispCode = document.getElementById("lispCode").value;

  if (!lispCode.trim()) {
    console.log("Ingresa código Lisp antes de analizar.");
    return;
  }
  opc = opc.toLowerCase();
  if (opc.toLowerCase() == "lisp") {
    //analyzeLispCode(lispCode);
    getFunctionsCode(lispCode, opc);
  }
  if (opc.toLowerCase() == "vba") {
    getFunctionsCode(lispCode, opc);
    //extraeDatosFunc(lispCode, "VBA");
  }
} 

function getFunctionsCode(contenido, opc) {
  var funcionRegExp;
  switch (opc.toLowerCase()) {
    case "vba":
      funcionRegExp = /(?:Function|Sub)\s+(\w+)\s*\(/g;
      break;
    case "lisp":
      funcionRegExp = /(?:\(defun)\s+(\w+)\s*\(/g;
      break;
    default:
      alert(`Sorry, we are out of ${opc}.`);
      return;
  }
  //alert(funcionRegExp);

  let funciones = [];
  let lstFunc = [];
  let llamadasFunciones = {};
  var texto = "";
  let match;
  var arrFunc = [];

  //  const myRe = new RegExp("d(b+)d", "g");
  // const myArray = myRe.exec("cdbbdbsbz");
  // const match = linea.match(/^\s*\(defun\s+([^\s\(\)]+)/);

  while ((match = funcionRegExp.exec(contenido)) !== null) {
    const nombreFuncion = match[1];
    const inicioFuncion = match.index;
    arrFunc.push(nombreFuncion);
    lstFunc.push({
      nombre: nombreFuncion,
      inicio: inicioFuncion,
      final: 0
    });
    funciones.push(nombreFuncion);
  }

  var completo = [];
  for (var i = 0; i < lstFunc.length - 1; i++) {
    lstFunc[i].final = lstFunc[i + 1].inicio;
    completo.push({
      nombre: lstFunc[i].nombre,
      cuerpo: contenido.substring(lstFunc[i].inicio, lstFunc[i].final).trim(),
      llamadas: 0,
      recibidas: 0
    });
  }

  completo.push({
    nombre: lstFunc[i].nombre,
    cuerpo: contenido.substring(lstFunc[i].inicio, contenido.length).trim(),
    llamadas: 0,
    recibidas: 0
  });

  lstFunc[i].final = contenido.length;

  for (var i = 0; i < completo.length; i++) {
    const resultados = encontrarLlamadasFuncion(
      completo[i].cuerpo,
      funciones,
      completo[i].nombre
    );

    completo[i].llamadas = resultados;
  }

  console.log("Nombres encontrados:", arrFunc);
  document.getElementById("analysisResult").value =
    JSON.stringify(arrFunc, null, 2) + JSON.stringify(completo, null, 2);

  showGraph([arrFunc, completo]);
}

function aumentaFuncionPorNombre(nombreBuscado, funciones) {
  for (var i = 0; i < funciones.length; i++) {
    if (funciones[i].nombre === nombreBuscado) {
      funciones[i].recibidas = funciones[i].recibidas + 1;
    }
  }
  // Si no se encuentra ninguna función con el nombre proporcionado, puedes devolver null o manejarlo de la manera que desees.
  return null;
}

function obtenerNombresDesdeJSON(json) {
  const nombres = [];

  json.forEach((obj) => {
    if ("nombre" in obj) {
      nombres.push(obj.nombre);
    }

    if ("llamadas" in obj && Array.isArray(obj.llamadas)) {
      obj.llamadas.forEach((llamada) => {
        if (llamada === "nombre") {
          nombres.push(llamada);
        }
      });
    }
  });

  return nombres;
}

function eliminarComentarios(texto, ident) {
  let textoSinComentarios = texto.replace(ident, "");
  textoSinComentarios = eliminaLineaVacia(textoSinComentarios);
  return textoSinComentarios;
}
function eliminaLineaVacia(texto) {
  // Dividir el texto en líneas
  const lineas = texto.split("\n");

  // Filtrar las líneas vacías y mantener la última
  const lineasNoVacias = lineas.filter(
    (linea, index) => index === lineas.length - 1 || linea.trim() !== ""
  );

  // Unir las líneas de nuevo
  const textoResultado = lineasNoVacias.join("\n");

  return textoResultado;
}

function procesarTexto(texto) {
  // Dividir el texto en líneas
  let lineas = texto.split("\n");

  // Filtrar las líneas, eliminando aquellas que comienzan con "'"
  let lineasFiltradas = lineas.map((linea) => {
    if (linea.trim().startsWith("'")) {
      // Envolver el contenido eliminado en un span rojo
      return `<span style="color: red;">${linea}</span>`;
    } else {
      return linea;
    }
  });

  // Unir las líneas restantes de nuevo en un solo texto
  let textoProcesado = lineasFiltradas.join("\n");

  return textoProcesado;
}

const llamadaFuncionRegExp = /\bCall\s+(\w+)\s*\(/g;

function convertirATexto(datos, sep) {
  function procesarNivel(nivel) {
    if (Array.isArray(nivel)) {
      return nivel.map(procesarNivel).join(sep);
    } else if (typeof nivel === "object" && nivel !== null) {
      const valores = Object.values(nivel).map(procesarNivel);
      return valores.join(sep);
    } else {
      return nivel;
    }
  }
  return procesarNivel(datos);
}

function encontrarLlamadasFuncion(textoPrincipal, arrayDeTextos, textoExcluir) {
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Filtrar el array de textos excluyendo el texto específico
  const textosFiltrados = arrayDeTextos.filter(
    (texto) => texto !== textoExcluir
  );
  const regex = new RegExp(textosFiltrados.map(escapeRegExp).join("|"), "gi");
  const coincidencias = textoPrincipal.match(regex);

  const result = coincidencias ? [...new Set(coincidencias)] : [];

  return result;
}

const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);

function createStep(x, y, text) {
  return new shapes.standard.Path({
    position: { x, y },
    size: { width: 100, height: 60 },
    z: 1,
    attrs: {
      body: {
        class: "jj-step-body",
        d: `M 0 ${bevel} ${bevel} 0 calc(w-${bevel}) 0 calc(w) ${bevel} calc(w) calc(h-${bevel}) calc(w-${bevel}) calc(h) ${bevel} calc(h) 0 calc(h-${bevel}) Z`
      },
      label: {
        ...fontAttributes,
        class: "jj-step-text",
        text,
        textWrap: {
          width: -spacing,
          height: -spacing
        }
      }
    }
  });
}

function jointRectOptions(d) {
  return {
    position: { x: d.xNod, y: d.yNod },
    size: {
      width: d.textoNod.length * 15,
      height: 50
    },
    attrs: {
      body: {
        fill: d.cFondo,
        rx: 5,
        ry: 5,
        strokeWidth: 2
      },
      label: {
        text: d.textoNod,
        fill: "white",
        fontSize: 18,
        fontWeight: "bold"
      }
    }
  };
}

function jointLinkOptions(d) {
  return {
    connector: { name: "jumpover", args: { type: "gap", size: 10 } },
    // router:'orthogonal', { elementPadding: 10 },
    // type:"gap",
    router: {
      name: "orthogonal",
      args: {
        //excludeEnds: ['source'],
        //excludeTypes: ['myNamespace.MyCommentElement'],
        startDirections: ["bottom"],
        endDirections: ["top"]
      }
    },

    markup: [
      {
        tagName: "path",
        selector: "shadow",
        attributes: {
          fill: "none"
        }
      },
      {
        tagName: "path",
        selector: "line",
        attributes: {
          fill: "none"
        }
      },
      {
        tagName: "text",
        selector: "label"
      }
    ],
    attrs: {
      line: {
        stroke: "#3c4260"
      },
      label: {
        textPath: {
          selector: "line",
          startOffset: "50%"
        },
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        text: d.text, //'Label Along Path',
        fill: "#222",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "fantasy"
      }
    }
  };
}

function ele(t, v) {
  var tx = t;
  switch (t.toLowerCase()) {
    case "p":
      break;
    case "s":
      tx = "span";
      break;
    case "d":
      tx = "div";
      break;
    default:
      alert(`Sorry, we are out of ${t}.`);
      return;
  }
  return `<${tx}>${v}</${tx}>`;
}

function jointLinkOrthoOptions(link2, d) {
  //var link2 = new joint.shapes.standard.Link();
  link2.source(d.nodo1);
  link2.target(d.nodo2);
  link2.vertices([
    new g.Point(250, 100),
    new g.Point(300, 150),
    new g.Point(350, 200)
  ]);
  link2.router("orthogonal");
  link2.connector("rounded");
  link2.attr({
    line: {
      stroke: "gray",
      strokeWidth: 4,
      strokeDasharray: "4 2",
      sourceMarker: {
        type: "image",
        "xlink:href":
          "http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png",
        width: 24,
        height: 24,
        y: -12
      },
      targetMarker: {
        type: "image",
        "xlink:href":
          "http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png",
        width: 24,
        height: 24,
        y: -12
      }
    }
  });

  return link2;
}

var namespace; // = joint.shapes;
var graph;// = new joint.dia.Graph({}, { cellNamespace: namespace });
var paper;

function showGraph(datos) {
  namespace = joint.shapes;

  graph = new joint.dia.Graph({}, { cellNamespace: namespace });
  
  var txt = document.getElementById("datosflow");
  var div = document.getElementById("divflow");
  var txtaux = "";
  var str = "";
  var st2 = "";
  var st3 = "";
  var fn = datos[0];
  var ln = datos[1];
  var el = [];
  var obNodo = {};

  paper = new joint.dia.Paper({
    el: document.getElementById("graph-container"),
    model: graph,
    width: 100 * fn.length,
    height: 50 * fn.length, // height had to be increased
    gridSize: 10,
    drawGrid: true,
    background: {
      color: "rgba(0, 255, 0, 0.3)"
    },
    cellViewNamespace: namespace
  });

  var px, py, dx, dy;
  px = 0;
  py = 0;
  dx = 30;
  dy = 80;

  var colorStd, colorInicial, colorFinal, colorNone;
  colorInicial = "green";
  colorFinal = "red";
  colorNone = "pink";
  colorStd = "blue";
  var colorFondo;

  var posicion = [0, 200, 300, 300];
  var colores = ["green", "blue", "red", "pink"];
  var levels = [[], [], [], []];
  for (var i = 0; i < ln.length; i++) {
    if (ln[i].recibidas == 0 && ln[i].llamadas.length == 0) {
      levels[3].push(ln[i]);
    } else if (ln[i].recibidas == 0 && ln[i].llamadas.length > 0) {
      levels[0].push(ln[i]);
    } else if (ln[i].recibidas > 0 && ln[i].llamadas.length == 0) {
      levels[2].push(ln[i]);
    } else {
      levels[1].push(ln[i]);
    }
  }
  console.log("levels ", levels);

  txtaux +=
    "ln.length=" +
    ln.length +
    " L0=" +
    levels[0].length +
    " L1=" +
    levels[1].length +
    " L2=" +
    levels[2].length +
    " L3=" +
    levels[3].length;
  str += ele("p", txtaux);

  var item;
  var cont = 0;
  for (var level = 0; level < levels.length; level++) {
    //st2 = ele("p", "Level=" + level + " obNodo=");
    st3="";
    py = posicion[level];
    for (var level1 = 0; level1 < levels[level].length; level1++) {
      item = levels[level][level1];
      console.log("item", cont, item);
      st3 += ele("s", item.nombre);
  
      obNodo[item.nombre] = new joint.shapes.standard.Rectangle(
        jointRectOptions({
          textoNod: item.nombre,
          xNod: 20 + px,
          yNod: 30 + py,
          cFondo: colores[level]
        })
      );

      cont++;
      px = px + dx + item.nombre.length * 15;
      if (px > 800) {
        py = py + dy;
        px = 0;
      }
//st2 = ele("p", "Level=" + level);
      
    }
    if(level1 > 0) {
    str += ele("p", 
                 ele("p", "Level=" + level)
                 + st3);
      }
  } // for

  paper.setDimensions(px + 150, py + 100);
  paper.translate(25, 25);
  paper.scale(0.9, 0.9);

  let claves = Object.keys(obNodo); // claves = ["nombre", "color", "macho", "edad"]
  str += ele("p", "Object.keys(obNodo)=" + claves.join("_"));

  for (let i = 0; i < claves.length; i++) {
    let clave = claves[i];
    txtaux += " Nodo " + clave + "\n";
    obNodo[clave].addTo(graph);

   // str += ele("p", "Nodo " + clave);
  }

  var link;
  var eli;
  var s, t, p, q;

  txtaux += " ------------------------\n";
  txtaux += " Links: ";
  str += ele("p" ,"Links: ");

  for (var i = 0; i < ln.length; i++) {
    eli = ln[i];
    txtaux += "\nInicio: " + eli.nombre;
    st2 = ele("p", "Inicio: " + eli.nombre);
    if (eli.llamadas.length > 0) {
      s = eli.nombre;
      p = fn.indexOf(s);
      txtaux += " (nodo " + p + ") " + eli.llamadas + "\n";
      st2 += ele("p", "(nodo " + p + ") " + eli.llamadas);
      if (p > -1) {
        for (var j = 0; j < eli.llamadas.length; j++) {
          q = fn.indexOf(eli.llamadas[j]);
          if (q > -1) {
            txtaux += " -> " + eli.llamadas[j] + " (nodo " + q + ") ";
            link = new joint.shapes.standard.Link(
              jointLinkOptions({ text: j })
            );
            link.source(obNodo[eli.nombre]);
            link.target(obNodo[eli.llamadas[j]]);
            st2 += ele(
              "p",
              "link obNodo[" +
                eli.nombre +
                "] -> obNodo[" +
                eli.llamadas[j] +
                "]"
            );
            link.addTo(graph);
          }
        }
      }
    }
    str += st2;
  }

  txt.value = txtaux;
  div.innerHTML = str;
}
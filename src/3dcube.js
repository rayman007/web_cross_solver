var camera, scene, renderer;
var mesh;
var controls;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var INTERSECTED;
var mouse_moved = false;

var mycube = new Cube();

var side_cubies_list = [

  ["UL", "LUC"],
  ["UR", "RUC"],
  ["UUC", "BUC"],
  ["UDC", "FUC"],

  ["DL", "LDC"],
  ["DR", "RDC"],
  ["DUC", "FDC"],
  ["DDC", "BDC"],

  ["LL", "BR"],
  ["LR", "FL"],

  ["RL", "FR"],
  ["RR", "BL"]

];

var side_cubies_colors = [

  ["W", "R"],
  ["W", "G"],
  ["W", "O"],
  ["W", "B"]
];

var current_side_cubie = 0;
var list_side_cubie = [];

var color_dict = {
  Y: 0xFFFF00,
  W: 0xFFFFFF,
  R: 0xFF0000,
  O: 0xFF8800,
  G: 0x00FF00,
  B: 0x0000FF
};


var rubiks_face_data = [{
    x: -20,
    y: -20,
    name: "DL"
  },
  {
    x: 0,
    y: -20,
    name: "DC"
  },
  {
    x: 20,
    y: -20,
    name: "DR"
  },
  {
    x: -20,
    y: 0,
    name: "L"
  },
  {
    x: 0,
    y: 0,
    name: "C"
  },
  {
    x: 20,
    y: 0,
    name: "R"
  },
  {
    x: -20,
    y: 20,
    name: "UL"
  },
  {
    x: 0,
    y: 20,
    name: "UC"
  },
  {
    x: 20,
    y: 20,
    name: "UR"
  },
];

var rubiks_data = [

  // U Face
  {
    faceName: "U",
    faceColor: "Y",
    faceRotation: {
      x: -1.0,
      y: 0.0,
      z: 0.0
    },
    facePosition: 30
  },
  // D Face
  {
    faceName: "D",
    faceColor: "W",
    faceRotation: {
      x: 1.0,
      y: 0.0,
      z: 0.0
    },
    facePosition: +30
  },
  // L Face
  {
    faceName: "L",
    faceColor: "R",
    faceRotation: {
      x: 0.0,
      y: -1.0,
      z: 0.0
    },
    facePosition: 30
  },
  // R Face
  {
    faceName: "R",
    faceColor: "O",
    faceRotation: {
      x: 0.0,
      y: 1.0,
      z: 0.0
    },
    facePosition: +30
  },
  // B Face
  {
    faceName: "B",
    faceColor: "B",
    faceRotation: {
      x: 0.0,
      y: 2.0,
      z: 0.0
    },
    facePosition: 30
  },
  // F Face
  {
    faceName: "F",
    faceColor: "G",
    faceRotation: {
      x: 0.0,
      y: 0.0,
      z: 0.0
    },
    facePosition: 30
  }

];

var colorList = [
  0, 0xFFFF00, 0xFFFFFF, 0xFF0000, 0xFF8800, 0x00FF00, 0x0000FF, 0
]

var cubie3d_list = {};

var counter = 0;

var solutions = [];

function init() {

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setSize( 800, 600 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  //camera = new THREE.PerspectiveCamera( 75, 800 / 600, 1, 1000 );
  camera.position.x = -75;
  camera.position.y = -75.0;
  camera.position.z = 75.0;



  for (const f of rubiks_data) {

    for (const c of rubiks_face_data) {

      var geometry = new THREE.BoxBufferGeometry(20, 20, 0);
      var material = new THREE.MeshBasicMaterial({
        color: 0x888888
      });
      var meshbg = new THREE.Mesh(geometry, material);
      meshbg.rotateX(f.faceRotation.x * Math.PI / 2);
      meshbg.rotateY(f.faceRotation.y * Math.PI / 2);
      meshbg.rotateZ(f.faceRotation.z * Math.PI / 2);
      meshbg.translateX(c.x);
      meshbg.translateY(c.y);
      meshbg.translateZ(f.facePosition);

      meshbg.userData = {
        isSticker: false,
        bg: null
      };

      scene.add(meshbg);

      var geometry = new THREE.BoxBufferGeometry(18, 18, 1);
      var material = new THREE.MeshBasicMaterial({
        color: f.faceColor
      });
      if (c.name == "C") {
        material.color.setHex(color_dict[f.faceColor]);
      } else {
        material.color.setHex(0);
      }
      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotateX(f.faceRotation.x * Math.PI / 2);
      mesh.rotateY(f.faceRotation.y * Math.PI / 2);
      mesh.rotateZ(f.faceRotation.z * Math.PI / 2);
      mesh.translateX(c.x);
      mesh.translateY(c.y);
      mesh.translateZ(f.facePosition + 1); //Math.sign(f.facePosition));

      mesh.userData = {
        isSticker: true,
        bg: meshbg,
        cubieName: f.faceName + c.name
      };
      cubie3d_list[f.faceName + c.name] = mesh;

      scene.add(mesh);

    }

  }


  //var axesHelper = new THREE.AxesHelper( 50 );
  //scene.add( axesHelper );

  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false
  controls.enableDamping = false;
  controls.minDistance = 75.0;
  controls.maxDistance = 250.0;

  controls.update();


  //

  renderer.domElement.addEventListener('resize', onWindowResize, false);
  renderer.domElement.addEventListener('mousemove', onMouseMove, false);
  renderer.domElement.addEventListener('mouseup', onMouseClick, false);
  renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
  renderer.domElement.addEventListener('touchstart', onMouseDown, false);
  renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
  //renderer.domElement.addEventListener('keypress', onKeyPress, false);
  document.addEventListener('keypress', onKeyPress, false);
  document.getElementById("undo_button").addEventListener('click', undo, false);
  window.requestAnimationFrame(render);
}

function findPartnerCid(cid) {
  for (const pair of side_cubies_list) {
    if (pair[0] == cid) {
      return pair[1];
    }
    if (pair[1] == cid) {
      return pair[0];
    }
  }
}

function onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //mouse.x = ( event.clientX / 800 ) * 2 - 1;
  //mouse.y = - ( event.clientY / 600 ) * 2 + 1;

  mouse_moved = true;

}

function requestCubeUpdate() {

  for (var key in cubie3d_list) {
    var color = mycube.getFace(key);
    cubie3d_list[key].material.color.setHex(color_dict[color]);

  }
  if (current_side_cubie == 1)
    document.getElementById("log").innerHTML = "Place White - Green";
  if (current_side_cubie == 2)
    document.getElementById("log").innerHTML = "Place White - Orange";
  if (current_side_cubie == 3)
    document.getElementById("log").innerHTML = "Place White - Blue";
}

function onKeyPress(e) {
  if (e.code == "KeyU") {
    mycube.doU();
    requestCubeUpdate();
  }
  if (e.code == "KeyR") {
    mycube.doR();
    requestCubeUpdate();
  }
  if (e.code == "KeyL") {
    mycube.doL();
    requestCubeUpdate();
  }
  if (e.code == "KeyD") {
    mycube.doD();
    requestCubeUpdate();
  }
  if (e.code == "KeyF") {
    mycube.doF();
    requestCubeUpdate();
  }
  if (e.code == "KeyB") {
    mycube.doB();
    requestCubeUpdate();
  }

}

function onMouseDown(event) {

  mouse_moved = false;
  counter = 0;

}

function onDocumentTouchEnd(event) {
  event.preventDefault();

  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

  if (counter <= 5) {
    mouse_moved = false;
  } else {
    mouse_moved = true;
  }
  onMouseClick()

}

function onDocumentTouchMove(event) {
  counter = counter + 1;
  event.preventDefault();

  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function instructionHandler(moves) {

  solutions.push(moves);

}

function textviewHandler(msg) {

  //document.getElementById("log").innerHTML += msg + "<br/>";

}

function onMouseClick() {

  if (!mouse_moved) {

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

      if (intersects[0].object.userData.isSticker == true) {


        var cid = intersects[0].object.userData.cubieName;
        var pcid = findPartnerCid(cid);
        if (pcid) {
          mycube.setFace(cid, side_cubies_colors[current_side_cubie][0]);
          mycube.setFace(pcid, side_cubies_colors[current_side_cubie][1]);
          current_side_cubie++;

          if (current_side_cubie == 4) {
            document.getElementById("log").innerHTML = "Computing Solutions, please wait";
            setTimeout(computeSolution, 100);
          }
          list_side_cubie.push(cid);

          requestCubeUpdate();

        }

      }

    }

    renderer.render(scene, camera);

  }
}

function render() {

  camera.updateMatrixWorld();

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {

    if ((INTERSECTED != intersects[0].object) && (intersects[0].object.userData.isSticker == true)) {

      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object.userData.bg;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.setHex(0xAAAAAA);
      //document.getElementById("log").innerHTML = intersects[ 0 ].object.userData.cubieName;

    }

  } else {

    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

    INTERSECTED = null;

  }

  renderer.render(scene, camera);

}

function animate() {

  requestAnimationFrame(animate);
  controls.update();
  render()

}

function computeRollback(solution) {
  var rollback = [];
  for (var i = solution.length - 1; i >= 0 ; i-- ) {
    var move = solution[i];
    var rmove;
    if (move.length == 1) {
      rmove = move[0] + "p";
    } else {
      if (move[1] == "p") {
        rmove = move[0];
      } else {
        rmove = move;
      }
    }
    rollback.push(rmove);
  }
  return rollback;
}

function computeSolution() {

  testSol(mycube, [], instructionHandler, textviewHandler, 0);
  solutions.sort(function(a, b) {
    return a.length - b.length;
  });
  if (solutions.length >= 1) {
    document.getElementById("log").innerHTML = "===  " + solutions[0].length + " moves ===<br/>";
  }
  var current_sol_length = solutions[0].length;
  for (var i = 0; i < Math.min(solutions.length, 10); i++) {
    if (current_sol_length != solutions[i].length) {
      document.getElementById("log").innerHTML += "<br/>===  " + solutions[i].length + " moves ===<br/>";
      current_sol_length = solutions[i].length;
    }
    document.getElementById("log").innerHTML += solutions[i].join(" ") + "<br/>";
  }

  document.getElementById("log").innerHTML += "<br/>===Rollback ===<br/>" + computeRollback(solutions[0]).join(" ") + "<br/>";

}

function undo() {
  var cid = list_side_cubie[current_side_cubie-1];
  var pcid = findPartnerCid(cid);
  mycube.setFace(cid, 'X');
  mycube.setFace(pcid, 'X');
  current_side_cubie--;
  requestCubeUpdate();
}

init();
animate();

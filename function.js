var this_test_variable = 10

// Master function
const createScene = function () {
   const scene = new BABYLON.Scene(engine);

   camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
   camera.attachControl(canvas, true);
   // Choose scale for camera
   const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

   // draw boat
   new_boat = createBoat(scene); // adjust position along x and z ???
   new_boat.position.x = 3
   //combine meshs https://playground.babylonjs.com/#INZ0Z0#59
					
   // Split over multiple functions ???... depends on application
			
   var unitVec = new BABYLON.Vector3(1, 1, 1); // used for scale
			
   //Read coordinates from file ??? 
   box = []
   for (i = 0; i < 3; ++i) {
      box.push(BABYLON.MeshBuilder.CreateBox("box", {}))
      box[i].scaling = unitVec.scale(1);
			  
      // Location of box
      box[i].position.y = 0.5 //How to make units mm or have a conversion factor ???
      box[i].position.x = Math.random()*5;
      box[i].position.z = Math.random()*this_test_variable; //testing function.js file
			  
      // Material property assignment
      var material = new BABYLON.StandardMaterial(scene); 
      material.alpha = 0.3;
      material.diffuseColor = new BABYLON.Color3(0,Math.random(),Math.random()); //RGB
      box[i].material = material;
   }
			
   const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}); // Create ground plane
	
   //==============Interface=============
   //====================================
   //Select mesh
   var selected_pointer = 0; // Selected box // or initalise as null
   var selected = null;
   scene.onPointerObservable.add(function(evt){
      if(selected && selected.material !== null ) { // checsk if the selected is valid rather than dragged
         selected.material.diffuseColor = BABYLON.Color3.Gray();
         selected = null;
      }
      if(evt.pickInfo.hit && evt.pickInfo.pickedMesh && evt.event.button === 0){
         selected = evt.pickInfo.pickedMesh;
         if (evt.pickInfo.pickedMesh.material !== null) { // check if the selected is valid rather than dragged
            evt.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Green(); //Why cant this be rgb ??? // Also bugs if clicks odd... (Cannot set property 'diffuseColor' of null)
		    selected_pointer = evt.pickInfo.pickedMesh;
            var tmp_value = Math.round(evt.pickInfo.pickedMesh.scaling.x * 10) / 10;
            button1.textBlock.text = tmp_value.toString(); //displays scale on textbox
			slider.value = tmp_value; // positions the slider to the right location
         }
      }
   }, BABYLON.PointerEventTypes.POINTERUP);
			
   // Slider
   //sphere.scaling = unitVec.scale(5);
   //var memory_value = 1
   var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
   var slider = new BABYLON.GUI.Slider();
   slider.minimum = 0.1;
   slider.maximum = 5;
   slider.value = 1;
   slider.height = "20px";
   slider.width = "150px";
   slider.color = "#003399";
   slider.background = "grey";
   slider.alpha = 0.3
   slider.left = "150px"; // same as width of button + offset
   slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   slider.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
   // Main function to perform by slider
   slider.onValueChangedObservable.add(function (value) { // Must not call this function until the below is declared
      //for (i = 0; i < 3; ++i) {
         //box[selected_pointer].scaling = unitVec.scale(value);
		 //evt.pickInfo.pickedMesh.scaling = unitVec.scale(value);
		 selected_pointer.scaling = unitVec.scale(value) // from selected code above
		 //memory_value = value
         // 1 decimal place
		 var output_value = Math.round(value * 10) / 10; 
		 button1.textBlock.text = output_value.toString(); 
		 //}
		 //sphere.scaling = unitVec.scale(value);
   });
   advancedTexture.addControl(slider);
			
   // Textbox / button
   var text_but = "Click Me"
   var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", text_but);
   button1.width = "150px"
   button1.height = "40px";
   button1.color = "white";
   button1.cornerRadius = 20;
   button1.background = "green";
   //button1.background.alpha = 0.1;
   button1.alpha = 0.3
   button1.left = "1px";
   //button1.top = "10px";
   button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;  // Can replace CENTER with TOP to align from top for mulitple 
   button1.onPointerUpObservable.add(function() {
	   alert("you did it!");
	   text_but = "Yes" // Updates text from string
	   button1.textBlock.text = text_but 
   });
   advancedTexture.addControl(button1); 
			
   // A key is hit
   document.onkeydown = ()=>{
        //angle+=0.2
        //BABYLON.Quaternion.RotationAxisToRef(rotationAxis, angle, pivot.rotationQuaternion);
		button1.textBlock.text = "Key hit!"
		//camera.position(BABYLON.Vector3(0, 0, 0))
		//camera.rotation.x = .4;
        //camera.rotation.y = .4;
		//camera.rotation.z = .4;
		//camera.setPosition(new BABYLON.Vector3(0, 0, 1));
		camera.alpha = -Math.PI / 2;
		camera.beta = -Math.PI / 2;
		//camera.cameraRotation(new BABYLON.Vector3(0, 0, 1));
    }		
			
   return scene;
}

//========================================================================
//===============================Functions================================
//========================================================================
const createBoat = function (scene) {	
	//===Create hull===
	//=================
    box = BABYLON.MeshBuilder.CreateBox("box", {height: 0.75, width: 2, depth: 1});
	// Material property assignment
	var material = new BABYLON.StandardMaterial(scene); 
    material.alpha = 0.3;
    material.diffuseColor = new BABYLON.Color3(0,Math.random(),Math.random()); //RGB
    box.material = material;
	
	//====Create top====
	//==================
	box1 = BABYLON.MeshBuilder.CreateBox("box", {height: 0.5, width: 1, depth: 1});
	box1.position.y = 0.6
	box1.position.x = -0.2
	// Material property assignment
	var material = new BABYLON.StandardMaterial(scene); 
    material.alpha = 0.3;
    material.diffuseColor = new BABYLON.Color3(0,Math.random(),Math.random()); //RGB
    box1.material = material;
	
	//===Create sail a===
	//===================
    box2 = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 0.1, depth: 0.1});
	box2.position.y = 0.6
	box2.position.x = 0.1
	// Material property assignment
	var material = new BABYLON.StandardMaterial(scene); 
    material.alpha = 0.3;
    material.diffuseColor = new BABYLON.Color3(0,Math.random(),Math.random()); //RGB
    box2.material = material;
	
	//===Create sail b===
	//===================
	box3 = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 0.1, depth: 0.1});
	box3.position.y = 0.6
	box2.position.x = 0.75
	// Material property assignment
	var material = new BABYLON.StandardMaterial(scene); 
    material.alpha = 0.3;
    material.diffuseColor = new BABYLON.Color3(0,Math.random(),Math.random()); //RGB
    box3.material = material;
	
	//combine to create mesh: parameters - arrayOfMeshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterial
	var mesh = BABYLON.Mesh.MergeMeshes([box, box1, box2, box3], true, true, undefined, false, true); 	//var mesh = BABYLON.Mesh.MergeMeshes([box, box1, box2, box3], true, true, undefined, false, false); // tests same material with selecting
	
	return mesh
}
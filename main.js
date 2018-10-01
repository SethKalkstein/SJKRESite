
function moveTitle(){
	var bodyBounds = document.body.getBoundingClientRect();
	var headerBounds = document.getElementsByTagName("header")[0].getBoundingClientRect();

	class FloatingTitle{                         //using an object so that I only have to do one array push... more scalable
		constructor(element, eWidth, eHeight) {
			this.element=element;
			this.eWidth=eWidth;
			this.eHeight=eHeight;
		}
		targetLeft() {
			return (bodyBounds.width/2)-(this.eWidth/2); //calculates the where the element should be placed for horizontal centering
		}
		targetRight(){
			return (headerBounds.height*.33*(i+1))-eHeight; //calculates where the element should be place for even vertical spacing
		}
	} 

	var titleRect = [];
	var titleFloat = []; //will hold the the title objects

	console.log(bodyBounds);
	console.log(bodyBounds.width);
	console.log(headerBounds);
	console.log(headerBounds.width);
	for(let i=0;i<3;i++){
		var elem = document.getElementsByClassName("titleFloat")[i]; //grab title elements
		var eRec= elem.getBoundingClientRect(); //gets dimentions for the title elements
		var eWid = eRec.width;  //gets the elements width
		var eHi = eRec.height; //gets the elements height

		titleFloat.push(new FloatingTitle(elem, eWid, eHi)); //pushes a new object into the array
		console.log(titleFloat);
		// titleFloat.push(document.getElementsByClassName("titleFloat")[i]); //grab the title to anmate it
		// console.log(titleFloat[i]);
		// titleFloat[i].style.position = "absolute";
		// titleRect.push(titleFloat[i].getBoundingClientRect());
		// console.log(titleRect[i]);
		// console.log(titleRect[i].width);
		// titleFloat[i].style.left = (bodyBounds.width/2)-(titleRect[i].width/2)+"px";
		// titleFloat[i].style.top = (headerBounds.height*.33*(i+1))-titleRect[i].height+"px";
	}

// console.log(window.getComputedStyle(titleFloat[1]));

}
moveTitle();
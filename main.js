

function populateTitleMover(){
	var titleFloat = []; //will hold the the title objects

	class FloatingTitle{                         //using an object so that I only have to do one array push... more scalable
		constructor(element, eWidth, eHeight) {
			this.element=element; //variable to hold elements with titleFloat class
			this.eWidth=eWidth; //those elements widths
			this.eHeight=eHeight;  //those elements hights
		}
		targetLeft() {
			return (headerBounds.width/2)-(this.eWidth/2); //calculates the where the element should be placed for horizontal centering
		}
		targetTop(i){
			return (headerBounds.height*.3*(i+1)-this.eHeight); //calculates where the element should be place for even vertical spacing
		}
	} 

	var headerBounds = document.getElementsByTagName("header")[0].getBoundingClientRect(); //gets the dimensions of the header tag

	for(let i=0;i<3;i++){
		var elem = document.getElementsByClassName("titleFloat")[i]; //grab title elements
		elem.style.display="inline-block"; //sets titleFloat class 
		elem.style.position= "absolute"; //sets titleFloat class absolute so it can be animated
		var eRec= elem.getBoundingClientRect(); //gets dimentions for the title elements
		var eWid = eRec.width;  //gets the elements width
		var eHi = eRec.height; //gets the elements height
		var titleMember = new FloatingTitle(elem, eWid, eHi) //intantiate object that holds titleFloat 
		titleFloat.push(titleMember); //pushes a new object into the array
	}
		return titleFloat; //returns the array of objects
}

var count= 0; //counts the number of times that the interval has been executed
var iter = 0; //iter tracks the iteration of the array being accessed
var setTime = 0; //for exiting animation interval


function start(){
	setTime = setInterval(moveTitle, 10); //calls the animation incriments
}
function moveTitle(movingTitle = populateTitleMover()){ //function positions the animation
	if (count < 100) { //I initially tried doing everything here in a regular for loop but it wasn't working right with setInterval so rigged it like this instead, setting the iteration through the interval count
		iter = 0;
	} else if(count < 200){
		iter = 1;
	}
	else {
		iter = 2;
	}
	movingTitle[iter].element.style.visibility="visible"; //initiall set to hidden in css
	movingTitle[iter].element.style.fontSize=(((count-(100*iter)+1)*.01)*1.9)+"em"; //makes the font "grow" during animation, uses count as a percent (in decimal form) of the desired outcome increasing by one percent each count
	movingTitle[iter].element.style.left = (((count-(100*iter)+1)*.01)*movingTitle[iter].targetLeft())+"px"; //moves it to the right until centered. note: second and third interation h3[1] and h3[2] are corrected by multiplying the iter by 100 and subtracting from count (and adding 1 because 1 to 100 needed instead of 0 to 99) 
	movingTitle[iter].element.style.top = (((count-(100*iter)+1)*.01)*movingTitle[iter].targetTop(iter))+"px"; //move it down the page until spaced evenly, uses same math as above
	
	if (count == 300){ //function is now finished moving items and exits animatioan
		setTimeout(function() {
  		 for(let j=0;j<3;j++){ //sets elements to rejoin document flow
  			movingTitle[j].element.style.position = "static";
			movingTitle[j].element.style.display = "block";
  		 }
		}, 1000); //pause before returning animated elements to the regular document flow
		clearInterval(setTime);	//exit statementt
	}
	count++;
}

window.addEventListener("load", start());




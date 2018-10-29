

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
	movingTitle[iter].element.style.visibility="visible"; //initially set to hidden in css
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

var scrollPlace = $("#about").offset();
$(window).scroll(function(){
	if($(document).scrollTop() > scrollPlace.top-(scrollPlace.top*.1)){
		$("nav").addClass("jsHeaderSticky");
		$(".nav-item a").removeClass("nav-link");
		$(".nav-item a").addClass("jsStickyNavItem");
		$("#name-link h3").removeClass("titleFloat");
		$("#name-link h3").addClass("jsStickyH3");
		$("nav ul").removeClass("navigation-list");
		$("nav ul").addClass("js-nav-list");
		$("ul li").removeClass("sjkre-floater");
	}
	else{
		$("nav").removeClass("jsHeaderSticky");	
		$(".nav-item a").removeClass("jsStickyNavItem");
		$(".nav-item a").addClass("nav-link");
		$("#name-link h3").removeClass("jsStickyH3");
		$("#name-link h3").addClass("titleFloat");
	}
		console.log(scrollPlace.top);
});

// photo slider below for featured listings

class Listings{
	constructor(url, address, picUrl){
		this.url = url; //array of links to the mls listings
		this.address = address;  //array of address of the houses
		this.picUrl = picUrl;   //array of url of the houses photos
		this.counter = 0; //will keep track of which one is being processed
	}
	prev(){
		if(this.counter == this.address.length-1){ //it's on the last element of the array
			this.counter = 0;  
		}
		else{
			this.counter ++; //since we want the zero element to go to the left adding to the counter does this... counterintuitive, but if you look at the way items are displayed in sliderPositioner function it makes sense
		}
		this.load(); //load them up!
	}

	next(){
		if(this.counter == 0){
			this.counter = this.address.length-1;
		}
		else{
			this.counter --; //in order to have the zero element move to the second position from the first, the new first position would have to be occupied by the last item of the array which is accomplished by decrimenting the counter
		}
		this.load();
	}

	load(){
		if(this.counter==this.address.length-1){ //set the pictures and double check that the counter is not at the end of the array and compensate by returning the first (or first and second) element if it is
			this.sliderPositioner(this.counter, 0, 1) //passes the positions of the array as arguments adjusted for being at the end of the array
		}
		else if(this.counter==this.address.length-2){ //same as above but in second to last position
			this.sliderPositioner(this.counter, this.counter+1, 0 )	
		}
		else{ //otherwise we're not at the end of the array, all is well, carry on
			this.sliderPositioner(this.counter, this.counter+1, this.counter+2 )
		}
	}

	sliderPositioner(position1, position2, position3)
	{
			$("#listing-image1 img").attr("src",this.picUrl[position1]); //sets the actual positions in the html elements
			$("#listing-image2 img").attr("src",this.picUrl[position2]);
			$("#listing-image3 img").attr("src",this.picUrl[position3]);
			$("#listing-heading1 h6").html(this.address[position1]);
			$("#listing-heading2 h6").html(this.address[position2]);
			$("#listing-heading3 h6").html(this.address[position3]);
			$(".listing-link1").attr("href",this.url[position1]);
			$(".listing-link2").attr("href",this.url[position2]);
			$(".listing-link3").attr("href",this.url[position3]);
	}
}

const urls = ["http://matrixweb.trendmls.com/matrix/shared/ZPQstKHXsJ/2019N8thSt", "http://matrixweb.trendmls.com/matrix/shared/g5DH3PQZsJ/418S21stSt","http://matrixweb.trendmls.com/matrix/shared/Xvb3L3Y1sJ/323FortWashingtonAve","http://matrixweb.trendmls.com/matrix/shared/GRXQhM22sJ/7804WilliamsAve","http://matrixweb.trendmls.com/matrix/shared/vkJ1xq63sJ/6175RidgeAve"];
const pics = ["./images/2019N8th.jpg","images/418S21st.jpg","images/323FortWash.jpg","images/7804Williams.jpg","images/6175Ridge.jpg"];
const adds = ["2019 N 8th St", "418 S 21st St","323 Fort Washington Ave", "7804 Williams Ave","6175 Ridge Ave"];

var currentListings = new Listings(urls,adds,pics); //creates an instance of the listing class

currentListings.load(); //loads listings on opening the page

$("#prev").click(function(){currentListings.prev()}); //fires the previous listing scroll 
$("#next").click(function(){currentListings.next()}); //fires the next listing scroll 
// $("#listing-image1").hover(enlarge);

// function enlarge(){
// 	$("#listing-image1 img").css("height","250px");
// }
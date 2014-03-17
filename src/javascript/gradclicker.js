

var player={
		name:"Generic Student",
		grade:9
},
food={
		name:'food',
		total:0,
		increment:1,
		max:200,
		net:0.0
},
sleep={
		name:'sleep',
		total:0,
		increment:1,
		max:200,
		net:0.0
},
coffee={
		name:'coffee',
		total:0,
		increment:1,
		max:200,
		net:0.0
};
//Initialize
player.name=prompt("What is your name?");
document.getElementById('name').innerHTML=player.name;
updateGrade();
updateResources();




function increment(resource){
	resource.total=resource.total+resource.increment;
	//make sure we're not over the max'
	if (resource.total > resource.max){
		resource.total=resource.max;
	}
	
	updateResources();
}

function updateResources(){
	//update food
	document.getElementById('food').innerHTML=Math.round(food.total);
	document.getElementById('maxFood').innerHTML=food.max;
	document.getElementById('netFood').innerHTML=prettify(food.net.toFixed(1));
	if (food.net > 0) {
		document.getElementById('netFood').style.color = '#0b0';
	} else if (food.net == 0){
		document.getElementById('netFood').style.color = '#000';
	} else { //net food is negative
		document.getElementById('netFood').style.color = '#f00';
	}
	//update coffee
	document.getElementById('coffee').innerHTML=Math.round(coffee.total);
	document.getElementById('maxCoffee').innerHTML=coffee.max;
	document.getElementById('netCoffee').innerHTML=prettify(coffee.net.toFixed(1));
	if (coffee.net > 0) {
		document.getElementById('netCoffee').style.color = '#0b0';
	} else if (coffee.net == 0){
		document.getElementById('netCoffee').style.color = '#000';
	} else { //net coffee is negative
		document.getElementById('netCoffee').style.color = '#f00';
	}
	//update sleep
	document.getElementById('sleep').innerHTML=Math.round(sleep.total);
	document.getElementById('maxSleep').innerHTML=sleep.max;
	document.getElementById('netSleep').innerHTML=prettify(sleep.net.toFixed(1));
	if (sleep.net > 0) {
		document.getElementById('netSleep').style.color = '#0b0';
	} else if (sleep.net == 0){
		document.getElementById('netSleep').style.color = '#000';
	} else { //net sleep is negative
		document.getElementById('netSleep').style.color = '#f00';
	}

}

function updateGrade(){
	var school='';
	document.getElementById('grade').innerHTML=player.grade;
	if (player.grade<12){
		school='High School';
	} else if (player.grade<16){
		school="Undergraduate";
	} else{
		school="Graduate School";
	}
	document.getElementById('school').innerHTML=school;
}

window.setInterval(function(){
	food.total=food.total+food.net;
	if (food.total>food.max){
		food.total=food.max
	}
	coffee.total=coffee.total+coffee.net;
	if (coffee.total>coffee.max){
		coffee.total=coffee.max
	}
	sleep.total=sleep.total+sleep.net;
	if (sleep.total>sleep.max){
		sleep.total=sleep.max
	}
	updateResources();
},1000);

function prettify(input){
	var output = '';
	output = input.toString();
	var characteristic = '', //the bit that comes before the decimal point
	mantissa = '', //the bit that comes afterwards
	digitCount = 0;
	delimiter = "&#8239;"; //thin space is the ISO standard thousands delimiter. we need a non-breaking version
	
	//first split the string on the decimal point, and assign to the characteristic and mantissa
	var parts = output.split('.');
	if (typeof parts[1] === 'string') var mantissa = '.' + parts[1]; //check it's defined first, and tack a decimal point to the start of it

	//then insert the commas in the characteristic
	var charArray = parts[0].split(""); //breaks it into an array
	for (var i=charArray.length; i>0; i--){ //counting backwards through the array
		characteristic = charArray[i-1] + characteristic; //add the array item at the front of the string
		digitCount++;
		if (digitCount == 3 && i!=1){ //once every three digits (but not at the head of the number)
			characteristic = delimiter + characteristic; //add the delimiter at the front of the string
			digitCount = 0;
		}
	}	
	output = characteristic + mantissa; //reassemble the number
	return output;
}



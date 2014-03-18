

var player={
		name:"Generic Student",
		grade:9,
		study:0,
		nextGrade:20
},
food={
		name:'food',
		total:220000,
		increment:1,
		max:2000,
		net:0.0
},
time={
		name:'time',
		total:0,
		increment:1,
		max:2000,
		net:0.0
},
coffee={
		name:'coffee',
		total:20000,
		increment:1,
		max:2000,
		net:0.0
},
homework={
	total:0,
	study:1,
	require: {
		coffee:10,
		food:  10,
		time:    0
	}
},
quiz={
	total:0,
	study:5,
	require: {
		coffee:50,
		food:  50,
		time:    1
	}
},
test={
	total:0,
	study:10,
	require: {
		coffee:100,
		food:  100,
		time:    10
	}
},
project={
	total:0,
	study:35,
	require: {
		coffee:500,
		food:  500,
		time:    10
	}
},
presentation={
	total:0,
	study:50,
	require: {
		coffee:1000,
		food:  1000,
		time:    100
	}
},
whiteboard={
	chance: 0.1,
	reward: {
		coffee:1,
		food:  1,
		time:  100
	},
	require: {
		coffee:10,
		food:  10,
		time:   0
	}
};
//Initialize
updateResources();
updateStudy();
paneSelect('study');
updateGrade();
//Get their name
player.name=prompt("What is your name?");
document.getElementById('name').innerHTML=player.name;




function study(assignment,number){
	if (time.total>=assignment.require.time && food.total>=assignment.require.food && coffee.total>=assignment.require.coffee){
		assignment.total=assignment.total+number;
		time.total    = time.total   -number*assignment.require.time;
		food.total   = food.total  -number*assignment.require.food;
		coffee.total = coffee.total-number*assignment.require.coffee;
		
		//update study points
		player.study=player.study+number*assignment.study;
		
		updateResources();
		updateStudy();
	} else{
		console.log("Not enough resources to study that...")
	}
	
}

function updateStudy(){
	document.getElementById('homework').innerHTML    =prettify(homework.total);
	document.getElementById('quiz').innerHTML        =prettify(quiz.total);
	document.getElementById('test').innerHTML        =prettify(test.total);
	document.getElementById('project').innerHTML     =prettify(project.total);
	document.getElementById('presentation').innerHTML=prettify(presentation.total);
	document.getElementById('studyPoints').innerHTML =prettify(player.study);
}

function increment(resource){
	resource.total=resource.total+resource.increment;
	//make sure we're not over the max, is already done in update resources too
	if (resource.total > resource.max){
		resource.total=resource.max;
	}
	
	updateResources();
}

function updateResources(){
	//update food
	document.getElementById('food').innerHTML   =prettify(Math.round(food.total));
	document.getElementById('maxFood').innerHTML=prettify(food.max);
	document.getElementById('netFood').innerHTML=prettify(food.net.toFixed(1));
	if (food.net > 0) {
		document.getElementById('netFood').style.color = '#0b0';
	} else if (food.net == 0){
		document.getElementById('netFood').style.color = '#000';
	} else { //net food is negative
		document.getElementById('netFood').style.color = '#f00';
	}
	//update coffee
	document.getElementById('coffee').innerHTML   =prettify(Math.round(coffee.total));
	document.getElementById('maxCoffee').innerHTML=prettify(coffee.max);
	document.getElementById('netCoffee').innerHTML=prettify(coffee.net.toFixed(1));
	if (coffee.net > 0) {
		document.getElementById('netCoffee').style.color = '#0b0';
	} else if (coffee.net == 0){
		document.getElementById('netCoffee').style.color = '#000';
	} else { //net coffee is negative
		document.getElementById('netCoffee').style.color = '#f00';
	}
	//update time
	document.getElementById('time').innerHTML   =prettify(Math.round(time.total));
	document.getElementById('maxTime').innerHTML=prettify(time.max);
	document.getElementById('netTime').innerHTML=prettify(time.net.toFixed(1));
	if (time.net > 0) {
		document.getElementById('netTime').style.color = '#0b0';
	} else if (time.net == 0){
		document.getElementById('netTime').style.color = '#000';
	} else { //net time is negative
		document.getElementById('netTime').style.color = '#f00';
	}

}

function updateGrade(){
	var school='';
	
	if (player.study>=player.nextGrade) {
		player.study=player.study-player.nextGrade;
		player.grade=player.grade+1;
		//definitely need a better way to figure this out:
		//will come w/testing
		player.nextGrade=player.nextGrade*10;
		
	}
	
	
	
	document.getElementById('grade').innerHTML=player.grade;
	document.getElementById('nextGrade').innerHTML=player.nextGrade;
	document.getElementById('nextGrade2').innerHTML=player.nextGrade;

	if (player.grade<12){
		school='High School';
	} else if (player.grade<16){
		school="Undergraduate";
	} else{
		school="Graduate School";
	}
	document.getElementById('school').innerHTML=school;
	updateStudy();
}

function gamble(trick){
	
	if (time.total>=trick.require.time && coffee.total>=trick.require.coffee && food.total>=trick.require.food){
		time.total  =time.total  -trick.require.time;
		coffee.total=coffee.total-trick.require.coffee;
		food.total  =food.total  -trick.require.food;
		x=Math.random();
		if (x >= (1-trick.chance)){
			//you win!
			x=x+1;
			food.total  =food.total  +x*trick.reward.food;
			console.log("you won",x*trick.reward.food,"food!");
			coffee.total=coffee.total+x*trick.reward.coffee;
			console.log("you won",x*trick.reward.coffee,"coffee!");
			time.total  =time.total  +x*trick.reward.time;
			console.log("you won",x*trick.reward.time,"time!");
		} else{
			console.log("You lose!");
		}
	}
	
	updateResources();
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
	time.total=time.total+time.net;
	if (time.total>time.max){
		time.total=time.max
	}
	updateResources();
},1000);

function prettify(input){
	var output = '';
	output = input.toString();
	var characteristic = '', //the bit that comes before the decimal point
	mantissa = '', //the bit that comes afterwards
	digitCount = 0;
	//delimiter = "&#8239;"; //thin space is the ISO standard thousands delimiter. we need a non-breaking version
	delimiter = ","
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

function paneSelect(name){
	//Called when user switches between the various panes on the left hand side of the interface
	if (name == 'study'){
		document.getElementById("studyPane").style.display    = "block";
		document.getElementById("upgradesPane").style.display = "none";
		document.getElementById("gamblingPane").style.display = "none";
		//document.getElementById("selectStudy").className = "paneSelector selected";
		//document.getElementById("selectUpgrades").className = "paneSelector";

	}
	if (name == 'upgrades'){
		document.getElementById("studyPane").style.display    = "none";
		document.getElementById("upgradesPane").style.display = "block";
		document.getElementById("gamblingPane").style.display = "none";
		//document.getElementById("selectStudy").className = "paneSelector";
		//document.getElementById("selectUpgrades").className = "paneSelector selected";
	}
	if (name == 'gambling') {
		document.getElementById("studyPane").style.display    = "none";
		document.getElementById("upgradesPane").style.display = "none";
		document.getElementById("gamblingPane").style.display = "block";
	}
}


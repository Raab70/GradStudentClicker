

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
sex={
		name:'sex',
		total:0200000,
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
		sex:    0
	}
},
quiz={
	total:0,
	study:5,
	require: {
		coffee:50,
		food:  50,
		sex:    1
	}
},
test={
	total:0,
	study:10,
	require: {
		coffee:100,
		food:  100,
		sex:    10
	}
},
project={
	total:0,
	study:35,
	require: {
		coffee:500,
		food:  500,
		sex:    10
	}
},
presentation={
	total:0,
	study:50,
	require: {
		coffee:1000,
		food:  1000,
		sex:    100
	}
};
//Initialize
player.name=prompt("What is your name?");
document.getElementById('name').innerHTML=player.name;
updateGrade();
updateResources();
updateStudy();

function study(assignment,number){
	if (sex.total>=assignment.require.sex && food.total>=assignment.require.food && coffee.total>=assignment.require.coffee){
		assignment.total=assignment.total+number;
		sex.total    = sex.total   -number*assignment.require.sex;
		food.total   = food.total  -number*assignment.require.food;
		coffee.total = coffee.total-number*assignment.require.coffee;
		
		//update study points
		player.study=player.study+number*assignment.study;
		
		updateResources();
		updateStudy();
		updateGrade();
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
	//update sex
	document.getElementById('sex').innerHTML   =prettify(Math.round(sex.total));
	document.getElementById('maxSex').innerHTML=prettify(sex.max);
	document.getElementById('netSex').innerHTML=prettify(sex.net.toFixed(1));
	if (sex.net > 0) {
		document.getElementById('netSex').style.color = '#0b0';
	} else if (sex.net == 0){
		document.getElementById('netSex').style.color = '#000';
	} else { //net sex is negative
		document.getElementById('netSex').style.color = '#f00';
	}

}

function updateGrade(){
	var school='';
	
	if (player.study>=player.nextGrade) {
		player.grade=player.grade+1;
		//definitely need a better way to figure this out:
		//will come w/testing
		player.nextGrade=player.nextGrade*10;
	}
	
	
	
	document.getElementById('grade').innerHTML=player.grade;
	document.getElementById('nextGrade').innerHTML=player.nextGrade;
	
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
	sex.total=sex.total+sex.net;
	if (sex.total>sex.max){
		sex.total=sex.max
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



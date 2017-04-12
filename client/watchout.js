// start slingin' some d3 here.

gameOptions = {
	nEnemies : 20,
	enemies : {
		r: 20
	},
	width : 960,
	height : 500,
	playerLoc: [100, 100]
}

var highscore = 0;
var current = 0;
var collisions = 0;
var faults = 0


// Game container
var svg = d3.select('.gameContainer');


// trying img

var img = {
	href: "asteroid.png",
	x: 100,
	y: 100,
	height: 20 + 'px',
	width: 20 + 'px'
}

svg.selectAll('image')
	 .data([img])
	 .enter()
	 .append('image')
	 .attr('xlink:href', function(d) { return d.href})
	 .attr('x', function(d) { return d.x})
	 .attr('y', function(d) { return d.y})
	 .attr('height', function(d) { return d.height})
	 .attr('width', function(d) { return d.width})



// create enemy data
var meteors = d3.range(10).map(function() {
	var met = new Meteor()
	console.log(met)
	return met

})


var createMeteor = function() {
	// Create new meteor object and push to array
}

var updateMeteor = function() {
	// Update all meteors based on current attributes
}

var spawnFuel = function() {

}

var updateFuel = function() {

}

//append enemies
svg.selectAll('image')
	.data(meteors)
	.enter()
	.append('image')
	.attr('x', function(data) {
		return data.cx})
	.attr('y', function(data) {
		return data.y})
	.attr('height', function(data) {
		return data.height})
	.attr('width', function(data) {
		return data.width})	
	.attr('xlink:href', function(data) {
		return data.href})
	.transition()
	.duration(function(data) {
		return data.speed
	})
	.attr('x', function(data) {
		return data.targetx
	})
	.attr('y', function(data) {
		return data.targety
	})

// create ball data
var updateEnemy = function() {
	svg.selectAll('image')
	 .transition()
	 .duration(1000)
	 .attr('x', function(d) {return Math.random() * (gameOptions.width - gameOptions.enemies.r) + gameOptions.enemies.r})
	 .attr('y', function(d) {return Math.random() * (gameOptions.height - gameOptions.enemies.r) + gameOptions.enemies.r})

	}

// create player
var player = [{
		x : gameOptions.playerLoc[0],
		y : gameOptions.playerLoc[1],
		height: 15,
		width: 15,
		fill: 'red',
}]

// append player
svg.selectAll('svg')
	 .data(player)
	 .enter()
	 .append('rect')
	 .attr('x', function(d) { return  d.x})
	 .attr('y', function(d) { return  d.y})
	 .attr('width', function(d) { return  d.width})
	 .attr('height', function(d) {return d.height})
	 .style('fill', function(d) {return d.fill})

// Update player location
var updatePlayer = function() {
	svg.selectAll('rect')
	 .attr('x', function(d) { return  gameOptions.playerLoc[0]})
	 .attr('y', function(d) { return  gameOptions.playerLoc[1]})
	 .attr('width', function(d) { return  d.width})
	 .attr('height', function(d) {return d.height})
	 .style('fill', function(d) {return d.fill})
}


// get mouseLocation  
svg
  .on("mousemove", function() { 
  	gameOptions.playerLoc = d3.mouse(this); 
  });

// svg
// 	.on('mouseleave', leaveHandler);

// function leaveHandler() {
// 	alert('Out of bounds');
// 	current = 0;
// 	faults++
// 	d3.select('.faults').text('Faults: ' + faults)
// }


svg.selectAll('circle')
	.on('mouseover', collision)

function collision() {
	current = 0;
	collisions++;
	d3.select('.collisions')
		.text('Collisions: ' + collisions)
}

var setStats = function() {
	current++;
	if(current > highscore) {
		highscore = current;
	}
	d3.select('.highscore')
		.text('Highscore: ' + highscore)
	d3.select('.current')
		.text('Current Score: ' + current)
}



// Move enemies
setInterval(function() {
	setStats()
	//updateEnemy()
}, 500)


//Move player
setInterval(function() {
	updatePlayer()
}, 10)








































// append circles to svg
// svg.selectAll("circle")
//   .data(circles)
//   .enter().append("circle")
//     .attr("cx", function(d) { return d.x; })
//     .attr("cy", function(d) { return d.y; })
//     .attr("r", radius)

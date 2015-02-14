function videoTable (vidList) {

	var table = document.getElementById("vids");

	while (table.firstChild){

		table.removeChild(table.firstChild);
	}

	var cap = document.createElement('caption');

	cap.textContent = "Video Inventory";

	table.appendChild(cap);

	var tr = document.createElement('tr');
	
	var id = document.createElement('th');

	id.textContent = "Id";

	tr.appendChild(id);
	
	var name = document.createElement('th');

	name.textContent = "Name";

	tr.appendChild(name);

	var cat = document.createElement('th');

	cat.textContent = "Category";

	tr.appendChild(cat);

	var length = document.createElement('th');

	length.textContent = "Length";

	tr.appendChild(length);

	var rented = document.createElement('th');

	rented.textContent = "Rented";

	tr.appendChild(rented);

	table.appendChild(tr);

	for (var i = 0; i < vidList.length; i++){

		var trr = document.createElement('tr');
	
		var id2 = document.createElement('td');

		id2.textContent = vidList[i].id;

		trr.appendChild(id2);
	
		var n = document.createElement('td');

		n.textContent = vidList[i].name;

		trr.appendChild(n);

		var c = document.createElement('td');

		c.textContent = vidList[i].category;

		trr.appendChild(c);
	
		var l = document.createElement('td');

		l.textContent = vidList[i].length;

		trr.appendChild(l);

		var r = document.createElement('td');

		if (vidList[i].rented) {

			r.textContent = "Checked Out";

		}

		else{

			r.textContent = "Available";

		}

		trr.appendChild(r);

		var delBut = document.createElement("BUTTON");

		delBut.type = "button";

		delBut.value = vidList[i].name;

		delBut.textContent = "DELETE";
		
		trr.appendChild(delBut);

		var chBut = document.createElement("BUTTON");

		chBut.type = "button";

		chBut.value = vidList[i].name;
	
		chBut.textContent = "CHECK IN/CHECK OUT";

		trr.appendChild(chBut);

		table.appendChild(trr);

		chBut.addEventListener('click', function(){

			var reg = new XMLHttpRequest();

			if(!reg){

				throw 'Unable to create HttpRequest.';

			}

			var vars;
			
			vars = "action=check&n="+this.value;

			reg.onreadystatechange = function(){

				if(this.readyState === 4){

					var results = JSON.parse(this.responseText);

					console.log(results);

					videoTable(results.results);

					genreList(results.genres);


				}

			};

			var url = 'http://web.engr.oregonstate.edu/~jurczakn/videoInventory.php';

			reg.open('POST', url);

			reg.setRequestHeader("Content-type","application/x-www-form-urlencoded");

			reg.send(vars);


		});

		delBut.addEventListener('click', function(){

			var reg = new XMLHttpRequest();

			if(!reg){

				throw 'Unable to create HttpRequest.';

			}

			var vars;
			
			vars = "action=delete&n="+this.value;

			reg.onreadystatechange = function(){

				if(this.readyState === 4){

					var results = JSON.parse(this.responseText);

					console.log(results);

					videoTable(results.results);

					genreList(results.genres);


				}

			};

			var url = 'http://web.engr.oregonstate.edu/~jurczakn/videoInventory.php';

			reg.open('POST', url);

			reg.setRequestHeader("Content-type","application/x-www-form-urlencoded");

			reg.send(vars);


		});


	}
};

function genreList(results){

	var g = document.getElementById("genres");

	while (g.firstChild){

		g.removeChild(g.firstChild);
	}


	var all = document.createElement("option");

	all.value = "%";

	all.textContent = "All Videos";

	g.appendChild(all);

	for (var i = 0; i < results.length; i++){

		var genreSelect = document.createElement("option");

		genreSelect.value = results[i];

		genreSelect.textContent = results[i];

		g.appendChild(genreSelect);
	
	}

	var filterBut = document.getElementById("filter");

	filterBut.textContent = "FILTER";

	filterBut.addEventListener('click', function(){

			var reg = new XMLHttpRequest();

			if(!reg){

				throw 'Unable to create HttpRequest.';

			}

			var vars;
			
			vars = "genre="+g.value;

			reg.onreadystatechange = function(){

				if(this.readyState === 4){

					var results = JSON.parse(this.responseText);

					console.log(results);

					videoTable(results.results);

					genreList(results.genres);

				}

			};

			var url = 'http://web.engr.oregonstate.edu/~jurczakn/videoInventory.php';

			reg.open('POST', url);

			reg.setRequestHeader("Content-type","application/x-www-form-urlencoded");

			reg.send(vars);



	});


	
};

function deleteAll(){

	var reg = new XMLHttpRequest();

	if(!reg){

		throw 'Unable to create HttpRequest.';

	}

	var vars;
			
	vars = "action=deleteall";

	reg.onreadystatechange = function(){

		if(this.readyState === 4){

			var results = JSON.parse(this.responseText);

			console.log(results);

			videoTable(results.results);

			genreList(results.genres);


		}

	};

	var url = 'http://web.engr.oregonstate.edu/~jurczakn/videoInventory.php';

	reg.open('POST', url);

	reg.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	reg.send(vars);

};

window.onload = function () {

	var reg = new XMLHttpRequest();

		if(!reg){

			throw 'Unable to create HttpRequest.';

		}

	var url = 'http://web.engr.oregonstate.edu/~jurczakn/videoInventory.php';

	reg.open('POST', url);

	reg.send();

	reg.onreadystatechange = function(){

		if(this.readyState === 4){

			var results = JSON.parse(this.responseText);

			console.log(results);

			videoTable(results.results);

			genreList(results.genres);

		}

	}

};
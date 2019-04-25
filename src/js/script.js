const map = L.map('map', {center: [53, 20],zoom: 5});
let mapMarkers = [];
const table = document.querySelector(".places-table tbody");
const mapInit =	() => {
		const tiles = new L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png').addTo(map);
}
const markerAdd = (e) => {
		let Icon = L.icon({
        	iconUrl: './assets/pink_point_with_hole.png',
        	iconSize: [25, 41], 
        });
		let marker =  new L.marker(e.latlng,{
	    	draggable: true,
	    	autoPan: true,
	    	icon:Icon
		}).addTo(map);	
		let markerData = {
			markerId:marker._leaflet_id,
			markerLatLng:marker._latlng
		};
		map.addLayer(marker);
		mapMarkers.push(markerData);
		marker.on('dragend', function(evt) {
      		let current = mapMarkers.find((item,index)=>{
      		 	if(item.markerId === evt.target._leaflet_id){
      		 	 	mapMarkers[index].markerLatLng = evt.target._latlng;
      		 	}
    			return null;
      		})
      	});
}
const markerRemove = (e) =>{
		let id = e.target.getAttribute("data-id");
		map.eachLayer((layer)=>{
			if(layer._leaflet_id == id){
				map.removeLayer(layer);
				mapMarkers = mapMarkers.filter(item => item.markerId != id);
			}
		})
		makeList();
}
const makeList = ()=>{
	table.innerHTML = '';
	if(mapMarkers.length>0){
		mapMarkers.map((item)=>{
			var entry = document.createElement("tr");
			entry.classList.add("list-item");
			entry.setAttribute('data-id', item.markerId);
			entry.innerHTML = 
			`<td class="marker-id">${item.markerId}</td>
			 <td class="marker-latlng">${item.markerLatLng.lat}</td>
			 <td class="marker-latlng">${item.markerLatLng.lng}</td>
			 <td class="marker-remove"></td>`;
			var action = document.createElement("button");
			action.classList.add("marker-remove-btn");
			action.setAttribute('data-id', item.markerId);
			action.innerHTML = 'Usuń';
			action.addEventListener("click",markerRemove);
			entry.lastElementChild.appendChild(action);
			table.appendChild(entry);
		})
	}
}
document.querySelector(".places-link").addEventListener("click",makeList);
mapInit();
map.on('click', markerAdd);


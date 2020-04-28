

// 위도와 경도를 가져온다.
window.addEventListener('load', () => {
	let long;
	let lat;
	
	//
	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
		});
	} else {
		h1.textContent = "hey plz enable system to access your location info";
	}
});
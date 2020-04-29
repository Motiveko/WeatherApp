

// 위도와 경도를 가져온다.
window.addEventListener('load', () => {

	let long;
	let lat;
	

	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');

	if( navigator.geolocation ){
		
		navigator.geolocation.getCurrentPosition(position => {
			
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const key="fd9d9c6418c23d94745b836767721ad1";
			const proxy = "https://cors-anywhere.herokuapp.com/";


			//작은따음표('')가 아닌  grave accent(``) 로 열고 닫아 줘야 변수를 ${}로 집어넣을 수 있다...!
			const api =`${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;


			//Get information from url // .then()하는 이유는 데이터가 완전히 도착 한 후에 실행하기 위함
			//fetch한 데이터는 (response) 는 json 형태로 받아야한다.
			fetch(api)
				.then( response =>{
					return response.json();
				})
				.then( data => {

					//temprature, summary;					
					console.log(data);
					//한꺼번에 가져오는 방식이다.
					const{ temperature, summary,icon	} = data.currently;

					//Set Data from APIs
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					//SetIcon
					setIcons(icon,document.querySelector(".icon"));
					
					// 화씨-섭씨변환!
					let ftemp = Number(temperatureDegree.textContent);
					let ctemp = (ftemp - 32)/1.8;
					//소수점 한자리로 만들기위해...
					let ctempR = Math.floor(ctemp) + Math.round((ctemp-Math.floor(ctemp))*10)/10;
					
					temperatureDegree.addEventListener('click', ()=>{
						var m = document.querySelector('.measurement');
								if( m.textContent=='F'){
									m.textContent='C';
									temperatureDegree.textContent = ctempR;
								} else{
									m.textContent='F';
									temperatureDegree.textContent = ftemp;
								} 
					});
				})						
		});
	}


	// https://darkskyapp.github.io/skycons/
	function setIcons(icon, iconID){
		var skycons = new Skycons({color: "white"});
		//모든 -를 _로 교체한다::global replacement. 그리고 영어 다 대문자로;
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();

		skycons.play(); 
		return skycons.set(iconID, Skycons[currentIcon]);
	}

/* 	
	내가 응용한 코드, 동일하게 돌아간다.
	function setIcons( icon, iconID) {
		var skycons = new Skycons({"color" : "white"});
		var currIcon = icon.replace(/-/g,"_");
		skycons.set(iconID,currIcon);
		skycons.play();
	}
*/








});
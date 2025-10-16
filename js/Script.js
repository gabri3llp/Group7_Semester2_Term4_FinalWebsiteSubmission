!async function(){
const url = 'https://movies-api14.p.rapidapi.com/shows';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8e9074276emsh223ef54cf19b760p19a968jsn3a988955cdbc',
		'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
	}
};

    let data = await fetch(url, options)
        .then((response)=> response.json())
        .then((result) => {return result})
        .catch((error)=> console.error(error));

        console.log(data);
      
}();

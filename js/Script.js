!async function () {
    
    const apiKey = '0363063badd97c1049612cbbac78bf57';
    
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    let data = await fetch(url, options)
        .then((response)=> response.json())
        .then((result) => {return result})
        .catch((error)=> console.error(error));

        console.log(data);

    
}();

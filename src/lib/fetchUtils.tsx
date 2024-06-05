export async function getCategories()  {

    return callApi('https://api.chucknorris.io/jokes/categories', false);
} 

export async function callApi(url:string, isJoke:boolean){
    const res = await fetch(url);
    var data = []
    if(res.ok){
      data = await res.json();  
    }

    if(isJoke){
        var ndata:ChuckNorrisJoke = data;
        return ndata;
    }

    return data

}

export async function getJoke(categorie:string){
    var url = '';
    const cat = Array.from(categorie);
    if(cat[0] === "All"){
         url = 'https://api.chucknorris.io/jokes/random';
    }else{
        url = `https://api.chucknorris.io/jokes/random?category=${cat[0]}`;
        console.log(url);
        console.log(cat[0])
    }

    return callApi(url, true);
}
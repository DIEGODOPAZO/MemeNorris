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

export async function getJoke(categorie:String){
    var url = '';
    if(categorie === "All"){
         url = 'https://api.chucknorris.io/jokes/random';
    }else{
         url = 'https://api.chucknorris.io/jokes/random?category=' + categorie;
    }

    return callApi(url, true);
}
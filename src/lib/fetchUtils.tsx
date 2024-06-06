import { useEffect } from "react";

export async function getCategories() {
  return callApi("https://api.chucknorris.io/jokes/categories", false);
}

export async function callApi(url: string, isJoke: boolean) {
  try {
    const res = await fetch(url);
    let data = [];
    
    if (res.ok) {
      data = await res.json();
    } else {
      return [`An error ${res.status} ocurred`];
    }
    
    if(data.length == 0){
        return["Unable to get the joke"];
    }

    if (isJoke) {
      var ndata: ChuckNorrisJoke = data;
      return ndata;
    }

    return data;
  } catch (error) {
    return [`An error ocurred while calling the api ${error}`];
  }
}

export function useEffectAsync(effect: any, inputs: any) {
  useEffect(() => {
    effect();
  }, inputs);
}

export async function getJoke(categorie: string) {
  var url = "";
  const cat = Array.from(categorie);
  if (cat[0] === "All" || cat[0] === "A") {
    url = "https://api.chucknorris.io/jokes/random";
  } else {
    url = `https://api.chucknorris.io/jokes/random?category=${cat[0]}`;
  }

  return callApi(url, true);
}
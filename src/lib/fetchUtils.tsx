export async function getCategories()  {
    const res = await fetch('https://api.chucknorris.io/jokes/categories');
    
    if(res.ok){
      const data = await res.json();
      return data
    }else{
        return []
    }
} 
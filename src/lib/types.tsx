interface ChuckNorrisJoke {
    categories: string[];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: string;
}

interface UserJokes{
    user_id: any;
    joke_id: any;
    joke: any;
}
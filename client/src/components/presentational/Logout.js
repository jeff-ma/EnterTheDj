import {Cookies} from 'react-cookie';

export default () => {
    const cookies = new Cookies();
    cookies.remove("access_token");
    cookies.remove("birthdate");
    cookies.remove("country");
    cookies.remove("display_name");
    cookies.remove("email");
    cookies.remove("followers");
    cookies.remove("id");
    cookies.remove("image_url");
    cookies.remove("product");
    cookies.remove("refresh_token");
    cookies.remove("spotify_url");
    window.location.replace("/");
    return null;
};
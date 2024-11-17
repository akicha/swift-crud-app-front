export class AppSettings {

  public static TOKEN_KEY: string = 'token';

  private static API_URL: string = 'http://127.0.0.1:8080/api';

  public static USERS_URL: string = this.API_URL + "/users";
  public static GENDERS_URL: string = this.API_URL + "/genders";
  public static LOGIN_URL: string = this.API_URL + "/login";


}



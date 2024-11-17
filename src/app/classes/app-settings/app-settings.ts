export class AppSettings {

  public static TOKEN_KEY: string = 'token';

  private static API_URL: string = 'http://127.0.0.1:8080/api';

  public static USERS_URL: string = this.API_URL + "/users";
  public static GENDERS_URL: string = this.API_URL + "/genders";
  public static LOGIN_URL: string = this.API_URL + "/auth/login";

  /*
  * The best way to set up server communication is to build environments:
  *
  * 1. Create src/environments folder with the next command: ng generate environments
  * 2. Add configuration for all environments we want to have
     For example, we will have environment.prod.ts file with this content:
      export const environment = {
        production: true
      };
  * 3. Create json config files in assets folder (assets/config/production.json) and add API endpoints.
  * 4. Create a service to load the appropriate file depending on the environment.
  * */


}



import SignupData from "@/types/signup";

export class User {

  constructor(init: SignupData) {
    this.name = init.name;
    this.password = init.password;
  }

  public getName() : string {
    return this.name;
  }

  public getPassword() : string {
    return this.password;
  }
 
  
  private name: string;
  private password: string;
}

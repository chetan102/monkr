import { IAppContext } from "../context/context";
import { AuthController } from "./auth/auth-controller";

export class AppController {
  protected readonly auth: AuthController;

  constructor(private ctx: IAppContext) {
    this.auth = new AuthController(this.ctx);
  }
}
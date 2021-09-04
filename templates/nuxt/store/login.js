import loginService from "../services/login";
import makeCrudModule from "./crud";

export default makeCrudModule({
  service: loginService,
});

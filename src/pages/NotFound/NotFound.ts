import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Main } from "../../components/main/main";
import { IComponent } from "../../interfaces/index";

export class NotFound implements IComponent{
  execute() {
    const root: HTMLElement | null  = document.getElementById('root');
    if (root) {
      new Header().create();
      new Main().create();
      const main = document.querySelector('main')
      new Footer().create();
    }
  }
}

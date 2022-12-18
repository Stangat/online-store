import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';

export class Cart implements IComponent {
  execute() {
    const root: HTMLElement | null = document.getElementById('root');
    if (root) {
      new Header().create();
      new Main().create();
      new Footer().create();
    }
  }
}

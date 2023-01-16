import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';
import { ProductMain } from './product-main-block';

export class Product implements IComponent {
  execute(productId: number): void {
    const root: HTMLElement | null = document.getElementById('root');
    if (root) {
      new Header().create();
      new Main().create();
      new ProductMain().create(productId);
      new Footer().create();
    }
  }
}

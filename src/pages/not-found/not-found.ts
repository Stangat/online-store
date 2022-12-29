import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';
import './not-found.scss';
import { NotFoundMainBlock } from './not-found-main-block/not-found-main-block';

export class NotFound implements IComponent {
  execute():void {
    const root: HTMLElement | null = document.getElementById('root');
    if (root) {
      new Header().create();
      new Main().create();
      new NotFoundMainBlock().create();
      new Footer().create();
    }
  }
}

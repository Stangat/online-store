import './global.scss';
import { Footer } from './modules/store-page/components/footer/footer';
import { Header } from './modules/store-page/components/header/header';
import { Main } from './modules/store-page/components/main/main';

new Header().create();
new Main().create();
new Footer().create();

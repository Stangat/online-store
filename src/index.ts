import './global.scss';
import { Footer } from './modules/store-page/components/footer/footer';
import { Header } from './modules/store-page/components/header/header';
import { Main } from './modules/store-page/components/main/main';
import { Card } from './modules/store-page/components/cards/cards';

new Header().create();
new Main().create();
new Footer().create();
new Card().createCatalog();

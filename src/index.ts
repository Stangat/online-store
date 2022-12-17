import './global.scss';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Card } from './pages/main-page/cards/cards';

new Header().create();
new Main().create();
new Footer().create();
new Card().createCatalog();

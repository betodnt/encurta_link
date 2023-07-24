import './error.css';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="container-error">
      <img href="/public/Image/not-found.png" alt="Página não encontrada" />
      <h1>Página não encontrada!</h1>
      <Link to="/encurta_link">Voltar para Home</Link>
    </div>
  );
}

import { useState } from 'react';
import { FiLink } from 'react-icons/fi';
import './home.css';
import Menu from '../../Components/Menu';
import LinkItem from '../../Components/LinkItem';
import api from '../../Services/api';
import { saveLink, getLinksSave } from '../../Services/storeLinks';
import Alert from '../../Components/Alert';

export default function Home() {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});
  const [showDock, setShowDock] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showDuplicateLinkAlert, setShowDuplicateLinkAlert] = useState(false);

  async function handleShortLink() {
    setShowErrorAlert(false);
    setShowDuplicateLinkAlert(false);

    try {
      const response = await api.get(`/create.php?format=json&url=${encodeURIComponent(link)}`);

      if (response.data && response.data.shorturl) {
        setData({ link: response.data.shorturl });

        const linksStored = await getLinksSave('@linkCurto');
        const hasLink = linksStored.some((link) => link.link === response.data.shorturl);

        if (!hasLink) {
          await saveLink('@linkCurto', { link: response.data.shorturl });
          setShowDock(true);
        } else {
          setShowDuplicateLinkAlert(true);
          setShowDock(false);
        }
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      setShowErrorAlert(true);
    } finally {
      setLink('');
    }
  }

  return (
    <div className="container-home">
      <div className="logo">
        <FiLink size={150} color="#fff" />
        <h1>Encurta Link</h1>
        <span>Cole seu link para encurtar 👇</span>
      </div>

      <div className="area-input">
        <div>
          <FiLink size={24} color="#fff" />
          <input
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button onClick={handleShortLink}>Encurtar Link</button>
      </div>

      <Menu />

      {showErrorAlert && !showDock && (
        <Alert>
          <p>Ops, parece que algo deu errado!</p>
        </Alert>
      )}

      {data.link && (
        <Alert data={data.link}>
          <p>Link adicionado à sua lista!</p>
        </Alert>
      )}

      {showDuplicateLinkAlert && (
        <Alert>
          <p>Link já existe!</p>
        </Alert>
      )}

      {showDock && <LinkItem closeDock={() => setShowDock(false)} content={data} />}
    </div>
  );
}

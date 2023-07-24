import { useEffect, useState } from 'react';
import './links.css';
import { FiArrowLeft, FiLink, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getLinksSave, deleteLink } from '../../Services/storeLinks';
import LinkItem from '../../Components/LinkItem';

export default function Links() {
  const [myLinks, setMyLinks] = useState([]);

  const [data, setData] = useState({});
  const [showDock, setShowDock] = useState(false);

  const [emptyList, setEmptyList] = useState(false);

  useEffect(() => {
    async function getLinks() {
      const result = await getLinksSave('@linkCurto');

      if (result.length === 0) {
        setEmptyList(true);
      }
      setMyLinks(result);
    }

    getLinks();
  }, []);

  function handleOpenLink(link) {
    setData(link);
    setShowDock(true);
  }

  async function handleDelete(link) {
    const result = await deleteLink(myLinks, link);

    if (result.length === 0) {
      setEmptyList(true);
    }
    setMyLinks(result);
  }

  return (
    <div className="links-container">
      <div className="links-header">
        <Link to="/encurta_link">
          <FiArrowLeft size={38} color="#fff" />
        </Link>
        <h1>Meus Links</h1>
      </div>

      {emptyList && (
        <div className="links-item">
          <h1 className="empty-txt">Sua lista está vazia...</h1>
        </div>
      )}

      {myLinks.map((content) => (
        <div key={content.link} className="links-item">
          <button className="link" onClick={() => handleOpenLink(content)}>
            <FiLink size={18} color="#fff" />
            {content.link}
          </button>
          <button className="link-delete" onClick={() => handleDelete(content.link)}>
            <FiX size={28} color="#fff" />
          </button>
        </div>
      ))}

      {showDock && <LinkItem closeDock={() => setShowDock(false)} content={data} />}
    </div>
  );
}

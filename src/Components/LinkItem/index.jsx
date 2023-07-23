import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './link-item.css';
import { FiX, FiClipboard } from 'react-icons/fi';
import { PropTypes } from 'prop-types';
import Alert from '../Alert';

export default function LinkItem({ closeDock, content }) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [shortenedLink, setShortenedLink] = useState('');
  const [toPasteAlert, setToPasteAlert] = useState(false);

  useEffect(() => {
    setShortenedLink(content.link);
    setShowQRCode(true);
  }, [content.link]);

  async function copyLink() {
    await navigator.clipboard.writeText(content.link);
    setToPasteAlert(true);
  }

  // Resetar o estado toPasteAlert após 3 segundos
  useEffect(() => {
    if (toPasteAlert) {
      const timer = setTimeout(() => {
        setToPasteAlert(false);
      }, 3000); // Esconde o Alert após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [toPasteAlert]);

  return (
    <div className="dock-container">
      <div className="qrCode">{showQRCode && <QRCode value={shortenedLink} />}</div>
      <div className="dock-header">
        <h2>Link Encurtado</h2>
        <button onClick={closeDock}>
          <FiX size={28} color="#fff" />
        </button>
      </div>
      <button className="dock-link" onClick={copyLink}>
        {content.link}
        <FiClipboard size={28} color="#fff" />
      </button>

      {toPasteAlert && (
        <Alert>
          <p>Link copiado!</p>
        </Alert>
      )}
    </div>
  );
}

LinkItem.propTypes = {
  closeDock: PropTypes.func.isRequired,
  content: PropTypes.shape({
    link: PropTypes.string.isRequired,
  }).isRequired,
};

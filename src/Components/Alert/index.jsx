import { FiX } from 'react-icons/fi';
import './alert.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Alert({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="alert">
        <div className="alert-container">
          {children}
          <FiX size={28} color="#000" onClick={onClose} className="close" />
        </div>
      </div>
    )
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
};

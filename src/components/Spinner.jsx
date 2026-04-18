import React from 'react';
import './Spinner.css';

export default function Spinner({ label, fullscreen = false }) {
  return (
    <div className={`spinner-overlay ${fullscreen ? 'fullscreen' : 'inline'}`}>
      <div className="spinner" />
      {label && <p className="spinner-label">{label}</p>}
    </div>
  );
}

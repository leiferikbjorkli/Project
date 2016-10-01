import React from 'react';
import { Link } from 'react-router';

export default function NewEventLink() {
  return (
    <div className="new-event">
      <Link to="/new">
        <span>Ny Fagaktivitet</span>
      </Link>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a2e', color: '#e0e0ff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
          <div>Loading VSLA Connect API Docs...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        .swagger-ui .topbar { 
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 12px 20px;
        }
        .swagger-ui .topbar .download-url-wrapper { display: none; }
        .swagger-ui .info .title { color: #7c3aed; }
        body { margin: 0; }
      `}</style>
      <SwaggerUI spec={spec} />
    </div>
  );
}

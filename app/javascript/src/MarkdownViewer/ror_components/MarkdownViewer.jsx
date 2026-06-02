import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import * as style from './MarkdownViewer.module.css';

/**
 * Lightweight shared markdown viewer component
 *
 * This component is deliberately lightweight - it only displays pre-processed HTML.
 * No markdown libraries are imported here, keeping the bundle size minimal.
 *
 * Processing happens in the consuming components:
 * - Server component: processes markdown server-side (heavy libs stay on server)
 * - Client component: processes markdown client-side (heavy libs go to client)
 *
 * All HTML is sanitized using DOMPurify to prevent XSS attacks.
 *
 * This pattern ensures the viewer itself has minimal bundle impact.
 */
const MarkdownViewer = ({ processedHtml, className }) => {
  const sanitizedHtml = DOMPurify.sanitize(processedHtml);

  return (
    <div
      className={`${style.markdownContent} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default MarkdownViewer;

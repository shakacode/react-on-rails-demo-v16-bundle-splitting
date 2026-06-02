"use client";

import React, { useState, useEffect } from 'react';
import MarkdownViewer from '../../MarkdownViewer/ror_components/MarkdownViewer';
import * as style from './HeavyMarkdownEditor.module.css';

const HeavyMarkdownEditor = (props) => {
  const [markdown, setMarkdown] = useState(props.initialText || '# Start editing markdown here...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [processedHtml, setProcessedHtml] = useState('');

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const [{ default: ReactMarkdown }, { default: remarkGfm }, { renderToString }] = await Promise.all([
          import('react-markdown'),
          import('remark-gfm'),
          import('react-dom/server')
        ]);

        // Convert markdown to HTML using react-markdown, then use shared MarkdownViewer
        const htmlString = renderToString(
          React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, markdown)
        );

        setProcessedHtml(htmlString);
        setIsLoaded(true);
      } catch (error) {
        console.warn('Failed to load markdown components:', error);
        setIsLoaded(true); // Show fallback
      }
    };

    loadMarkdown();
  }, [markdown]);

  // Skeleton loader component that fills the preview space properly  
  const SkeletonLoader = () => (
    <div className={`${style.skeleton} ${style.contentTransition} ${style.fadeIn}`}>
      {/* Title */}
      <div className={style.skeletonTitle}></div>
      
      {/* First section of content */}
      <div className={style.skeletonParagraph}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonMedium}`}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonShort}`}></div>
      
      {/* Section title */}
      <div className={`${style.skeletonTitle} ${style.skeletonMedium}`} style={{marginTop: '1.5em'}}></div>
      
      {/* List items */}
      <div className={style.skeletonParagraph}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonShort}`}></div>
      <div className={style.skeletonParagraph}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonMedium}`}></div>
      
      {/* Code block */}
      <div className={style.skeletonCode}></div>
      
      {/* More content */}
      <div className={style.skeletonParagraph}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonShort}`}></div>
      
      {/* Table */}
      <div className={style.skeletonTable}></div>
      
      {/* Final section */}
      <div className={style.skeletonParagraph}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonMedium}`}></div>
      <div className={`${style.skeletonParagraph} ${style.skeletonShort}`}></div>
      <div className={style.skeletonParagraph}></div>
    </div>
  );

  return (
    <div 
      className={style.container}
      style={{ 
        width: '1200px', 
        maxWidth: 'calc(100vw - 2rem)', 
        margin: '0 auto',
        minHeight: '600px' // Reserve space immediately
      }}
    >
      <div className={style.header}>
        <h2 className={style.title}>Heavy Markdown Editor</h2>
        <p className={style.subtitle}>
          Demonstrates bundle splitting - this component adds 1.1MB of markdown libraries!
        </p>
      </div>
      
      <div 
        className={style.editorContainer}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          minHeight: '450px'
        }}
      >
        <div className={style.inputPanel}>
          <h3 className={style.panelTitle}>📝 Edit Markdown</h3>
          <textarea
            className={style.textarea}
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your markdown here..."
          />
        </div>
        
        <div 
          className={style.previewPanel}
          style={{
            minWidth: '0', // Prevent grid item from growing beyond 1fr
            width: '100%'
          }}
        >
          <h3 className={style.panelTitle}>👁️ Live Preview</h3>
          <div 
            className={style.preview}
            style={{
              height: '400px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {processedHtml ? (
              <div className={`${style.contentTransition} ${style.fadeIn}`}>
                <MarkdownViewer processedHtml={processedHtml} />
              </div>
            ) : isLoaded ? (
              <div className={`${style.contentTransition} ${style.fadeIn}`}>
                <div className={style.fallback}>
                  <h2>Markdown Preview</h2>
                  <pre>{markdown}</pre>
                </div>
              </div>
            ) : (
              <SkeletonLoader />
            )}
          </div>
        </div>
      </div>

      <div className={style.navigation}>
        <a href="/hello_world" className={style.link}>
          ← Back to Lightweight HelloWorld
        </a>
        <a href="/rsc_markdown_page" className={style.link}>
          → Try RSC Markdown Page
        </a>
        <div className={style.bundleInfo}>
          <strong>Bundle Impact:</strong> Heavy component with markdown libraries (~120KB transferred, 385KB resources in production)
        </div>
        {props.title && (
          <div className={style.bundleInfo} style={{marginTop: '0.5rem', fontSize: '0.85rem'}}>
            <strong>Content:</strong> {props.title}
            {props.author && <> by {props.author}</>}
            {props.lastModified && <> (updated {new Date(props.lastModified).toLocaleDateString()})</>}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeavyMarkdownEditor;
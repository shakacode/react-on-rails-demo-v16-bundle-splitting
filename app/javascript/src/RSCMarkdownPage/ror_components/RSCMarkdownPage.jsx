import React from 'react';
import { marked } from 'marked';
import MarkdownViewer from '../../MarkdownViewer/ror_components/MarkdownViewer';

/**
 * RSC (React Server Component) version of markdown display
 *
 * This component demonstrates Bob's shared component pattern:
 * - Heavy markdown processing (via 'marked' library) happens server-side
 * - The 'marked' library NEVER ships to the client
 * - Only the processed HTML is sent to the browser
 * - Uses the lightweight shared MarkdownViewer component for display
 *
 * Key benefits:
 * - Zero client-side JavaScript for markdown processing
 * - Faster initial page load
 * - Smaller client bundle size
 * - Server can access files, databases, etc.
 */
async function RSCMarkdownPage({ initialText, title, author, lastModified }) {
  // Default markdown content
  const defaultMarkdown = `# React Server Components Demo

## What's Happening Here?

This markdown is being **processed on the server** using the \`marked\` library.

The heavy markdown library (\`marked\`) is imported in this server component,
which means it:
- ✅ Runs only on the server
- ✅ Never ships to the client
- ✅ Keeps the client bundle size minimal

Compare this to the **HeavyMarkdownEditor** which processes markdown client-side
for live preview functionality.

## Shared Component Pattern

Both this RSC component and the HeavyMarkdownEditor use the same lightweight
\`MarkdownViewer\` component to display the processed HTML.

\`\`\`
Server Component (RSC)        Client Component (Editor)
     |                              |
     |--[imports marked]            |--[imports react-markdown]
     |--[processes MD]              |--[processes MD]
     |                              |
     +------[MarkdownViewer]--------+
            (lightweight, no deps)
\`\`\`

## Features Demonstrated

### GitHub Flavored Markdown

- [x] Task lists
- [x] Tables
- [x] Code blocks
- [ ] More features to come

### Code Highlighting

\`\`\`javascript
const serverComponent = async () => {
  // Heavy processing on server
  const html = await marked(markdown);
  return <MarkdownViewer processedHtml={html} />;
};
\`\`\`

### Tables

| Feature | Client-Side | Server-Side (RSC) |
|---------|-------------|-------------------|
| Bundle Size | Large (~1.1MB) | Minimal (~12KB) |
| Processing | Client | Server |
| Interactivity | High | Static |
| SEO | Good (after hydration) | Excellent (immediate) |

### Quotes

> "React Server Components represent a paradigm shift in how we think about
> bundle splitting and server/client boundaries." - React Team

## Try It Out!

1. Check the network tab - notice no markdown library is downloaded
2. View page source - the HTML is already rendered
3. Compare bundle sizes: this page vs HeavyMarkdownEditor
`;

  const markdown = initialText || defaultMarkdown;

  // Server-side markdown processing using 'marked'
  // This heavy library stays on the server and never ships to client
  const processedHtml = await marked(markdown, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .rsc-markdown-content h1,
        .rsc-markdown-content h2,
        .rsc-markdown-content h3 {
          color: #2c3e50;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rsc-markdown-content h1 {
          border-bottom: 2px solid #e67e22;
          padding-bottom: 0.3rem;
        }
        .rsc-markdown-content code {
          background-color: #f1c40f;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 0.9em;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        .rsc-markdown-content pre {
          background-color: #2c3e50;
          color: #ecf0f1;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }
        .rsc-markdown-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .rsc-markdown-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .rsc-markdown-content th,
        .rsc-markdown-content td {
          border: 1px solid #bdc3c7;
          padding: 0.5rem;
          text-align: left;
        }
        .rsc-markdown-content th {
          background-color: #ecf0f1;
          font-weight: bold;
        }
        .rsc-markdown-content blockquote {
          border-left: 4px solid #e67e22;
          margin: 1rem 0;
          padding-left: 1rem;
          color: #7f8c8d;
        }
        .rsc-markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
      ` }} />
      <div style={{
        padding: '1.5rem',
        width: '1200px',
        maxWidth: 'calc(100vw - 2rem)',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '1.8rem',
          marginBottom: '0.3rem',
          borderBottom: '3px solid #9b59b6',
          paddingBottom: '0.3rem',
        }}>
          RSC Markdown Page
        </h2>
        <p style={{
          color: '#7f8c8d',
          fontSize: '0.95rem',
          margin: 0,
          backgroundColor: '#e8daef',
          padding: '0.6rem',
          borderRadius: '4px',
          borderLeft: '4px solid #8e44ad',
        }}>
          Server-rendered markdown - processing happens on the server, zero client-side JS for markdown!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          padding: '0.8rem',
          border: '1px solid #ddd',
        }}>
          <h3 style={{
            color: '#2c3e50',
            fontSize: '1.1rem',
            marginBottom: '0.8rem',
            borderBottom: '2px solid #ecf0f1',
            paddingBottom: '0.4rem',
          }}>
            📄 Document Info
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {title && (
              <div style={{
                fontSize: '0.9rem',
                color: '#34495e',
                padding: '0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                borderLeft: '3px solid #9b59b6',
              }}>
                <strong style={{ color: '#8e44ad', display: 'block', marginBottom: '0.2rem' }}>Title:</strong>
                {title}
              </div>
            )}
            {author && (
              <div style={{
                fontSize: '0.9rem',
                color: '#34495e',
                padding: '0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                borderLeft: '3px solid #9b59b6',
              }}>
                <strong style={{ color: '#8e44ad', display: 'block', marginBottom: '0.2rem' }}>Author:</strong>
                {author}
              </div>
            )}
            {lastModified && (
              <div style={{
                fontSize: '0.9rem',
                color: '#34495e',
                padding: '0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                borderLeft: '3px solid #9b59b6',
              }}>
                <strong style={{ color: '#8e44ad', display: 'block', marginBottom: '0.2rem' }}>Last Modified:</strong>
                {new Date(lastModified).toLocaleDateString()}
              </div>
            )}
            <div style={{
              fontSize: '0.9rem',
              color: '#34495e',
              padding: '0.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              borderLeft: '3px solid #9b59b6',
            }}>
              <strong style={{ color: '#8e44ad', display: 'block', marginBottom: '0.2rem' }}>Rendered:</strong>
              Server-side (RSC)
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          padding: '0.8rem',
          border: '1px solid #ddd',
        }}>
          <h3 style={{
            color: '#2c3e50',
            fontSize: '1.1rem',
            marginBottom: '0.8rem',
            borderBottom: '2px solid #ecf0f1',
            paddingBottom: '0.4rem',
          }}>
            📖 Content
          </h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#fafafa',
            border: '1px solid #ecf0f1',
            borderRadius: '4px',
            maxHeight: '600px',
            overflowY: 'auto',
          }}>
            <MarkdownViewer processedHtml={processedHtml} className="rsc-markdown-content" />
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        paddingTop: '1rem',
        borderTop: '2px solid #ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        alignItems: 'center',
      }}>
        <a href="/hello_world" style={{
          display: 'inline-block',
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}>
          ← Back to Lightweight HelloWorld
        </a>
        <a href="/heavy_markdown_editor" style={{
          display: 'inline-block',
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}>
          View Client-Side Editor →
        </a>
        <div style={{
          color: '#8e44ad',
          fontSize: '0.9rem',
          backgroundColor: '#f4ecf7',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: '1px solid #9b59b6',
          maxWidth: '600px',
        }}>
          <strong>Bundle Impact:</strong> Minimal - markdown processing stays on server!
          The 'marked' library (&gt;120KB) never ships to the client.
        </div>
      </div>
      </div>
    </>
  );
}

export default RSCMarkdownPage;

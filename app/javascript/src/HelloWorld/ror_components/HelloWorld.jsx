"use client";

import React, { useState } from 'react';
import * as style from './HelloWorld.module.css';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Hello World Component</h2>
      <p className={style.subtitle}>Lightweight React component with minimal dependencies</p>
      
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="name">
          Say hello to:
        </label>
        <input 
          id="name" 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className={style.input}
          placeholder="Enter your name..."
        />
      </div>
      
      <div className={style.greeting}>
        Hello, <strong>{name}</strong>! 👋
      </div>

      <div className={style.navigation}>
        <a href="/heavy_markdown_editor" className={style.link}>
          → Try Heavy Markdown Editor
        </a>
        <a href="/rsc_markdown_page" className={style.link}>
          → Try RSC Markdown Page
        </a>
        <div className={style.bundleInfo}>
          <strong>Bundle Size:</strong> Minimal - just React basics (~10.0KB total in production)
        </div>
      </div>
    </div>
  );
};

// Props are passed from Rails view

export default HelloWorld;

import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import React from "react";

export default function App() {
  const editorRef = useRef(null);

  // Save content to localStorage
  const saveToLocalStorage = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      localStorage.setItem('autosavedContent', content);
      console.log('Content autosaved!');
    }
  };

  // Load content from localStorage
  const loadFromLocalStorage = () => {
    const savedContent = localStorage.getItem('autosavedContent');
    if (editorRef.current && savedContent) {
      editorRef.current.setContent(savedContent);
    }
  };

  // Add keyboard shortcuts (e.g., Ctrl + S to save content)
  const setupShortcuts = (editor) => {
    editor.addShortcut('ctrl+s', 'Save content', () => {
      saveToLocalStorage();
      alert('Content saved via Ctrl+S!');
    });
  };

  // Set up autosave functionality
  useEffect(() => {
    const savedItem = localStorage.getItem("autosavedContent");
    if (savedItem) {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setContent(savedItem);
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <Editor
        apiKey='pss4u5mw3st4m03ijp0wiw1c77hi0z4hx6l1h39xyoiisc99'
        onInit={(_evt, editor) => {
          editorRef.current = editor;
          loadFromLocalStorage(); // Load content after editor initialization
          setupShortcuts(editor); // Add keyboard shortcuts
        }}
        init={{
          height: 500,
          menubar: true,  // Enable the menubar
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'template'  // Make sure 'template' plugin is added here
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'template | removeformat | help',  // Add 'template' to the toolbar
          
          // Template configuration
          templates: [
            {
              title: 'Two Column Layout',
              description: 'A basic two-column layout with headers',
              content: '<div class="row"><div class="col"><h2>Left Column</h2></div><div class="col"><h2>Right Column</h2></div></div>'
            },
            {
              title: 'Quote Block',
              description: 'A blockquote with citation',
              content: '<blockquote><p>This is a blockquote.</p><footer>— Author</footer></blockquote>'
            }
          ],
          
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
          setup: (editor) => {
            editor.on('init', () => {
              console.log("TinyMCE is initialized with templates");  // Debug log to ensure plugin is initialized
            });
          }
        }}
      />
      <button onClick={() => console.log(editorRef.current.getContent())}>Log editor content</button>
    </>
  );
}

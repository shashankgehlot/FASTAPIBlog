// src/components/RichTextEditor.js
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import './editorstyle.css'; // Import the custom styles

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['code-block'],
    [{ 'align': [] }],
    ['clean'] // remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'code-block',
  'align'
];

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={content => {
          console.log('Editor Content:', content); // Log content for debugging
          onChange(content);
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;
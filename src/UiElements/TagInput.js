import { useState } from 'react';

function TagsInput({ tags, setTags }) {
    function handleKeyDown(e) {
        if (e.key !== ' ') return;
        const value = e.target.value.trim();
        if (!value) return;
        if (tags){
            if (tags.includes(value)) return;
        }
        // Prevent duplicate tags
        setTags([...tags, value]);
        e.target.value = '';
    }

    function removeTag(tagToRemove) {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    return (
        <div className="tags-input-container">
          <>
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <span className="close" onClick={() => removeTag(tag)}>&times;</span>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </>
          <input 
            onKeyDown={handleKeyDown} 
            type="text" 
            className="tags-input" 
            placeholder="Add Tags" 
            aria-label="Tag input"
          />
        </div>
      );
}

export default TagsInput;

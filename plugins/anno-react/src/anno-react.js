import React, { useRef, useState } from 'react';
import { Annotator, Annotation } from 'markerjs2';



function ImageAnnotator({ imageUrl, onSave }) {
    const annotatorRef = useRef(null);
    const [annotations, setAnnotations] = useState([]);
  
    const handleSave = () => {
      const svg = annotatorRef.current.toSVG();
      onSave(svg);
    };
  
    return (
      <div>
        <Annotator
          ref={annotatorRef}
          imageUrl={imageUrl}
          annotations={annotations}
          onChange={setAnnotations}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }

  function App() {
    const handleSave = (svg) => {
      console.log(svg); // Do something with the SVG markup
    };
  
    return (
      <div>
        <h1>Annotate the Image</h1>
        <ImageAnnotator imageUrl="https://example.com/image.jpg" onSave={handleSave} />
      </div>
    );
  }
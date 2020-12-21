import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Upload from './../../../assets/icon/Upload';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="">

      <div {...getRootProps({ className: 'dropzone' })} className="file-upload-wrapper">
        <div>
          <div>
            <Upload height={50} width={50} />

          </div>

          <input {...getInputProps()} />
          <p>فایل خود را اینجا بکشید یا انتخاب کنید</p>
          {thumbs}
        </div>

      </div>
      {/* <aside style={thumbsContainer}>
     
      </aside> */}
    </div>
  );
}

export default Previews;

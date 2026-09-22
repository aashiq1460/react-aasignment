import {useState} from 'react';
import {useNavigate} from 'react-router';

import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const {postFile} = useFile();
  const {postMedia} = useMedia();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      if (!file) {
        console.error('No file selected');
        return;
      }

      // 1. Upload the actual file to the upload server
      const fileResult = await postFile(file, token);

      console.log('File upload result:', fileResult);

      // Some API responses contain the file inside "data".
      const uploadedFile =
        fileResult.file ?? fileResult.data ?? fileResult;

      // 2. Save media information to the Media API
      const mediaResult = await postMedia(
        uploadedFile,
        inputs,
        token,
      );

      console.log('Media upload result:', mediaResult);

      // 3. Return to Home
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      console.log('Selected file:', selectedFile);

      setFile(selectedFile);
    }
  };

  return (
    <>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            value={inputs.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>

        {file && file.type.startsWith('image/') && (
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              width="200"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!file || inputs.title.length <= 3}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
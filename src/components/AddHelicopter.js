import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';
import '../css/addheli.css'; // Import the CSS file

const AddHelicopter = () => {
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = (file) => {
    if (file) {
      setImageUrl(file.cdnUrl); // Save the uploaded image URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!model || !capacity || !imageUrl) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage

      const response = await axios.post(
        'https://heli-91dn.onrender.com/helicopter',
        {
          model,
          capacity,
          image_url: imageUrl, // Send the image URL to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      setSuccess('Helicopter added successfully!');
      console.log('Helicopter Response:', response.data);

      // Clear form fields
      setModel('');
      setCapacity('');
      setImageUrl('');
    } catch (err) {
      console.error('Error adding helicopter:', err);
      setError(err.response?.data?.message || 'Failed to add helicopter. Please try again.');
    }
  };

  return (
    <div className="add-helicopter-container">
      <h2>Add Helicopter</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <FileUploaderRegular
            pubkey="2a4bb720cf8bcd6b97e7" // Replace with your Uploadcare public key
            onFileUploadSuccess={handleUpload}
            sourceList="local, camera, facebook, gdrive"
            cameraModes="photo, video"
            classNameUploader="uc-dark"
          />
        </div>
        {imageUrl && (
          <div className="uploaded-image">
            <h3>Uploaded Image:</h3>
            <img
              src={imageUrl}
              alt="Uploaded"
            />
          </div>
        )}
        <button type="submit">Add Helicopter</button>
      </form>
    </div>
  );
};

export default AddHelicopter;
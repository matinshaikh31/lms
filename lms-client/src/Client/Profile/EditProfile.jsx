import React, { useState } from 'react';

import toast from "react-hot-toast";
const EditProfile = ({ userData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    title: userData?.title || '',
    about: userData?.about || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    toast.success("SuccessFully Profile Update")
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-700">Edit Profile</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        placeholder="About Me"
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
import React, { useState } from 'react'
import "./AddGig.scss";
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import { useStateContext } from '../../context';
import Caver from "caver-js";
const caver = new Caver("https://rpc.ankr.com/klaytn");

const AddGig = () => {
  const navigate = useNavigate();

  const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
    if (img.complete) callback(true);
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };

  const { createGig } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    title: '',
    description: '',
    shortDescription: '',
    aboutSeller: '',
    imageURL: '',
    avatarURL: '',
    price: '', 
    category: 'graphics&design',
    deliveryTimeInDays: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.imageURL, async (exists) => {
      if(exists) {
          checkIfImage(form.avatarURL, async (exists) => {
            if (exists) {
              setIsLoading(true);
              await createGig({ 
                username: form.username,
                title: form.title,
                description: form.description,
                shortDescription: form.shortDescription,
                aboutSeller: form.aboutSeller,
                imageURL: form.imageURL,
                avatarURL: form.avatarURL,
                price: caver.utils.toPeb(form.price, "KLAY"),
                category: form.category,
                deliveryTimeInDays: form.deliveryTimeInDays,
              })
              setIsLoading(false);
              navigate('/');
            } else {
              alert('Provide valid avatar URL')
              setForm({ ...form, avatarURL: '' });
            }
        })
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, imageURL: '' });
      }
    })
  }


  return (
    <div className="addGig">
      {isLoading ? <Loader /> : (
      <div className="container">
        <h1>Create New Gig</h1>
        <form onSubmit={handleSubmit}>
          <div className="insideForm">
            <div className="leftSide">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="e.g. I will do something I'm really good at"
                value={form.title}
                onChange={(e) => handleFormFieldChange('title', e)}
                required
              />
              <label htmlFor="">Category</label>
              <select name="cats" id="cats" value={form.category} onChange={(e) => handleFormFieldChange('category', e)} required>
                <option value="graphics&design">Graphics & Design</option>
                <option value="digital_marketing">Digital Marketing</option>
                <option value="writing&translation">Writing & Translation</option>
                <option value="video&animation">Video & Animation</option>
                <option value="music&audio">Music & Audio</option>
                <option value="programming&tech">Programming & Tech</option>
                <option value="data">Data</option>
                <option value="business">Business</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="photography">Photography</option>
              </select>
              <label htmlFor="">Image URL</label>
              <input 
                type="text" 
                value={form.imageURL}
                onChange={(e) => handleFormFieldChange('imageURL', e)}
                required
              />
              <label htmlFor="">Short Description</label>
              <textarea 
                name="" 
                id="" 
                placeholder="Short description of your service" 
                cols="30" rows="2"
                value={form.shortDescription}
                onChange={(e) => handleFormFieldChange('shortDescription', e)}
                required
              ></textarea>
              <label htmlFor="">Description</label>
              <textarea 
                name="" 
                id="" 
                placeholder="Brief descriptions to introduce your service to customers" 
                cols="0" rows="16"
                value={form.description}
                onChange={(e) => handleFormFieldChange('description', e)}
                required
              ></textarea>
              <button type="submit"> Create </button>
            </div>
            <div className="rightSide">
              <label htmlFor="">Username</label>
              <input
                type="text"
                cols="30" rows="1"
                placeholder="e.g. Abish Issagulov" 
                value={form.username}
                onChange={(e) => handleFormFieldChange('username', e)}
                required
              ></input>
              <label htmlFor="">About Seller</label>
              <textarea
                type="text"
                cols="30" rows="2"
                placeholder="e.g. I am a Software Engineer with 5+ years of experience" 
                value={form.aboutSeller}
                onChange={(e) => handleFormFieldChange('aboutSeller', e)}
                required
              ></textarea>
              <label htmlFor="">Avatar Image URL</label>
              <input 
                type="text" 
                value={form.avatarURL}
                onChange={(e) => handleFormFieldChange('avatarURL', e)}
                required
              />
              <label htmlFor="">Delivery Time (e.g. 3 days)</label>
              <input type="number" value={form.deliveryTimeInDays}
                onChange={(e) => handleFormFieldChange('deliveryTimeInDays', e)} required/>
              <label htmlFor="">Price (e.g. 50 KLAY)</label>
              <input type="text" value={form.price}
                onChange={(e) => handleFormFieldChange('price', e)} required/>
            </div>
          </div>
        </form>
      </div> )}
    </div>
  );
};

export default AddGig;

'use client';

import classes from './image-picker.module.css';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();

  function handlePickerClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const image = event.target.files[0];
    if (!image) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickerClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

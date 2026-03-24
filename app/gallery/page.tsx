/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const IMAGES = [
  "first.JPG",
  "second.JPG",
  "third.JPG",
  "fourth.JPG",
  "fifth.JPG",
  "sixth.JPG",
  "seventh.JPG",
  "eight.JPG",
  "nine.JPG",
  "ten.JPG",
  "eleven.JPG",
  "twelve.JPG",
  "thirteen.JPG",
  "fourteen.JPG",
  "fifteen.JPG",
  "sixteen.JPG",
  "seventeen.JPG",
  "eighteen.JPG",
];

export default function GalleryPage() {
  return (
    <main style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      padding: "40px",
      color: "white"
    }}>
      
      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "2.5rem"
      }}>
        Gallery
      </h1>

      <div className="gallery">
        {IMAGES.map((img, i) => (
          <div key={i} className="card">
            <img
              src={`/gallery/${img}`}
              alt={`img-${i}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <style>{`
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .card {
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          background: #111;
        }

        .card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </main>
  );
}
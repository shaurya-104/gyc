/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const IMAGES = [
  "first.jpg",
  "second.jpg",
  "third.jpg",
  "fourth.jpg",
  "fifth.jpg",
  "sixth.jpg",
  "seventh.jpg",
  "eight.jpg",
  "nine.jpg",
  "ten.jpg",
  "eleven.jpg",
  "twelve.jpg",
  "thirteen.jpg",
  "fourteen.jpg",
  "fifteen.jpg",
  "sixteen.jpg",
  "seventeen.jpg",
  "eighteen.jpg",
];

export default function GalleryPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", padding: "40px" }}>
      
      <h1 style={{
        color: "white",
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "2.5rem"
      }}>
        Gallery
      </h1>

      <div className="gallery">
        {IMAGES.map((img, i) => (
          <div key={i} className="card">
            <img src={`/gallery/${img}`} alt={`img-${i}`} />
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
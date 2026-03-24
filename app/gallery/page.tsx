/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";

const IMAGES = [
  "first.JPG","second.JPG","third.JPG","fourth.JPG","fifth.JPG",
  "sixth.JPG","seventh.JPG","eight.JPG","nine.JPG","ten.JPG",
  "eleven.JPG","twelve.JPG","thirteen.JPG","fourteen.JPG",
  "fifteen.JPG","sixteen.JPG","seventeen.JPG","eighteen.JPG",
];

export default function GalleryPage() {
  return (
    <main style={{
      background: "#080C14",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "sans-serif"
    }}>

      {/* 🔥 NAVBAR */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        background: "rgba(8,12,20,0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 100
      }}>
        <Link href="/" style={{ textDecoration: "none", color: "#C9A84C", fontWeight: "bold" }}>
          ← Back
        </Link>

        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          GYC Gallery
        </span>

        <div></div>
      </nav>

      {/* 🔥 HEADER */}
      <div style={{
        paddingTop: "120px",
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "2.8rem",
          marginBottom: "10px"
        }}>
          Gallery
        </h1>
        <p style={{ color: "#aaa" }}>
          Moments from Global Youth Conclave
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="gallery">
        {IMAGES.map((img, i) => (
          <div key={i} className="card">
            <img src={`/gallery/${img}`} alt={`img-${i}`} />
          </div>
        ))}
      </div>

      {/* 🔥 STYLES */}
      <style>{`
        .gallery {
          padding: 0 30px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .card {
          overflow: hidden;
          border-radius: 14px;
          background: #111;
          cursor: pointer;
        }

        .card img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .card:hover img {
          transform: scale(1.08);
        }
      `}</style>
    </main>
  );
}
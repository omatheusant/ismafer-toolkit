'use client'

import React, { useState, useRef } from 'react';

const UnirImagens = () => {
  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagemCombinada, setImagemCombinada] = useState(null);
  const canvasRef = useRef(null);

  const unirImagens = async () => {
    if (imagem1 && imagem2) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const img1 = new Image();
      const img2 = new Image();

      const loadImage = (image, file) => {
        return new Promise((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = reject;
          image.src = URL.createObjectURL(file);
        });
      };

      await Promise.all([loadImage(img1, imagem1), loadImage(img2, imagem2)]);

      const maxWidth = 1700;
      const maxHeight = 1200;

      const scaledWidth1 = img1.width > maxWidth ? maxWidth : img1.width;
      const scaledHeight1 = (scaledWidth1 * img1.height) / img1.width;

      const scaledWidth2 = img2.width > maxWidth ? maxWidth : img2.width;
      const scaledHeight2 = (scaledWidth2 * img2.height) / img2.width;

      canvas.width = scaledWidth1 + scaledWidth2;
      canvas.height = Math.max(scaledHeight1, scaledHeight2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img1, 0, (canvas.height - scaledHeight1) / 2, scaledWidth1, scaledHeight1);
      ctx.drawImage(img2, scaledWidth1, (canvas.height - scaledHeight2) / 2, scaledWidth2, scaledHeight2);

      const combinedImage = canvas.toDataURL('image/jpeg', 1.0); // 'image/jpeg' com qualidade máxima (1.0)
      setImagemCombinada(combinedImage);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImagem1(e.target.files[0])} />
      <input type="file" onChange={(e) => setImagem2(e.target.files[0])} />
      <button onClick={unirImagens}>Unir Imagens</button>
      {imagemCombinada && (
        <div>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <img src={imagemCombinada} alt="Imagem Combinada" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default UnirImagens;

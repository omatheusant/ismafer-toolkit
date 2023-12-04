'use client'

import React, { useState, useRef } from 'react';

const UnirImagens = () => {
  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagemCombinada, setImagemCombinada] = useState(null);
  const canvasRef = useRef(null);

  const unirImagens = () => {
    if (imagem1 && imagem2) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const img1 = new Image();
      const img2 = new Image();

      img1.src = URL.createObjectURL(imagem1);
      img2.src = URL.createObjectURL(imagem2);

      img1.onload = () => {
        canvas.width = img1.width * 2; // Define a largura do canvas para mostrar ambas as imagens lado a lado
        canvas.height = img1.height;

        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, img1.width, 0);

        const combinedImage = canvas.toDataURL(); // Obtém a imagem combinada como um Data URL
        setImagemCombinada(combinedImage);
      };
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
          <img src={imagemCombinada} alt="Imagem Combinada" />
        </div>
      )}
    </div>
  );
};

export default UnirImagens;

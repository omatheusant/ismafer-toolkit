import React, { useState, useRef } from 'react';

const UnirImagens = () => {
  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagemCombinada, setImagemCombinada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef(null);

  const handleUnirImagens = () => {
    if (imagem1 && imagem2) {
      setIsLoading(true);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const img1 = new Image();
      const img2 = new Image();

      img1.onload = () => {
        canvas.width = img1.width + img2.width;
        canvas.height = Math.max(img1.height, img2.height);

        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, img1.width, 0);

        const combinedImage = canvas.toDataURL('image/png');
        setImagemCombinada(combinedImage);
        setIsLoading(false);
      };

      img1.src = URL.createObjectURL(imagem1);
      img2.src = URL.createObjectURL(imagem2);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImagem1(e.target.files[0])} />
      <input type="file" onChange={(e) => setImagem2(e.target.files[0])} />
      <button onClick={handleUnirImagens} disabled={isLoading}>
        Unir Imagens
      </button>
      {isLoading && <p>Processando...</p>}
      {imagemCombinada && (
        <div>
          <canvas ref={canvasRef} />
          <img src={imagemCombinada} alt="Imagem Combinada" />
        </div>
      )}
    </div>
  );
};

export default UnirImagens;

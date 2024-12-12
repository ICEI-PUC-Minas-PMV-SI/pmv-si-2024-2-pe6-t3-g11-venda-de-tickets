import React from "react";

const Base64Image = ({ base64String }) => {
  return (
    <div>
      {base64String ? (
        <img
          src={`data:image/png;base64,${base64String}`}
          alt="Imagem"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      ) : (
        <p>Imagem não disponível.</p>
      )}
    </div>
  );
};

export default Base64Image;
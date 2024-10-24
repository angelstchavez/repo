import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="">
      <Image
        src="/images/logo.png"
        alt="Cargando..."
        width={128}
        height={128}
        className="animate-breathing"
      />
    </div>
  );
};

export default Loading;

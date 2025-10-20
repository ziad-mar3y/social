import React from "react";

export default function PostBody({capton , image   }) {
  return ( <>
        {capton && <p className="my-3">{capton}</p>}
      {image && (
          <img
          src={image}
          className="w-full object-contain xs:h-70 sm:h-90 "
          alt={capton}
        />      )}
    </> 
  );
}

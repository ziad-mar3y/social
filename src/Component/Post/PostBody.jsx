import React from "react";

export default function PostBody({capton , image   }) {
  return ( <>
        {capton && <p className="my-3">{capton}</p>}
      {image && (
          <img
          src={image}
          className="w-full object-cover xs:h-50 sm:h-100  "
          alt={capton}
        />      )}
    </> 
  );
}

import React from "react";

function SectionTitleContainer({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
}

export default SectionTitleContainer;

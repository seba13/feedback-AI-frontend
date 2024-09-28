import React, { forwardRef } from "react";

export const CheckingAuth = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  console.log(ref); // Esto debería mostrar una referencia válida cuando se monte

  return <div ref={ref}></div>;
});

import { ChangeEvent } from "react";

export interface FormItems {
  input: string;
  value: string;
  label?: string;
}

export const Form = ({ formItems }: { formItems: FormItems[] }) => {
  console.log(formItems);



  return (
    <>
      <form>
        {formItems.map(({ input, label }, index) => {
          return (
            <div key={index}>
              {label && <span>{label}</span>}
              {input && (
                <input
                  type={input}
                  // value={value}
                  onChange={
                    input === "text" ||
                    input === "password" ||
                    input === "email"
                      ? (e: ChangeEvent<HTMLElement>) => {
                          console.log((e.target as HTMLInputElement).value);
                          console.log(e.target);
                        }
                      : undefined
                  }
                ></input>
              )}
            </div>
          );
        })}
      </form>
    </>
  );
};

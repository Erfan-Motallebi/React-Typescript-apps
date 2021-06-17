import React, { FormEvent } from "react";

import { useState, useContext, Fragment, createContext } from "react";

// files
import { gallary } from "../data/context";
import "../styles/contextAPI.css";

interface IMobelContextAPI {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

const mobelContext = createContext<IMobelContextAPI[] | null>(null);

interface IContext {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}
const FurnitureList: React.FC = (): JSX.Element => {
  const mobel = useContext(mobelContext);

  return (
    <Fragment>
      {mobel?.map((item: IContext): JSX.Element => {
        return <SingleFurniture key={item.id} {...item} />;
      })}
    </Fragment>
  );
};

const SingleFurniture = ({
  image,
  title,
  description,
  price,
}: IContext): JSX.Element => {
  return (
    <section>
      <div>
        <img src={image} alt={title} />
      </div>
      <div className="details">
        <h4>
          {title}
          <span>{price}</span>
        </h4>
        <p>{description}</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          rerum, nisi quod magni voluptatum aspernatur eum libero quas totam
          dolorem eos, placeat, veniam quasi iste repellat consectetur
          blanditiis veritatis adipisci!
        </p>
      </div>
      <div className="button-box">
        <button className="btn right" type="button">
          Add to Card
        </button>
        <button
          className="btn"
          type="button"
          onClick={(e: FormEvent<HTMLButtonElement>): void =>
            alert("Will be removed")
          }
        >
          remove
        </button>
      </div>
    </section>
  );
};

export default function ContextAPI(): JSX.Element {
  const [mobel, setMobel] = useState<IContext[]>(gallary);

  return (
    <mobelContext.Provider value={mobel}>
      <main>
        <FurnitureList />
      </main>
    </mobelContext.Provider>
  );
}

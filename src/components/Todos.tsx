import React, { useState, FormEvent } from "react";

import { todoList } from "../data/todoList";
import "../styles/todo.css";

type Button = FormEvent<HTMLButtonElement>;
type Todo = {
  id: number;
  name: string;
  details: string;
  email: string;
  complete: boolean;
};

export default function Todos() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(todoList);

  const submitHandler = (e: Button): void => {
    e.preventDefault();
    const newTodoList: Todo[] = [
      ...todos,
      {
        id: todos.length + 1,
        name,
        details,
        email,
        complete: false,
      },
    ];
    setTodos(newTodoList);
    setName("");
    setDetails("");
    setEmail("");
  };

  const completeAction = (index: number, e: Button): void => {
    e.preventDefault();
    const newTodoCompleteAction: Todo[] = [...todos];
    newTodoCompleteAction[index].complete =
      !newTodoCompleteAction[index].complete;
    setTodos(newTodoCompleteAction);
  };

  const remove = (todoId: number, e: Button) => {
    const oldTodoList: Todo[] = [...todos];
    const changedOldTodoList = oldTodoList.filter(({ id }) => {
      return id !== todoId;
    });
    setTodos(changedOldTodoList);
  };

  return (
    <div className="container">
      <form>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e): void => setName(e.target.value)}
          placeholder="Your Name"
        />
        <br />
        <input
          type="text"
          name="details"
          id="details"
          value={details}
          placeholder="Your details"
          onChange={(e): void => setDetails(e.target.value)}
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Your Email"
          onChange={(e): void => setEmail(e.target.value)}
        />
        <br />
        <button type="submit" className="add" onClick={submitHandler}>
          Add
        </button>
      </form>
      <article>
        {todos.map((todos: Todo, index) => {
          return (
            <section key={index}>
              <h1>
                <span>{todos.name}</span>
                <span
                  style={{
                    textDecoration: todos.complete ? "line-through" : "",
                  }}
                >
                  {todos.details}
                </span>
                <span>{todos.email}</span>
                <div>
                  <button
                    className="condition"
                    onClick={(e) => completeAction(index, e)}
                  >
                    {todos.complete ? "complete" : "incomplete"}
                  </button>
                  <button
                    className="remove"
                    type="button"
                    onClick={(e) => remove(todos.id, e)}
                  >
                    remove
                  </button>
                </div>
              </h1>
            </section>
          );
        })}
      </article>
    </div>
  );
}

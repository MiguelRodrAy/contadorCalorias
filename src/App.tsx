import Form from "./components/Form";
import { useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";

function App() {

  const initialState = {
    activities: [],
  };

  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <header className="bg-primary py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-3xl font-bold text-white uppercase">
            Contador de calorias
          </h1>

          <button className="text-white font-bold text-base bg-red-600 p-2 rounded-md uppercase disabled:opacity-15 flex">
            <div>Reiniciar Aplicación</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-counterclockwise ml-1 mt-1"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
            </svg>
          </button>
        </div>
      </header>

      <section className="bg-primary-light py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch}/>
        </div>
      </section>
    </>
  );
}

export default App;

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";

import { useActivity } from "../hooks/useActivity";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: "",
};

const Form = () => {
  const [activity, setActivity] = useState<Activity>(initialState);

  const { state, dispatch } = useActivity();

  useEffect(() => {
    if (state.activeId) {
      const activeActivity = state.activities.find(
        (activity) => activity.id === state.activeId
      );

      setActivity(activeActivity ? activeActivity : initialState);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    const isNumber = ["category", "calories"].includes(id);

    setActivity({
      ...activity,
      [id]: isNumber ? (value ? +value : "") : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.activeId) {
      dispatch({
        type: "UPDATE_ACTIVITY",
        payload: {
          updatedActivity: { ...activity, calories: activity.calories },
        },
      });
      return;
    } else {
      dispatch({
        type: "SAVE_ACTIVITY",
        payload: { newActivity: { ...activity, calories: activity.calories } },
      });
    }

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim().length > 0 && +calories > 0;
  };

  return (
    <form
      className='space-y-3 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='category' className='font-bold text-text'>
          Categoria
        </label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          id='category'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='name' className='font-bold text-text'>
          Actividad:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          id='name'
          type='text'
          placeholder='Ej. Cena, Almuerzo, Sesión de ejercicio'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='calories' className='font-bold text-text'>
          Calorías aproximadas:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          id='calories'
          type='number'
          placeholder='Ej. 100, 300, 500'
          value={activity.calories || ""}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-secondary hover:bg-secondary-light 
          text-white font-bold w-full p-2 rounded-lg cursor-pointer 
          disabled:opacity-50 disabled:cursor-not-allowed'
        value={
          state.activeId
            ? "Actualizar"
            : activity.category === 1
            ? "Guardar comida"
            : "Guardar ejercicio"
        }
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;

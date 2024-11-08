import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions> 
};

const Form = ({dispatch} : FormProps) => {
    const [activity, setActivity] = useState<Activity>({
      category: 1,
      name: "",
      calories: 0
    });
    
    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumber = ['category', 'calories'].includes(e.target.id);
      
        setActivity({ ...activity, [e.target.id]: isNumber ? +e.target.value : e.target.value });
    }

    const hanleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch({ type: "SAVE_ACTIVITY", payload: { newActivity: activity } });
    }

    const isValidActivity = () => {
      const {name, calories} = activity;
      return name.trim().length > 0 && calories > 0;
    }

    return (
    <form className="space-y-3 bg-white shadow p-10 rounded-lg" onSubmit={hanleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" className="font-bold">
          Categoria
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
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

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="name"
          type="text"
          placeholder="Ej. Cena, Almuerzo, Sesión de ejercicio"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías aproximadas:
        </label>
        <input
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="calories"
          type="number"
          placeholder="Ej. 100, 300, 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-secondary hover:bg-secondary-light text-white font-bold w-full p-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;

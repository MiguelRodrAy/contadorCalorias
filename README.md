# Proyecto 3 - Contador de Calorías

Este tercer proyecto consiste en implementar una aplicación CRUD en la que los
usuarios puedan añadir, editar y eliminar alimentos o actividades físicas junto
con la aproximación de calorías consumidas/quemadas, y ver un cálculo del
balance calórico en tiempo real.

En este caso se utiliza un `Reducer` de React para gestionar las operaciones de
estado del contador de calorías, lo que permite una estructura de código más
limpia y fácil de escalar.

## Código del reducer utilizado (activity-reducer)

### Definición de las acciones posibles que se pueden realizar en el contador de calorías junto con sus payloads

```typescript
export type ActivityActions =
  | { type: "SAVE_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "UPDATE_ACTIVITY"; payload: { updatedActivity: Activity } }
  | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "RESET_ACTIVITIES" };
```

### Estado inicial del reducer a partir del almacenamiento local de la aplicación

```typescript
export const initialState: ActivityState = {
  activities: localActivities(),
  activeId: "",
};
```

### Implementación de activity-reducer

```typescript
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "SAVE_ACTIVITY":
      return {
        ...
      };

    case "SET_ACTIVE_ACTIVITY":
      return {
        ...
      };

    case "UPDATE_ACTIVITY":
      return {
        ...
      };

    case "DELETE_ACTIVITY":
      return {
        ...
      };

    case "RESET_ACTIVITIES":
      return {
        ...
      }
    }

    default:
      return state;
  }
};
```
## Actualización: Integración con Context API

Para mejorar la gestión del estado de la aplicación y facilitar el acceso al estado desde distintos componentes evitando que se pase a estos por props, se ha implementado el uso de Context API.


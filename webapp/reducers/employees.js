

const initialState =  {
    employees:[]
}


function employees(state = initialState, action) {

    switch(action.type) {
        case 'ADD_EMPLOYEE':
            return Object.assign({}, state, {
                employees: [
                    ...state.employees,
                    {
                        id: action.id,
                        name: action.name
                    }
                ]
            })
    }

    return state;

}
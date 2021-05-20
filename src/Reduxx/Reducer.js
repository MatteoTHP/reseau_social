import Cookies from 'js-cookie'

const id = Cookies.get('id')

const initialState= {
  user: id, // valeurs par defaut, si pas d'actions
  token: Cookies.get('token'),
  data: [],
  isChecked: id ? true : false
}

const userReducer = (state = initialState, action) => {  // le bateau arrive dans action
  switch (action.type) {
    case 'NEW_USER_SUCCESS':
      return {
        ...state,
        user: action.data.user.id,  // ecrase les valeurs des cookies
        token: action.data.jwt,
        isChecked: action.checked,
        data: action.data,
      }
      default: 
        return state;
  }
}

export default userReducer;

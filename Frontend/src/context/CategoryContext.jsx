import React, { createContext, useState } from 'react'

export const CategoryDataContext = createContext();

const CategoryContext = ({children}) => {
  const [category, setCategory] = useState();
  return (
    <CategoryDataContext.Provider value={{category, setCategory}}>
      {children}
    </CategoryDataContext.Provider>
  )
}

export default CategoryContext;
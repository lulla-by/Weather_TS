import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from 'store/weatherReducer';
import classes from "./Search.module.css"
import Button from 'ui/Button';

const Search = () => {
  const [region, setRegion] = useState("")
  const dispatch = useDispatch();

  const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value)
  }

  const weatherChangeHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(weatherActions.isLoadingChange(true))
    dispatch(weatherActions.regionChange(region));
    setRegion("")
  };

  return (
    <form className={classes.container} onSubmit={weatherChangeHandler}>
      <input className={classes.search} placeholder="지역명을 검색하세요!" value={region} onChange={inputChangeHandler} />
      <Button type='submit'>Search</Button>
    </form>
  )
}

export default Search
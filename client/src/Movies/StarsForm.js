import React, { useState, useEffect } from 'react';

const StarsForm = props => {
  const { stars, setMovie } = props;
  const [formState, setFormState] = useState([]);

  console.log({ formState });

  useEffect(() => {
    setFormState(
      stars.map((star, i) => {
        return { i: star };
      })
    );
  });

  const handleChange = e => {
    e.preventDefault();
    setFormState([...formState, { [e.target.name]: e.target.value }]);
  };

  return (
    <form>
      {formState.map((star, i) => {
        return (
          <label htmlFor={i}>
            <input
              type="text"
              name={star.i}
              value={star.i}
              onChange={e => handleChange(e)}
            />
          </label>
        );
      })}
    </form>
  );
};

export default StarsForm;

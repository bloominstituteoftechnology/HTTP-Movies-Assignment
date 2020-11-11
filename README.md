# HTTP Movies

## Instructions

### Task 1: Project Setup 

- **Fork** this repository, then clone your fork.
- Run `npm install` to download dependencies.
- Run the server using `npm start`.
- In a separate terminal cd into the `client` folder and run `npm install` to download dependencies.
- Still inside the `client` folder run `npm start` to run the client application.

### Task 2: MVP

#### Updating A Movie:

- Add a route at the path `/update-movie/:id`
- Create a component with a form to update the chosen movie
- Add a button in the movie component that routes you to your new route with the movies's id as the URL param
- The form should make a PUT request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list
- (Editing the movie stars can be a stretch problem... don't worry about it now. Move on to the next step, and come back and solve this at the end)

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

#### Deleting A Movie:

- Add a delete button in the movie component that makes a DELETE request
- When the call comes back successfully, route the user to `/movies` where they will see the updated movie list without the deleted movie

#### Adding A Movie:

- Add a route at the path `/add-movie`
- Create a component with a form to add a new movie
- Each created movie should have the following format (notice the array of strings - this will test your JS skills, so work through it methodically)
- The form should make a POST request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies`

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

### Task 3: Stretch Problem

- Add the ability to update the stars of a movie within a single text input field (think about how to change from an array of strings to a single string, then back to an array of strings)
- See Part 3 above (Adding movies with a POST request)
- Style the app!

## Submission Format
* [x] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's  Repo). **Please don't merge your own pull request**

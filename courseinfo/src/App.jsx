const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = ({ parts }) => {
  console.log("Entered Total component with props:", parts);
  const sumOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  console.log("Total sum of all exercises are:", sumOfExercises);

  return <p>Number of exercises {sumOfExercises}</p>;
};

const Part = ({ part, exercises }) => {
  console.log("Entered Part Component:", part, exercises);

  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log("Entered Content Component:", parts);

  const rows = parts.map((part) => {
    return <Part key={part.id} part={part.name} exercises={part.exercises} />;
  });

  return <div>{rows}</div>;
};

const Course = ({ course }) => {
  console.log("Entered Course Component with props:", course);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;

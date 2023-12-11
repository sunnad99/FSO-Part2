const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = (props) => {
  return <p>Number of exercises {props.sumOfExercises}</p>;
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

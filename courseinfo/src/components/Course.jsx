const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Total = ({ parts }) => {
  console.log("Entered Total component with props:", parts);
  const sumOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  console.log("Total sum of all exercises are:", sumOfExercises);

  return (
    <p>
      <strong>Number of exercises {sumOfExercises}</strong>
    </p>
  );
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

export default Course;

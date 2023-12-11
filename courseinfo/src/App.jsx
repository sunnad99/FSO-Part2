const Header = (props) => {
  return <h2>{props.course}</h2>;
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

const Syllabus = ({ courses }) => {
  console.log("Entered Syllabus Components with props:", courses);

  const rows = courses.map((course) => (
    <Course key={course.id} course={course} />
  ));

  return <>{rows}</>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web Development Curriculum</h1>
      <Syllabus courses={courses} />
    </>
  );
};

export default App;

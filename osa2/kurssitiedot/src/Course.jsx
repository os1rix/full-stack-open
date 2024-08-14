const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Parts = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Total = ({ parts }) => (
  <p>
    <b>
      total of {parts.map((part) => part.exercises).reduce((i, j) => i + j)}
      &nbsp;exercises
    </b>
  </p>
);

export default Course;

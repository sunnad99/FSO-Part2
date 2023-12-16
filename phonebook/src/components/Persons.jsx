const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  console.log("Entered Persons component:", persons);
  return persons.map((person) => <Person key={person.name} person={person} />);
};

export default Persons;

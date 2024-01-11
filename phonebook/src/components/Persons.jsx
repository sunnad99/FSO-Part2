import personService from "../services/persons";

const Person = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => onDelete(person)}>delete</button>
    </p>
  );
};

const Persons = ({ persons, renderPersons, renderNotification }) => {
  console.log("Entered Persons component:", persons);

  const deletePerson = (person) => {
    // If "Ok" is pressed, delete value from server AND re-render the persons' array without the deleted person
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then((response) => {
        console.log("successfully deleted value from the server!");

        // Render notification to let the user know when a successful operation has taken place
        renderNotification({
          content: `Successfully deleted ${person.name} from the server!`,
          isError: false,
        });
        setTimeout(() => {
          renderNotification(null);
        }, 5000);

        renderPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return persons.map((person) => (
    <Person key={person.name} person={person} onDelete={deletePerson} />
  ));
};

export default Persons;

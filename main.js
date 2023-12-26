const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

// function Counter(props) {
//   const {item : {id, number}, hdlUpdate} = props
function Counter({ item: { id, number }, hdlUpdate, counters, setCounters }) {
  const handleDelete = () => {
    const filteredCounters = counters.filter((counter) => counter.id !== id);
    setCounters(filteredCounters);
  };

  return (
    <div className='counter'>
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3 className='red-text'>{number}</h3> 
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={handleDelete}> X </button>
    </div>
  );
}

function SumInfo({ counters }) {
  const sum = counters.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <div className='suminfo'>
    <h1 className='red2-text'>Sum = {sum}</h1>
  </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    const index = cloneCounters.findIndex((el) => el.id === id);

    if (cloneCounters[index].number + num < 0) {
      return;
    }

    cloneCounters[index].number += num;
    setCounters(cloneCounters);
  };

  const handleAddCounter = () => {
    const newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
  };

  return (
    <>
      <h1 className='text-center'>Codecamp Academy 01</h1>
      <button className='text-center' onClick={handleAddCounter}>
        Add Counter
      </button>
      <SumInfo counters={counters} />

      {counters.map((el) => (
        <Counter
          key={el.id}
          item={el}
          hdlUpdate={hdlUpdate}
          counters={counters}
          setCounters={setCounters}
        />
      ))}
    </>
  );
}

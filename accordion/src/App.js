import logo from "./logo.svg";
import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  const data = [
    {
        "id": 1,
        "header": "Accordion 1",
        "body": "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    },
    {
        "id": 2,
        "header": "Accordion 2",
        "body": "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    },
    {
        "id": 3,
        "header": "Accordion 3",
        "body": "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    }
]
  return (
    <div className="App">
      <Accordion>
        <Accordion.Title>Frequent Accordion</Accordion.Title>
        {data.map((datum) => {
            return (
              <Accordion.Item key={datum.id}>
                <Accordion.Header onToggle={(state)=> {console.log(state)}}>{datum.header}</Accordion.Header>
                <Accordion.Body>{datum.body}</Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
}

export default App;

import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([])

  useEffect( () => {
    api.get('/repositories').then(response => {
        setProjects(response.data)
    })
  }, []);


  async function handleAddRepository() {
    // TODO

    const response = await api.post('/repositories',{
      title:`Go stack ${Date.now()}`,
      url:"https://github.com/jailsonmatz/gostack-conceitos-reactjs",
      techs: ["node","react","reatNative"]
    })

  const project = response.data;

  setProjects([...projects, project]);


  }

  async function handleRemoveRepository(id) {
    // TODO

    api.delete(`/repositories/${id}`);
    setProjects(projects.filter(project => project.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map( project => {
          return(
            <li key={project.id} > 
              {project.title} 
              <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import NotesList from './NotesList/NotesList';
import NotePage from './NotePage/NotePage';
import MainFolders from './MainFolders/MainFolders';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulContext from './NotefulContext';
import NotesError from './ErrorHandling/NotesError';
import SidebarError from './ErrorHandling/NotesError';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: [],
      selectedNotes: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(folders => this.setState({folders: folders}))
    .catch(error => this.sestState( {error}));

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(notes => this.setState({notes: notes}))
    .catch(error => this.setState( {error}));
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      selectedNotes: this.state.notes,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <h1>
              <Link 
                to='/'
              >Noteful</Link>
            </h1>
          </header>
          <main>
            <NotesError>
              <Route
                  exact
                  path='/'
                  component={NotesList}
              />
            </NotesError>
            <NotesError>
              <Route
                path='/note/:noteID'
                component={NotePage}
              />
            </NotesError>
            <NotesError>
              <Route
                path='/folder/:folderID'
                component={MainFolders}
              />
            </NotesError>
            <NotesError>
              <Route
                path='/add-folder'
                component={AddFolder}
              />
            </NotesError>
            <NotesError>
              <Route
                path='/add-note'
                component={AddNote}
              />
            </NotesError> 
          </main>
    
          <section className="sidebar">
            <SidebarError>
              <Route
                path='/'
                component={Sidebar}
              />
            </SidebarError>   
          </section>
        </div>
      </NotefulContext.Provider>         
    );
  }
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { NewNoteForm } from './components/create-note';
import { Notes } from './components/display-note';
import { getData } from './utils/data';
import './styles/style.css';

let backUpNotes
let backUpArchives

function SearchBox({onSearch}){
    return <input className='searchBox' type='text' onChange={onSearch} placeholder='Cari di catatan...'></input>
}

function Header({onSearch}){
    return <div>
        <div id='nav'>
            <h1>Notes</h1>
            <SearchBox onSearch={onSearch}/>
        </div>
        <hr/>
    </div>    
}

function Body({onAddNoteHandler, notes, onDelete, archives, onArchive, onUnarchive}){
    return <div id='bodyApp'>
        <NewNoteForm onAddNoteHandler={onAddNoteHandler}/>
        <Notes header={'Catatan Aktif'} command={'Arsipkan'} notes={notes} onDelete={onDelete} onArchive={onArchive}/>
        <Notes header={'Catatan Arsip'} command={'Aktifkan'} notes={archives} onDelete={onDelete} onArchive={onUnarchive}/>
    </div>
}

class NoteApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            notes : getData().filter((note)=>!note.archived),
            archives : getData().filter((archive)=>archive.archived),
            searched: false,
        }
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
        this.onDeleteHandler = this.onDeleteHandler.bind(this)
        this.onArchiveHandler = this.onArchiveHandler.bind(this)
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this)
        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this)
    }
    onAddNoteHandler({title, body}){
        if(this.state.searched){ 
            const notes = backUpNotes
            const archives = backUpArchives
            const searched = false
            this.setState(()=>{
                const current = new Date()
                return{
                    notes: [
                        ...notes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            createdAt: current.toISOString(),
                            archived: false,
                        }
                    ],
                    archives,
                    searched
                }
            })            
        }
        else{
            this.setState((prevState)=>{
                const current = new Date()
                return{
                    notes: [
                        ...prevState.notes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            createdAt: current.toISOString(),
                            archived: false,
                        }
                    ]
                }
            })
        }
        
    }
    onDeleteHandler(id) {
        if(!this.state.searched){
            const notes = this.state.notes.filter(note => note.id !== id)
            const archives = this.state.archives.filter(note => note.id !== id)
            this.setState({notes, archives})
        }
        else{
            const notes = backUpNotes.filter(note => note.id !== id)
            const archives = backUpArchives.filter(note => note.id !== id)
            const searched = false
            this.setState({notes, archives, searched})
        }
        
    }
    onArchiveHandler(id){
        if(!this.state.searched){
            const find = this.state.notes.find(note => note.id === id)
            find.archived = true
            this.setState((prevState) => {
                return{
                    notes: this.state.notes.filter((note)=>!note.archived),
                    archives: [
                        ...prevState.archives, find
                    ]
                }
            });
        }
        else{
            const find = backUpNotes.find(note => note.id === id)
            find.archived = true
            const searched = false
            this.setState(() => {
                return{
                    notes: backUpNotes.filter((note)=>!note.archived),
                    archives: [
                        ...backUpArchives, find
                    ],
                    searched
                }
            });
        }
        
    }
    onUnarchiveHandler(id){
        if(!this.state.searched){
            const find = this.state.archives.find(archive => archive.id === id)
            find.archived = false
            this.setState((prevState) => {
                return{
                    notes: [
                        ...prevState.notes, find
                    ],
                    archives: this.state.archives.filter((archive)=>archive.archived)
                }
            });
        }
        else{
            const find = backUpArchives.find(archive => archive.id === id)
            find.archived = false
            const searched = false
            this.setState(() => {
                return{
                    notes: [
                        ...backUpNotes, find
                    ],
                    archives: backUpArchives.filter((archive)=>archive.archived),
                    searched
                }
            });
        }
        
    }
    onSearchChangeHandler(event){
        if(!this.state.searched){ 
            backUpNotes = this.state.notes
            backUpArchives = this.state.archives
        }
        const notes = backUpNotes.filter((note)=> note.title.toLowerCase().includes(event.target.value.toLowerCase()) || note.body.toLowerCase().includes(event.target.value.toLowerCase()))
        const archives = backUpArchives.filter((archive)=> archive.title.toLowerCase().includes(event.target.value.toLowerCase()) || archive.body.toLowerCase().includes(event.target.value.toLowerCase()))
        const searched = true
        this.setState({notes, archives, searched})        
    }
    render(){
        return <div>
            <Header onSearch={this.onSearchChangeHandler}/>
            <Body onAddNoteHandler={this.onAddNoteHandler} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} onUnarchive={this.onUnarchiveHandler} notes={this.state.notes} archives={this.state.archives}/>
        </div>
    }    
}

const root = createRoot(document.getElementById('root'));
root.render(<NoteApp/>);
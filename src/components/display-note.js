import React from 'react'
import { formattedDate } from '../utils/date'

function DeleteButton({onDelete, id}){
    return <button className='deleteButton' onClick={() => onDelete(id)}>Hapus</button>
}

function ArchiveButton({onArchive, id, command}){
    return <button className='archiveButton' onClick={() => onArchive(id)}>{command}</button>
}

function NoteItem__Action({onDelete, onArchive, id, command}){
    return <div className='noteItemAction'>
        <DeleteButton onDelete={onDelete} id={id}/>
        <ArchiveButton onArchive={onArchive} id={id} command={command}/>
    </div>
}

function NoteItem__Title({title}){
    return <h3>{title}</h3>
}

function NoteItem__Date({date}){
    var d  = formattedDate(date);
    return <p>{d}</p>
}

function NoteItem__Body({body}){
    return <p>{body}</p>
}

function NoteItem({note, onDelete, onArchive, command}){
    return (
        <div className='noteItem'>
            <div className='noteItemContent'>
                <NoteItem__Title title={note.title}/>
                <NoteItem__Date date={note.createdAt}/>
                <NoteItem__Body body={note.body}/>
            </div>            
            <NoteItem__Action onDelete={onDelete} onArchive={onArchive} id={note.id} command={command}/>
        </div>
    )
}

function NoteList({notes, onDelete, onArchive, command}){
    return(
        <div className='noteList'>
            {notes.map((note)=>(
            <NoteItem note={note} onDelete={onDelete} onArchive={onArchive} key={note.id} command={command}></NoteItem>
            ))}
        </div>
    )
}

class Notes extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        if(this.props.notes.length !== 0){
            return(
                <div id='notes'>
                    <h1>{this.props.header}</h1>
                    <NoteList notes={this.props.notes} onDelete={this.props.onDelete} onArchive={this.props.onArchive} command={this.props.command}/>
                </div>
            )
        }
        else{
            return(
                <div id='notes'>
                    <h1>{this.props.header}</h1>
                    <p>{this.props.header + ' Tidak Ada'}</p>
                </div>
            )
        }
    }
}

export {Notes}
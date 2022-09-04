import React from 'react';

function InputTitle({onTitleChangeHandler}){
    return (
        <input className='inputTitle' type='text' placeholder='Buat judul..' onChange={onTitleChangeHandler}></input>
    )
}

function InputBody({onBodyChangeHandler}){
    return (
        <textarea className='inputBody' type='text' placeholder='Masukkan catatan anda..' onChange={onBodyChangeHandler}></textarea>
    )
}

function SubmitButton(){
    return(
        <button className='submitButton' type='submit'>Buat</button>
    )
}

class NewNoteForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : '',
            body : '',
            charLimit: 50
        }
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this)
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }
    onTitleChangeHandler(event){
        this.setState(()=>{
            if(event.target.value.length>=this.state.charLimit){ 
                window.alert("Judul melebihi 50 karakter")
            }
            else{
                return{
                    title: event.target.value
                }
            }
            
            
        })
    }
    onBodyChangeHandler(event){
        this.setState(()=>{
            return{
                body: event.target.value
            }
        })
    }
    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.onAddNoteHandler(this.state);
    }

    render(){
        return(
            <form onSubmit={this.onSubmitEventHandler} id='formInput'>
                <h1>Buat Catatan</h1>
                <InputTitle onTitleChangeHandler={this.onTitleChangeHandler}/>
                <br/>
                <InputBody onBodyChangeHandler={this.onBodyChangeHandler}/>
                <br/>
                <SubmitButton/>
            </form>
        )
    }
}

export {NewNoteForm}
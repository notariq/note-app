import { React, useState, useEffect } from "react";
import "../App.css"
import NoteCard from "./NoteCard";

function Notes() {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const [values, setValues] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        // Retrieve data from localStorage on component mount
        const storedValues = JSON.parse(localStorage.getItem("notes"));
        if (storedValues) {
          setValues(storedValues);
        }
      }, []);
    
      useEffect(() => {
        // Save data to localStorage whenever 'values' changes
        localStorage.setItem("notes", JSON.stringify(values));
      }, [values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => {
          return {
            ...prevNote,
            [name]: value
          };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!note.title || !note.content) {
            alert("Masukkan Judul dan Isi");
            return;
        }
      
        if (editIndex === -1) {
            setValues((prevValues) => [...prevValues, note]);
        } else {
            const updatedItems = [...values];
            updatedItems[editIndex] = {
                title: note.title,
                content: note.content
            };
            setValues(updatedItems);
            setEditIndex(-1);
        }
      
        setNote({
            title: "",
            content: ""
        });
    };

    const deleteNote = (id) => {
        setValues((prevValues) => prevValues.filter((_, index) => index !== id));
    };
      
    const EditNote = (id) => {
        setEditIndex(id);
        setNote({
            title: values[id].title,
            content: values[id].content
        });
    };

    return (
        <div className="main">
            <div className="create-note-container">
                <form className="create-note" action="">
                    <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Judul..."
                        type="text"
                    />
                    <textarea
                        name="content"
                        onChange={handleChange}
                        value={note.content}
                        placeholder="Isi..."
                        rows={5}
                        type="text"
                    />

                    <button onClick={handleSubmit}>
                        {editIndex === -1 ? "Create" : "Update"}
                    </button>
                </form>
            </div>
    
            {values &&
                values.map((item, index) => {
                return (
                    <NoteCard
                    key={index}
                    id={index}
                    title={item.title}
                    content={item.content}
                    onDelete={deleteNote}
                    onEdit={() => EditNote(index)}
                    />
                );
            })}
        </div>
    );
}
export default Notes;

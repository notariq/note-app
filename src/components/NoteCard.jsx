import { React } from "react";
import "../App.css";

const NoteCard = ({ id, title, content, onDelete, onEdit }) => {
    return (
      <div className="note">
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="note-footer">
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
      </div>
    );
  };
export default NoteCard;
'use client'
import { useEffect } from "react";

const Buttons = () => {
    
    useEffect(() => {

    document.querySelectorAll('.buttonlikeus').forEach(button => button.addEventListener('click', e => {
        if(!button.classList.contains('deletelikeus')) {
                button.classList.add('deletelikeus');
                setTimeout(() => button.classList.remove('deletelikeus'), 3200);
            }
            e.preventDefault();
        }));
        
    }, [])
    
  return (
    <>
  <button className="buttonlikeus">
    <div className="trashlikeus">
      <div className="toplikes">
        <div className="paperlikeus" />
      </div>
      <div className="boxlikeus" />
      <div className="checklikeus">
        <svg viewBox="0 0 8 6">
          <polyline points="1 3.4 2.71428571 5 7 1" />
        </svg>
      </div>
    </div>
    <span>Trash this</span>
  </button>

    
    </>
  )
}

export default Buttons
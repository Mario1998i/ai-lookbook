import { useState, useEffect } from "react"
import "../components/History.css";

export default function History() {

    const [evaluations, setEvaluations] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/get-evaluations.php")
        .then(response => response.json())
        .then(data => {setEvaluations(data);
        });
    }, []);

    return (
        <div className="history-container">
        <h2>Cronologia Valutazioni</h2>
        <button onClick={() => {
            if (showHistory) {
                setShowHistory(false);
                setSelectedId(null);
            } else {
                setShowHistory(true);
            }
        }}>{showHistory ? "Nascondi cronologia" : "Visualizza cronologia"}</button>
        
        <div className={showHistory ? "history-list open" : "history-list"}>
             {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="history-card">
                <p><strong>Brand:</strong> {evaluation.brand}</p>
                <p><strong>Categoria:</strong> {evaluation.category}</p> 
                <p><strong>Prezzo suggerito:</strong> €{evaluation.suggested_price}</p>
                <p><strong>Data:</strong> {evaluation.created_at}</p>

                <button onClick={() => {
                    if (selectedId === evaluation.id) {
                        setSelectedId(null);
                    } else {
                        setSelectedId(evaluation.id)
                    }
                }}>{selectedId === evaluation.id ? "Nascondi dettagli" : "Mostra dettagli"}</button>
                
                    <div className={selectedId === evaluation.id ? "history-details open" : "history-details"}>
                        <p><strong>Analisi immagine:</strong> {evaluation.image_analysis}</p>
                        <p><strong>Motivazione:</strong> {evaluation.motivation}</p>
                        <p><strong>Selling tips:</strong> {evaluation.selling_tips}</p>
                        <p><strong>Descrizione:</strong> {evaluation.listing_description}</p>
                    </div>
                
            </div>
            ))}
        </div>
      </div>  
    )
}
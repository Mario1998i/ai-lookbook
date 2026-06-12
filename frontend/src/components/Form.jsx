import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import "./Form.css";

export default function Form() {
    const [brand, setBrand] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});

    const resultRef = useRef(null);

    const imagePreview = photo ? URL.createObjectURL(photo) : null;

    async function handleSubmit() {

        const newErrors = {};

        if (brand === "") {
            newErrors.brand = "Inserisci un brand";
        }

        if (status === "") {
            newErrors.status = "Seleziona uno stato";
        }

        if (category === "") {
            newErrors.category = "Seleziona una categoria";
        }

        if (photo === null) {
            newErrors.photo = "Carica una foto";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }        

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("status", status);
        formData.append("category", category);
        formData.append("photo", photo);


        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/evaluate.php", formData);
            setEvaluation(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

        useEffect(() => {
            if (evaluation) {
                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, [evaluation]);
    
    return (
        <div className="form-container">
            {isLoading && (
                <div className="loading-overlay">
                    <Spinner />
                    <p>🔍 Analisi del prodotto in corso...</p>
                </div>
            )}
            <h1 className="app-title">AI Lookbook</h1>
            <div className="field-group">
                <input className="form-field" value={brand} onChange={(event) => setBrand(event.target.value)} type="text" placeholder="Inserisci brand" />
                {errors.brand && <p className="error-message">{errors.brand}</p>}
            </div>

            <div className="field-group">
                <select className="form-field" value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="">Seleziona stato</option>
                    <option value="nuovo">Nuovo</option>
                    <option value="buono">Buono</option>
                    <option value="usato">Usato</option>
                </select>
                {errors.status && <p className="error-message">{errors.status}</p>}
            </div>

            <div className="field-group">
                <select className="form-field" value={category} onChange={(event) => setCategory(event.target.value)} name="category">
                    <option value="">Seleziona categoria</option>
                    <option value="shoes">Scarpe</option>
                    <option value="hoodies">Felpe</option>
                    <option value="jackets">Giacche</option>
                    <option value="pants">Pantaloni</option>
                    <option value="tshirts">Maglie</option>
                </select>
                {errors.category && <p className="error-message">{errors.category}</p>}
            </div>

            <div className="field-group">
                <label className="upload-label" htmlFor="photo">
                    {imagePreview && (
                        <img src={imagePreview} alt="Anteprima" className="image-preview" />
                    )}
                    {photo ? `✅ ${photo.name}` : "📸 Carica foto"}</label>
                <input className="file-input" id="photo" type="file" onChange={(event) => setPhoto(event.target.files[0])} />
                {errors.photo && <p className="error-message">{errors.photo}</p>}
            </div>

            <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Caricamento..." : "Valuta"}</button>
            {
                evaluation && (
                    <div className="result-container" ref={resultRef}>
                        <div className="price-section">
                            <h2>🏷️ Prezzo consigliato</h2>
                            <p>{evaluation.suggested_price}€</p>

                            <h2>📈 Range di prezzo</h2>
                            <p>{evaluation.range.min}€ - {evaluation.range.max}€</p>
                        </div>

                        <h2>📷 Analisi immagine</h2>
                        <p>{evaluation.image_analysis}</p>

                        <h2>🎯 Motivazione</h2>
                        <p>{evaluation.motivation}</p>

                        <h2>✨ Suggerimenti di vendita</h2>
                        <ul>
                            {evaluation.selling_tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>

                        <h2>📄 Descrizione annuncio</h2>
                        <p>{evaluation.listing_description}</p>
                    </div>
                )
            }
        </div>
    )
}
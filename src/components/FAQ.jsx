import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import Button from './Button';
import './FAQ.css';

const FAQ = ({ type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            const whatsappUrl = `https://wa.me/237672420112?text=${encodeURIComponent(question.trim())}`;
            window.open(whatsappUrl, '_blank');
            
            setIsSubmitted(true);
            setQuestion('');
            
            // Reset after a few seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setIsOpen(false);
            }, 4000);
        }
    };

    return (
        <section className="faq-section">
            <div className="container">
                <div className="faq-header">
                    <h2 className="faq-title">Une question spécifique ?</h2>
                    <p className="faq-subtitle">
                        {type === 'client' 
                            ? "Vous avez des doutes sur l'accompagnement, la sécurité ou l'organisation ? N'hésitez pas à nous écrire." 
                            : "Vous avez des questions sur le partenariat, les modalités ou notre fonctionnement ? Laissez-nous un message."}
                    </p>
                </div>
                
                <div className="faq-interaction-area">
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            <motion.div
                                key="bar"
                                className="faq-bar"
                                onClick={() => setIsOpen(true)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <MessageSquare size={24} color="var(--mustard-dark)" />
                                <span>Poser une question ici</span>
                            </motion.div>
                        ) : isSubmitted ? (
                            <motion.div 
                                key="success"
                                className="faq-success-message faq-form-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <CheckCircle size={48} color="var(--mustard)" />
                                <h3>Question envoyée avec succès !</h3>
                                <p>Notre équipe l'analysera et vous apportera une réponse personnalisée très prochainement.</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="form"
                                className="faq-form-container"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                <div className="faq-form-header">
                                    <button className="faq-back-btn" onClick={() => setIsOpen(false)}>
                                        <ArrowLeft size={20} /> Retour
                                    </button>
                                </div>
                                <form className="faq-form" onSubmit={handleSubmit}>
                                    <textarea 
                                        className="faq-textarea" 
                                        placeholder="Écrivez votre question ici..."
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        required
                                        rows={4}
                                    ></textarea>
                                    <Button type="submit" variant="primary" className="faq-submit-btn">
                                        <Send size={18} style={{marginRight: '8px'}} />
                                        Envoyer la question
                                    </Button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import FAQ from '../components/FAQ';
import './Client.css';

const SERVICES = [
    { 
        id: 1, 
        name: "Soins médicaux et assistance à domicile", 
        description: "Suivi infirmier complet, gestion des pansements, injections et soins post-opératoires directement dans le confort de votre foyer.",
        emoji: "🏥"
    },
    { 
        id: 2, 
        name: "Assistance quotidienne", 
        description: "Aide à la toilette, préparation de repas équilibrés et entretien du cadre de vie pour préserver l'autonomie et le confort.",
        emoji: "🏠"
    },
    { 
        id: 3, 
        name: "Accompagnement et mobilité", 
        description: "Aide aux déplacements, sorties culturelles, courses et rendez-vous médicaux avec un accompagnateur dédié.",
        emoji: "🚶‍♂️"
    },
    { 
        id: 4, 
        name: "Monitoring et sécurité", 
        description: "Veille nocturne, télésurveillance et dispositifs d'alerte pour une tranquillité d'esprit totale, 24h/24 et 7j/7.",
        emoji: "🛡️"
    },
    { 
        id: 5, 
        name: "Bien-être et social", 
        description: "Activités ludiques, stimulation cognitive, lecture et simple compagnie pour briser l'isolement social.",
        emoji: "🤝"
    },
];

const Client = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedServices, setExpandedServices] = useState({});

    const toggleDetails = (id) => {
        setExpandedServices(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filtered = SERVICES.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="client-page">
            <div className="container">
                <header className="client-header">
                    <h1 className="client-title">Nos Services de Soins</h1>
                    <p className="client-subtitle">Découvrez nos solutions d'accompagnement personnalisées pour votre bien-être au quotidien.</p>
                </header>

                <div className="client-layout-simplified">
                    <main className="client-main">
                        <div className="search-box">
                            <Search className="search-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="Rechercher un soin..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="results-list">
                            <AnimatePresence mode="popLayout">
                                {filtered.map(s => (
                                    <motion.div key={s.id} layout className="provider-card">
                                        <div className="provider-avatar">{s.emoji}</div>
                                        <div className="provider-info">
                                            <h3 className="provider-name">{s.name}</h3>
                                            <AnimatePresence>
                                                {expandedServices[s.id] && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <p className="service-description">{s.description}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="provider-action">
                                            <div className="action-buttons">
                                                <Button size="sm" variant="ghost" onClick={() => toggleDetails(s.id)}>
                                                    {expandedServices[s.id] ? 'Réduire' : 'Détails'} <ChevronRight size={16} />
                                                </Button>
                                                <Button size="sm" variant="primary" onClick={() => window.open('https://wa.me/237680159877', '_blank')}>
                                                    Nous contacter
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
            
            <FAQ type="client" />
        </div>
    );
};

export default Client;

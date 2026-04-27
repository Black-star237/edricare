import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Auth.css';

const Auth = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'login';
    const initialRole = searchParams.get('role') || null;
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(mode === 'login');
    const [role, setRole] = useState(initialRole);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showServiceSelection, setShowServiceSelection] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    const SERVICES_OPTIONS = [
        { id: 'garde', label: 'Garde malade', icon: '🛌' },
        { id: 'infirmier', label: 'Soin infirmier', icon: '💉' },
        { id: 'quotidien', label: 'Assistance quotidienne', icon: '🏠' },
        { id: 'multiple', label: 'Choix multiple', icon: '🔄' },
        { id: 'carte', label: 'Service à la carte', icon: '📋' }
    ];

    const handleAuth = (e) => {
        e.preventDefault();
        if (!isLogin) {
            if (role === 'prestataire') {
                setShowServiceSelection(true);
            } else {
                setRegistrationSuccess(true);
            }
        } else {
            navigate('/dashboard');
        }
    };

    const handleServiceToggle = (id) => {
        setSelectedServices(prev => 
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleServiceSubmit = () => {
        setRegistrationSuccess(true);
        setShowServiceSelection(false);
    };

    if (showServiceSelection) {
        return (
            <div className="auth-page">
                <div className="auth-card selection-card">
                    <h2 className="auth-title">Quels services proposez-vous ?</h2>
                    <p className="auth-subtitle">Sélectionnez vos expertises pour recevoir les missions adaptées.</p>
                    
                    <div className="services-grid-selection">
                        {SERVICES_OPTIONS.map(service => (
                            <div 
                                key={service.id} 
                                className={`service-select-item ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                                onClick={() => handleServiceToggle(service.id)}
                            >
                                <span className="service-select-icon">{service.icon}</span>
                                <span className="service-select-label">{service.label}</span>
                            </div>
                        ))}
                    </div>

                    <Button 
                        variant="primary" 
                        className="w-full" 
                        onClick={handleServiceSubmit}
                        disabled={selectedServices.length === 0}
                    >
                        Finaliser l'inscription
                    </Button>
                </div>
            </div>
        );
    }

    if (registrationSuccess) {
        return (
            <div className="auth-page">
                <div className="auth-card success-card">
                    <div className="success-icon">🎉</div>
                    <h2 className="auth-title">Inscription Réussie !</h2>
                    <p className="auth-subtitle">
                        {role === 'prestataire' 
                            ? "Félicitations ! Vos services ont été enregistrés. Votre profil EldriCare est en cours de validation par nos experts santé."
                            : "Bienvenue dans la famille EldriCare ! Vous pouvez dès à présent rechercher et réserver des soins pour vos proches."}
                    </p>

                    <div className="next-steps">
                        <h3>Prochaines étapes :</h3>
                        <ul>
                            {role === 'prestataire' ? (
                                <>
                                    <li>Vérification de vos diplômes et certifications.</li>
                                    <li>Appel de bienvenue pour discuter de vos disponibilités.</li>
                                    <li>Activation de votre compte pour recevoir des missions.</li>
                                </>
                            ) : (
                                <>
                                    <li>Complétez votre profil de famille.</li>
                                    <li>Recherchez un soignant disponible dans votre ville.</li>
                                    <li>Réservez votre première prestation en toute sécurité.</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Button 
                        variant="primary" 
                        className="w-full" 
                        onClick={() => navigate(role === 'prestataire' ? '/' : '/client')}
                    >
                        {role === 'prestataire' ? "Retour à l'accueil" : "Parcourir les services"}
                    </Button>
                </div>
            </div>
        );
    }

    // Role Selection Step if not logged in and role not chosen
    if (!isLogin && !role) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Qui êtes-vous ?</h2>
                    <p className="auth-subtitle">Choisissez votre type de compte pour une expérience personnalisée.</p>
                    
                    <div className="role-selection-grid">
                        <div className="role-option" onClick={() => setRole('client')}>
                            <div className="role-icon">🏠</div>
                            <h3>Je suis un Client</h3>
                            <p>Je recherche des soins pour moi ou un proche.</p>
                        </div>
                        <div className="role-option" onClick={() => setRole('prestataire')}>
                            <div className="role-icon">⚕️</div>
                            <h3>Je suis un Prestataire</h3>
                            <p>Je suis un professionnel de santé ou un aidant.</p>
                        </div>
                    </div>

                    <div className="auth-footer-link">
                        Déjà inscrit ? <button onClick={() => setIsLogin(true)}>Se connecter</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-toggle">
                    <button className={isLogin ? 'active' : ''} onClick={() => { setIsLogin(true); setRole('client'); }}>Connexion</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Inscription</button>
                </div>
                
                <h2 className="auth-title">{isLogin ? 'Bon retour !' : 'Créer un compte'}</h2>
                <p className="auth-subtitle">
                    {isLogin ? 'Connectez-vous à votre espace' : (role === 'prestataire' ? 'S\'inscrire en tant que Prestataire' : 'S\'inscrire en tant que Client')}
                </p>

                <form className="auth-form" onSubmit={handleAuth}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label>Nom complet</label>
                                <input type="text" placeholder="Ex: Jean Paul" required />
                            </div>
                            
                            {role === 'prestataire' ? (
                                <>
                                    <div className="form-group">
                                        <label>Date de naissance</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Villes d'intervention</label>
                                        <input type="text" placeholder="Ex: Yaoundé, Douala" required />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Ville</label>
                                        <input type="text" placeholder="Ex: Yaoundé" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Type de besoin</label>
                                        <select required className="auth-select">
                                            <option value="">Sélectionnez un besoin...</option>
                                            <option value="medical">Soins médicaux</option>
                                            <option value="quotidien">Aide au quotidien</option>
                                            <option value="accompagnement">Accompagnement</option>
                                            <option value="carte">Service à la carte</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="form-group">
                        <label>Email / Téléphone</label>
                        <input type="text" placeholder="Ex: contact@email.com" required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                    
                    <Button variant="primary" className="w-full" type="submit">
                        {isLogin ? 'Se connecter' : 'Créer mon compte'}
                    </Button>

                    {!isLogin && (
                        <button type="button" className="change-role-btn" onClick={() => setRole(null)}>
                            Changer de type de compte
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Auth;

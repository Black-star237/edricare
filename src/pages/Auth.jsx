import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
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

    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        cities: '',
        city: '',
        needType: '',
        contact: '',
        password: ''
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const SERVICES_OPTIONS = [
        { id: 'garde', label: 'Garde malade', icon: '🛌' },
        { id: 'infirmier', label: 'Soin infirmier', icon: '💉' },
        { id: 'quotidien', label: 'Assistance quotidienne', icon: '🏠' },
        { id: 'multiple', label: 'Choix multiple', icon: '🔄' },
        { id: 'carte', label: 'Service à la carte', icon: '📋' },
        { id: 'unknown', label: 'Je ne sais pas exactement', icon: '❓' }
    ];

    const handleAuth = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);
        
        try {
            if (!isLogin) {
                if (role === 'prestataire') {
                    setShowServiceSelection(true);
                    return;
                } else {
                    const { error: dbError } = await supabase.from('clients').insert([
                        {
                            full_name: formData.fullName,
                            city: formData.city,
                            need_type: formData.needType,
                            contact: formData.contact,
                            password: formData.password
                        }
                    ]);
                    if (dbError) throw dbError;
                    setRegistrationSuccess(true);
                }
            } else {
                // Login
                let user = null;
                
                // Try clients table first
                const { data: clientData, error: clientError } = await supabase
                    .from('clients')
                    .select('*')
                    .eq('contact', formData.contact)
                    .eq('password', formData.password)
                    .single();
                    
                if (clientData) {
                    user = clientData;
                } else {
                    // Try prestataires table
                    const { data: presData, error: presError } = await supabase
                        .from('prestataires')
                        .select('*')
                        .eq('contact', formData.contact)
                        .eq('password', formData.password)
                        .single();
                        
                    if (presData) {
                        user = presData;
                    }
                }
                
                if (user) {
                    navigate('/dashboard');
                } else {
                    setErrorMsg("Contact ou mot de passe incorrect.");
                }
            }
        } catch (err) {
            setErrorMsg(err.message || "Une erreur est survenue.");
        } finally {
            if (!showServiceSelection) {
                setIsLoading(false);
            }
        }
    };

    const handleServiceToggle = (id) => {
        setSelectedServices(prev => 
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleServiceSubmit = async () => {
        setErrorMsg('');
        setIsLoading(true);
        try {
            const { error: dbError } = await supabase.from('prestataires').insert([
                {
                    full_name: formData.fullName,
                    birth_date: formData.birthDate,
                    cities: formData.cities,
                    contact: formData.contact,
                    password: formData.password,
                    services: selectedServices.join(', ')
                }
            ]);
            if (dbError) throw dbError;
            
            setShowServiceSelection(false);
            setRegistrationSuccess(true);
        } catch (err) {
            setErrorMsg(err.message || "Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
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
                        disabled={selectedServices.length === 0 || isLoading}
                    >
                        {isLoading ? 'Chargement...' : 'Finaliser l\'inscription'}
                    </Button>
                    
                    {errorMsg && <div className="error-message" style={{color: '#ff4d4f', marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center'}}>{errorMsg}</div>}
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
                        {role === 'prestataire' ? (
                            <div className="contact-promise">
                                <h3 style={{color: 'var(--mustard-dark)', fontSize: '1.4rem', marginBottom: '1rem'}}>
                                    Nous vous contacterons dans les plus bref délai.
                                </h3>
                                <p>Un membre de notre équipe examinera votre profil et vous appellera pour finaliser votre intégration.</p>
                            </div>
                        ) : (
                            <>
                                <h3>Prochaines étapes :</h3>
                                <ul>
                                    <li>Complétez votre profil de famille.</li>
                                    <li>Recherchez un prestataire disponible dans votre ville.</li>
                                    <li>Réservez votre première prestation en toute sécurité.</li>
                                </ul>
                            </>
                        )}
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
                            <p>Je suis un prestataire ou un aidant.</p>
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
                                <input 
                                    type="text" 
                                    placeholder="Ex: Jean Paul" 
                                    required 
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            
                            {role === 'prestataire' ? (
                                <>
                                    <div className="form-group">
                                        <label>Date de naissance</label>
                                        <input 
                                            type="date" 
                                            required 
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Villes d'intervention</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex: Yaoundé, Douala" 
                                            required 
                                            value={formData.cities}
                                            onChange={(e) => setFormData({...formData, cities: e.target.value})}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Ville</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex: Yaoundé" 
                                            required 
                                            value={formData.city}
                                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Type de besoin</label>
                                        <select 
                                            required 
                                            className="auth-select"
                                            value={formData.needType}
                                            onChange={(e) => setFormData({...formData, needType: e.target.value})}
                                        >
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
                        <label>Numéro de téléphone / Email</label>
                        <input 
                            type="text" 
                            placeholder="Ex: 672 420 112 ou email@... " 
                            required 
                            value={formData.contact}
                            onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    
                    {errorMsg && <div className="error-message" style={{color: '#ff4d4f', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'}}>{errorMsg}</div>}

                    <Button variant="primary" className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer mon compte')}
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

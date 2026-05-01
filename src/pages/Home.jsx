import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Star, PlayCircle, ArrowRight, Clock, UserCheck, MessageCircle, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-badge">
                            ✨ Nouveau Standard d'Assistance au Cameroun
                        </div>
                        <h1 className="hero-title">
                            L'assistance qui vous <span className="text-orange-gradient">comprend vraiment</span>.
                        </h1>
                        <p className="hero-subtitle">
                            EldriCare connecte les familles camerounaises aux meilleurs prestataires pour une assistance à domicile de qualité, sécurisée et humaine.
                        </p>
                        <div className="hero-actions">
                            <Link to="/client">
                                <Button size="lg" className="hero-btn">Trouver un prestataire</Button>
                            </Link>
                            <Link to="/prestataire">
                                <Button variant="outline" size="lg" className="hero-btn">Devenir prestataire</Button>
                            </Link>
                        </div>
                        <div className="hero-trust">
                            <div className="trust-stars">
                                <Star fill="#F2D04E" color="#F2D04E" size={16} />
                                <Star fill="#F2D04E" color="#F2D04E" size={16} />
                                <Star fill="#F2D04E" color="#F2D04E" size={16} />
                                <Star fill="#F2D04E" color="#F2D04E" size={16} />
                                <Star fill="#F2D04E" color="#F2D04E" size={16} />
                            </div>
                            <span>Plus de 500 familles nous font déjà confiance</span>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="experience-card">
                            <div className="exp-icon">🛡️</div>
                            <div>
                                <h4>100% Sécurisé</h4>
                                <p>Prestataires vérifiés & qualifiés</p>
                            </div>
                        </div>
                        <div className="experience-card secondary">
                            <div className="exp-icon">❤️</div>
                            <div>
                                <h4>Proximité</h4>
                                <p>Un prestataire près de chez vous</p>
                            </div>
                        </div>
                        {/* Placeholder for Hero Image */}
                        <div className="hero-image-placeholder">
                            <img src="https://images.unsplash.com/photo-1581579205702-c6c8ea23e207?auto=format&fit=crop&w=800&q=80" alt="Assistance à domicile" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Pourquoi choisir EldriCare ?</h2>
                        <p className="section-desc">Nous avons repensé l'assistance à domicile pour vous offrir une expérience sans stress.</p>
                    </div>
                    
                    <div className="features-grid">
                        {[
                            { icon: <UserCheck size={32} />, title: "Personnel qualifié et vérifié", desc: "Chaque prestataire passe un test de compétence et un contrôle de moralité rigoureux." },
                            { icon: <Clock size={32} />, title: "Disponibilité rapide", desc: "Trouvez un prestataire disponible immédiatement pour répondre à vos urgences." },
                            { icon: <Heart size={32} />, title: "Suivi personnalisé", desc: "Une assistance sur mesure adaptée aux besoins spécifiques de chaque patient." },
                            { icon: <Shield size={32} />, title: "Respect et dignité des patients", desc: "Le respect de l'intimité et de la dignité humaine est au cœur de nos valeurs." }
                        ].map((f, i) => (
                            <motion.div 
                                key={i} 
                                className="feature-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section bg-off-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Nos Tarifs</h2>
                        <p className="section-desc">Une transparence totale pour un service de qualité.</p>
                    </div>
                    <div className="pricing-card">
                        <div className="pricing-icon">💎</div>
                        <p className="pricing-text">
                            Chaque situation en étant unique, nos tarifs sont adaptés en fonction des besoins spécifiques de la personne à accompagner.
                        </p>
                        <p className="pricing-cta-text">
                            Contactez-nous pour une évaluation gratuite et un devis personnalisé.
                        </p>
                        <div className="pricing-actions">
                            <a href="mailto:eldricare01@gmail.com">
                                <Button variant="primary">
                                    <Mail size={18} style={{marginRight: '8px'}} />
                                    eldricare01@gmail.com
                                </Button>
                            </a>
                            <a href="https://wa.me/237680159877" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    <MessageCircle size={18} style={{marginRight: '8px'}} />
                                    WhatsApp: 680159877
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Ce qu'ils disent d'EldriCare</h2>
                        <p className="section-desc">La confiance est au cœur de notre mission. Découvrez les retours de notre communauté.</p>
                    </div>

                    <div className="testimonials-grid">
                        {[
                            {
                                type: "client",
                                name: "Mme Fotso",
                                role: "Fille d'un patient",
                                content: "EldriCare a changé notre vie. Trouver une garde-malade qualifiée à Yaoundé était un parcours du combattant. En 24h, nous avions une perle rare.",
                                rating: 5,
                                avatar: "👩‍👩‍👧"
                            },
                            {
                                type: "prestataire",
                                name: "Dr Jonas",
                                role: "Infirmier Libéral",
                                content: "Une plateforme qui valorise enfin notre métier. La gestion des paiements est transparente et les missions proposées correspondent exactement à mon planning.",
                                rating: 5,
                                avatar: "👨‍⚕️"
                            },
                            {
                                type: "client",
                                name: "M. Abena",
                                role: "Client régulier",
                                content: "La sécurité est ce qui m'a convaincu. Savoir que les prestataires sont vérifiés me permet de partir au travail l'esprit tranquille.",
                                rating: 4,
                                avatar: "👨‍💼"
                            },
                            {
                                type: "prestataire",
                                name: "Sarah L.",
                                role: "Assistante de vie",
                                content: "Je me sens accompagnée et soutenue par l'équipe EldriCare. C'est plus qu'une plateforme, c'est une communauté de prestataires passionnés.",
                                rating: 5,
                                avatar: "👩‍⚕️"
                            }
                        ].map((t, i) => (
                            <motion.div 
                                key={i} 
                                className={`testimonial-card ${t.type}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="testimonial-header">
                                    <div className="testimonial-avatar">{t.avatar}</div>
                                    <div>
                                        <h4 className="testimonial-name">{t.name}</h4>
                                        <span className="testimonial-role">{t.role}</span>
                                    </div>
                                    <div className="testimonial-badge">
                                        {t.type === 'prestataire' ? 'Prestataire' : 'Famille'}
                                    </div>
                                </div>
                                <div className="testimonial-rating">
                                    {[...Array(5)].map((_, star) => (
                                        <Star 
                                            key={star} 
                                            size={16} 
                                            fill={star < t.rating ? "var(--mustard)" : "transparent"} 
                                            color={star < t.rating ? "var(--mustard)" : "var(--border-light)"} 
                                        />
                                    ))}
                                </div>
                                <p className="testimonial-content">"{t.content}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-card">
                        <h2>Besoin d'aide ? Nous sommes là.</h2>
                        <p>Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.</p>
                        <div className="contact-info-grid">
                            <div className="contact-info-item">
                                <Mail color="var(--mustard)" />
                                <span>eldricare01@gmail.com</span>
                            </div>
                            <div className="contact-info-item">
                                <Phone color="var(--mustard)" />
                                <span>+237 680 159 877</span>
                            </div>
                        </div>
                        <Button variant="primary" size="lg" className="mt-8" onClick={() => window.open('https://wa.me/237680159877', '_blank')}>
                            Nous contacter sur WhatsApp
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Coins, Award, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import './Prestataire.css';

const Prestataire = () => {
    return (
        <div className="prestataire-page">
            <div className="container">
                <div className="provider-hero">
                    <motion.div
                        className="provider-hero-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="provider-badge">
                            🚀 Opportunité Pro
                        </div>
                        <h1 className="provider-title">
                            Valorisez votre expertise <span className="text-orange-gradient">d'assistant</span>.
                        </h1>
                        <p className="provider-desc">
                            Rejoignez la plateforme leader au Cameroun. Accédez à des missions flexibles, gérez votre planning et sécurisez vos revenus directement sur votre mobile.
                        </p>
                        <div className="provider-actions">
                            <Link to="/auth?mode=register&role=prestataire">
                                <Button size="lg">Rejoindre le réseau</Button>
                            </Link>
                        </div>
                    </motion.div>

                    <div className="provider-hero-visual">
                        <div className="provider-stats-grid">
                            {[
                                { val: "500k+", label: "Revenus versés" },
                                { val: "48h", label: "Délai de paiement" },
                                { val: "100%", label: "Sécurité" },
                                { val: "24/7", label: "Accès missions" }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="provider-stat-item"
                                >
                                    <div className="provider-stat-val text-gradient">{stat.val}</div>
                                    <div className="provider-stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="provider-features">
                    {[
                        { icon: <ShieldCheck size={32} color="#F2D04E" />, title: "Protection & Assurance", desc: "Assurance responsabilité civile incluse pour toutes vos missions via la plateforme." },
                        { icon: <Coins size={32} color="#24221B" />, title: "Paiements Sécurisés", desc: "Retrait direct via Orange Money ou MTN MoMo sous 48h ouvrables." },
                        { icon: <Award size={32} color="#F2D04E" />, title: "Certifications", desc: "Obtenez des badges de confiance et valorisez votre profil auprès des familles." }
                    ].map((item, idx) => (
                        <div key={idx} className="provider-feature-card">
                            <div className="provider-feature-icon">{item.icon}</div>
                            <h3 className="provider-feature-title">{item.title}</h3>
                            <p className="provider-feature-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <FAQ type="prestataire" />

            <div className="container">
                <section className="provider-cta-section">
                    <div className="provider-cta-layout">
                        <div className="provider-cta-content">
                            <h2 className="provider-cta-title">Prêt à commencer ?</h2>
                            <p className="provider-cta-desc">L'inscription est gratuite et ne prend que 5 minutes. Téléchargez l'application prestataire pour recevoir vos premières missions dès aujourd'hui.</p>
                            <div className="provider-community">
                                <div className="provider-avatars">
                                    {[1,2,3,4].map(n => (
                                        <div key={n} className="provider-avatar-item">👩‍⚕️</div>
                                    ))}
                                    <div className="provider-avatar-item count">+500</div>
                                </div>
                                <span className="provider-community-text">Rejoignez une communauté d'experts.</span>
                            </div>
                        </div>
                        <Link to="/auth?mode=register&role=prestataire">
                            <Button size="lg" className="provider-cta-btn">
                                Créer mon compte <ExternalLink size={20} style={{marginLeft: '0.5rem'}} />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Prestataire;

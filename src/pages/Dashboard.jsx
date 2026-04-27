import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, MessageSquare, CreditCard, Settings, Bell } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <aside className="dashboard-sidebar">
                <div className="sidebar-brand">🏠 EldriCare</div>
                <nav className="sidebar-nav">
                    <div className="nav-item active"><LayoutDashboard size={20} /> Dashboard</div>
                    <div className="nav-item"><Calendar size={20} /> Missions</div>
                    <div className="nav-item"><MessageSquare size={20} /> Messages</div>
                    <div className="nav-item"><CreditCard size={20} /> Paiements</div>
                    <div className="nav-item"><Settings size={20} /> Paramètres</div>
                </nav>
            </aside>
            
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Tableau de Bord</h2>
                    <div className="header-actions">
                        <Bell size={24} />
                        <div className="user-profile">👩‍⚕️</div>
                    </div>
                </header>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <span>Revenus Total</span>
                        <h3>500k FCFA</h3>
                    </div>
                    <div className="stat-card">
                        <span>Missions Terminées</span>
                        <h3>24</h3>
                    </div>
                    <div className="stat-card">
                        <span>Note Moyenne</span>
                        <h3>4.9/5</h3>
                    </div>
                </div>

                <div className="recent-activity">
                    <h3>Missions Récentes</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🏥</div>
                            <div className="activity-info">
                                <h4>Soin Post-opératoire</h4>
                                <p>Mme. Ndome - Yaoundé</p>
                            </div>
                            <div className="activity-status pending">En attente</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

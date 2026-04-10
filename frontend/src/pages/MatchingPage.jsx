import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useCitizen } from '../context/CitizenContext';
import { analyzeEligibility } from '../services/aiApi';

const MatchingPage = () => {
    const navigate = useNavigate();
    const { citizenData, setCitizen } = useCitizen();
    const [currentStep, setCurrentStep] = useState(0);
    const [matches, setMatches] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const steps = [
        { id: 1, text: "Fetching government schemes...", icon: Search },
        { id: 2, text: "Analyzing user profile...", icon: ShieldCheck },
        { id: 3, text: "Matching with best schemes...", icon: Sparkles }
    ];

    useEffect(() => {
        if (!citizenData?.profile) {
            navigate('/dashboard');
            return;
        }

        const runMatching = async () => {
            // Step 0 -> 1
            await new Promise(r => setTimeout(r, 1500));
            setCurrentStep(1);

            // Step 1 -> 2
            await new Promise(r => setTimeout(r, 1500));
            setCurrentStep(2);

            try {
                // Call AI Service for real matching
                const eligibleSchemes = await analyzeEligibility(citizenData.profile);
                
                // Finalize Step 2 -> 3
                await new Promise(r => setTimeout(r, 1000));
                setCurrentStep(3);
                
                // Calculate total benefit amount for summary
                const totalBenefit = eligibleSchemes.reduce((acc, curr) => {
                    const numStr = String(curr.benefit).replace(/[^0-9]/g, '');
                    return acc + (parseInt(numStr, 10) || 0);
                }, 0);

                // Update context with the real matched schemes
                setCitizen(citizenData.profile, { 
                    eligibleSchemes: eligibleSchemes.map(s => ({
                        ...s,
                        name: s.scheme, // Map backend 'scheme' to frontend 'name'
                        score: Math.round(s.score * 100)
                    })),
                    totalBenefits: `₹${totalBenefit.toLocaleString('en-IN')}`,
                    isDemo: false // Ensure it's treated as real data
                });

                await new Promise(r => setTimeout(r, 800));
                setIsComplete(true);
            } catch (err) {
                console.error("Matching failed", err);
                // Fallback to avoid getting stuck
                setIsComplete(true);
            }
        };

        runMatching();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white">
            <div className="max-w-md w-full text-center space-y-8">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            key="matching"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/30">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-blue-400 blur-3xl -z-10 rounded-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Akashvaani AI</h1>
                                <p className="text-slate-500 font-medium">Sit tight! Our AI is architecting your financial roadmap...</p>
                            </div>

                            <div className="space-y-4 text-left bg-white/50 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-xl shadow-slate-200/50">
                                {steps.map((step, idx) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === idx;
                                    const isDone = currentStep > idx;

                                    return (
                                        <div key={step.id} className="flex items-center gap-4 py-2">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                                isDone ? 'bg-green-100 text-green-600' : 
                                                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                                                'bg-slate-100 text-slate-400'
                                            }`}>
                                                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                            </div>
                                            <span className={`font-bold transition-all duration-500 ${
                                                isDone ? 'text-green-700' : 
                                                isActive ? 'text-blue-700 text-lg' : 
                                                'text-slate-400'
                                            }`}>
                                                {step.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-green-500/30">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Strategy Generated!</h1>
                                <p className="text-slate-600 font-medium text-lg">
                                    We found <span className="text-green-600 font-bold">{citizenData?.eligibleSchemes?.length || 0} benefits</span> totaling <span className="text-blue-600 font-bold">{citizenData?.totalBenefits}</span> matching your profile.
                                </p>
                            </div>

                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black text-lg shadow-xl hover:shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MatchingPage;

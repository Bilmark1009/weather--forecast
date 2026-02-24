import { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { submitFeedback } from '../services/api';

export default function FeedbackModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'feedback',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await submitFeedback(formData);
            setStatus('success');
            setFormData({ name: '', email: '', type: 'feedback', subject: '', message: '' });
            setTimeout(() => { onClose(); setStatus(null); }, 2000);
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-[#1e2124] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Share your feedback</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-400 ml-1">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-400 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-400 ml-1">Type</label>
                        <div className="flex gap-2">
                            {['feedback', 'bug_report'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: t })}
                                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${formData.type === t
                                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {t === 'feedback' ? 'Feedback' : 'Bug Report'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-400 ml-1">Subject</label>
                        <input
                            type="text"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-400 ml-1">Message</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
                        />
                    </div>

                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl">
                            <CheckCircle2 size={20} />
                            <span>Feedback sent successfully!</span>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl">
                            <AlertCircle size={20} />
                            <span>Failed to send. Please try again.</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-500/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Sending...' : <><Send size={18} /> Send Feedback</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
